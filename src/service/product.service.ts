import http from "../utils/http";

export const createProduct = (product: any, token: any) =>
  http.post("product", product, {
    headers: {
      authtoken: token,
    },
  });

export const getProductsByCount = (count: number) =>
  http.get(`products/${count}`);

export const removeProduct = (slug: string, authToken: string) =>
  http.delete(`/product/${slug}`, {
    headers: {
      authtoken: authToken,
    },
  });

export const getProduct = async (slug: string) => http.get(`product/${slug}`);

export const updateProduct = async (
  slug: string,
  product: any,
  authtoken: any
) =>
  http.put(`product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

export const getProducts = async (sort: any, order: any, page: any) =>
  http.post(`products`, {
    sort,
    order,
    page,
  });

export const getProductsCount = async () => http.get(`products/total`);

export const productStar = async (
  productId: string,
  star: any,
  authtoken: any
) =>
  http.put(
    `product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getRelated = async (productId: string) =>
  http.get(`product/related/${productId}`);

export const fetchProductsByFilter = async (arg: any) =>
  http.post(`search/filters`, arg);
