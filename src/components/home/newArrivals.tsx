import { Pagination, PaginationProps } from "antd";
import { values } from "lodash";
import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../service/product.service";
import LoadingCard from "../cards/loadingCard";
import ProductCard from "../cards/productCard";

function NewArrivals() {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  const handleChangePage: PaginationProps["onChange"] = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product: any) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={productsCount}
            onChange={handleChangePage}
            pageSize={3}
          />
        </nav>
      </div>
    </>
  );
}

export default NewArrivals;
