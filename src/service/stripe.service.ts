import http from "../utils/http";

export const createPaymentIntent = (authtoken: any, coupon: any) =>
  http.post(
    `create-payment-intent`,
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
