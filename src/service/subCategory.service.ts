import { Category } from "../models/category.model";
import http from "../utils/http";

export const getSubCategories = () => http.get("subs");
export const getSubCategory = (slug: string) => http.get(`sub/${slug}`);
export const removeSubCategories = (slug: string, authToken: string) =>
  http.delete(`sub/${slug}`, {
    headers: {
      authtoken: authToken,
    },
  });
export const updateSubCategories = (
  slug: string,
  sub: any,
  authToken: string
) =>
  http.put(`sub/${slug}`, sub, {
    headers: {
      authtoken: authToken,
    },
  });
export const createSubCategories = (sub: any, token: any) =>
  http.post("sub", sub, {
    headers: {
      authtoken: token,
    },
  });
