import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../components/adminNav";
import AdminProductCard from "../../../components/cards/adminProductCard";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import {
  getProductsByCount,
  removeProduct,
} from "../../../service/product.service";

function AllProduct() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState("");

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
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
          <div className="col-md-8">
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
