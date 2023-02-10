import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import StripeCheckout from "../../components/checkout/stripeCheckout";
import "./styles.scss";

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY || "");

function Payment() {
  return (
    <div className="container p-5 text-center stripe-checkout-page">
      <h4>Complete your purchase</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
}

export default Payment;
