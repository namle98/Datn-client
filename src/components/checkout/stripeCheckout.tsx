import { CheckOutlined, DollarOutlined } from "@ant-design/icons";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { createPaymentIntent } from "../../service/stripe.service";
import { createOrder, emptyUserCart } from "../../service/user.service";
import Laptop from "../../images/laptop.png";

function StripeCheckout() {
  const dispatch = useDispatch();
  const { coupon } = useSelector((state: any) => ({ ...state }));
  const { auth } = useAuth();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(auth?.idToken, coupon).then((res) => {
      console.log("create payment intent", res.data);
      setClientSecret(res.data.clientSecret);
      // additional response received on successful payment
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setProcessing(true);

    const cardElement = elements?.getElement(CardElement);
    if (cardElement && stripe) {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: e.target.name.value,
          },
        },
      });

      if (payload?.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        // here you get result after successful payment
        // create order and save in database for admin to process
        createOrder(payload, auth?.idToken).then((res) => {
          if (res.data.ok) {
            // empty cart from local storage
            if (typeof window !== "undefined") localStorage.removeItem("cart");
            // empty cart from redux
            dispatch({
              type: "ADD_TO_CART",
              payload: [],
            });
            // reset coupon to false
            dispatch({
              type: "COUPON_APPLIED",
              payload: false,
            });
            // empty cart from database
            emptyUserCart(auth?.idToken);
          }
        });
        // empty user cart from redux store and local storage
        console.log(JSON.stringify(payload, null, 4));
        setError("");
        setProcessing(false);
        setSucceeded(true);
      }
    }
  };

  const handleChange = async (e: any) => {
    // listen for changes in the card element
    // and display any errors as the custoemr types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ""); // show error message
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total after discount: $${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No coupon applied</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          cover={
            <img
              src={Laptop}
              style={{
                height: "200px",
                objectFit: "cover",
                marginBottom: "-50px",
              }}
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br /> Total: $
              {cartTotal}
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> Total payable : $
              {(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful.{" "}
          <Link to="/user/history">See it in your purchase history.</Link>
        </p>
      </form>
    </>
  );
}

export default StripeCheckout;
