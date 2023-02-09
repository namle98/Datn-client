import http from "../utils/http";

export const userCart = (cart: any, authtoken: any) =>
  http.post(
    `user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = (authtoken: any) =>
  http.get(`user/cart`, {
    headers: {
      authtoken,
    },
  });

export const emptyUserCart = (authtoken: any) =>
  http.delete(`user/cart`, {
    headers: {
      authtoken,
    },
  });

export const saveUserAddress = (
  authtoken: any,
  address: string,
  phone: string
) =>
  http.post(
    `user/address`,
    { address, phone },
    {
      headers: {
        authtoken,
      },
    }
  );

export const applyCoupon = (authtoken: any, coupon: string) =>
  http.post(
    `user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createOrder = (stripeResponse: any, authtoken: any) =>
  http.post(
    `user/order`,
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserOrders = (authtoken: any) =>
  http.get(`user/orders`, {
    headers: {
      authtoken,
    },
  });

export const getWishlist = (authtoken: any) =>
  http.get(`user/wishlist`, {
    headers: {
      authtoken,
    },
  });

export const removeWishlist = (productId: string, authtoken: any) =>
  http.put(
    `user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const addToWishlist = (productId: string, authtoken: any) =>
  http.post(
    `user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createCashOrderForUser = (
  authtoken: any,
  COD: any,
  couponTrueOrFalse: any
) =>
  http.post(
    `user/cash-order`,
    { couponApplied: couponTrueOrFalse, COD },
    {
      headers: {
        authtoken,
      },
    }
  );
