import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import {
  applyCoupon,
  createCashOrderForUser,
  emptyUserCart,
  getUserCart,
  saveUserAddress,
} from "../../service/user.service";

function Checkout() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [products, setProducts] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { COD } = useSelector((state: any) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state: any) => state.coupon);

  useEffect(() => {
    getUserCart(auth?.idToken).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(auth?.idToken).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

  const saveAddressToDb = (e: any) => {
    e.preventDefault();
    // console.log(address);
    saveUserAddress(auth?.idToken, address, phone).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const applyDiscountCoupon = (e: any) => {
    e.preventDefault();
    //console.log("send coupon to backend", coupon);
    applyCoupon(auth?.idToken, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showAddress = () => (
    <>
      <h2 className="checkout-title">Billing Details</h2>

      <label>Address *</label>
      <input
        type="text"
        className="form-control"
        placeholder="House number and Street name"
        required
        value={address}
        onChange={(e: any) => setAddress(e.target.value)}
      />
      <label>Phone *</label>
      <input
        value={phone}
        onChange={(e: any) => setPhone(e.target.value)}
        type="tel"
        className="form-control"
        required
      />
      {/* <button
        disabled={!phone || !address}
        className="btn btn-outline-primary-2 mt-2"
        onClick={saveAddressToDb}
      >
        Save
      </button> */}
    </>
  );

  const showProductSummary = () =>
    products.map((p: any, i: any) => (
      <tr>
        <td>
          <a>
            {p.product.title} ({p.color})
          </a>
        </td>
        <td>{p.count}</td>
        <td>${p.product.price * p.count}</td>
      </tr>
    ));

  const showApplyCoupon = () => (
    <>
      <form onSubmit={applyDiscountCoupon}>
        <h2 className="checkout-title">Have a coupon?</h2>
        <input
          type="text"
          className="form-control"
          id="checkout-discount-input"
          onChange={(e) => {
            setCoupon(e.target.value);
            setDiscountError("");
          }}
          value={coupon}
        />
        {discountError && <p style={{ color: "red" }}>{discountError}</p>}

        <button
          disabled={!coupon}
          onClick={applyDiscountCoupon}
          className="btn btn-outline-primary-2 mt-2"
        >
          Apply
        </button>
      </form>
    </>
  );

  const checkoutWithPayment = () => {
    localStorage.setItem("phone", phone);
    localStorage.setItem("address", address);
    navigate("/payment");
  };

  const createCashOrder = () => {
    createCashOrderForUser(
      auth?.idToken,
      COD,
      couponTrueOrFalse,
      phone,
      address
    ).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(auth?.idToken);
        // redirect
        setTimeout(() => {
          navigate("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <div className="page-content mt-3">
      <div className="checkout">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              {showAddress()}
              <div className="checkout-discount">{showApplyCoupon()}</div>
            </div>
            {/* End .col-lg-9 */}
            <aside className="col-md-5">
              <div className="summary">
                <h3 className="summary-title">Your Order</h3>

                <table className="table table-summary">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Count</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {showProductSummary()}
                    <tr className="summary-total">
                      <td>Total Payable:</td>
                      <td>${total}</td>
                    </tr>
                    {totalAfterDiscount > 0 && (
                      <tr className="summary-total">
                        <td>Discount Applied: Total Payable:</td>
                        <td>${totalAfterDiscount}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="row">
                  <div className="col-md-6">
                    {COD ? (
                      <button
                        className="btn btn-outline-primary-2 mt-2"
                        disabled={!address || !phone || !products.length}
                        onClick={createCashOrder}
                      >
                        Place Order
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-primary-2 mt-2"
                        disabled={!address || !phone || !products.length}
                        onClick={checkoutWithPayment}
                      >
                        Place Order
                      </button>
                    )}
                  </div>
                  <div className="col-md-6">
                    <button
                      disabled={!products.length}
                      onClick={emptyCart}
                      className="btn btn-outline-primary-2 mt-2"
                    >
                      Empty Cart
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
