import http from "../utils/http";

export const getCoupons = async () => http.get(`coupons`);

export const removeCoupon = async (couponId: string, authtoken: any) =>
  http.delete(`coupon/${couponId}`, {
    headers: {
      authtoken,
    },
  });

export const createCoupon = async (coupon: any, authtoken: any) =>
  http.post(
    `coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
