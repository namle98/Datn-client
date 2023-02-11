import { Modal, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../components/adminNav";
import AdminProductCard from "../../../components/cards/adminProductCard";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import {
  getProductsByCount,
  getProductsCount,
  removeProduct,
} from "../../../service/product.service";
import "./styles.scss";

function AllProduct() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState("");
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    loadAllProducts();
  }, []);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(page)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug: string) => {
    setShowConfirmDelete(slug);
  };

  const handleOk = async () => {
    if (!!showConfirmDelete && auth?.idToken) {
      if (auth?.idToken) {
        removeProduct(showConfirmDelete, auth?.idToken)
          .then((res) => {
            loadAllProducts();
            toast.error(`${res.data.title} is deleted`);
          })
          .catch((err) => {
            if (err.response.status === 400) toast.error(err.response.data);
            console.log(err);
          });
      }
    }
    setShowConfirmDelete("");
  };

  const handleCancel = () => {
    setShowConfirmDelete("");
  };

  return (
    <div className="create-product">
      {loading && <LoadingSpinner />}
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-10">
            <div className="content">
              <div className="title-page">All Product</div>
              <div className="row">
                {products.map((product: any) => (
                  <div key={product._id} className="col-md-4 pb-3">
                    <AdminProductCard
                      product={product}
                      handleRemove={handleRemove}
                    />
                  </div>
                ))}
                <nav className="col-md-10 offset-md-2 text-center pt-5 p-3">
                  <Pagination
                    current={page}
                    total={productsCount}
                    onChange={(value) => setPage(value)}
                    pageSize={12}
                  />
                </nav>
                <Modal
                  title="Please Confirm"
                  open={showConfirmDelete ? true : false}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>Do you want delete this product?</p>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProduct;
