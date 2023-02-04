import { Category } from "../models/category.model";
import http from "../utils/http";

export const getCategories = () => http.get("categories");
export const getCategory = (slug: string) => http.get(`category/${slug}`);
export const removeCategories = (slug: string, authToken: string) =>
  http.delete(`category/${slug}`, {
    headers: {
      authtoken: authToken,
    },
  });
export const updateCategories = (
  slug: string,
  category: Category,
  authToken: string
) =>
  http.put(`category/${slug}`, category, {
    headers: {
      authtoken: authToken,
    },
  });
export const createCategories = (category: Category, token: any) =>
  http.post("category", category, {
    headers: {
      authtoken: token,
    },
  });
