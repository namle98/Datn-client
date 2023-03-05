import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../components/adminNav";
import Orders from "../../../components/order/order";
import useAuth from "../../../hooks/useAuth";
import {
  changeStatus,
  getOrders,
  getOrdersCount,
} from "../../../service/admin.service";
import "./styles.scss";

function Order() {
  const { auth } = useAuth();
  const [orders, setOrders] = useState<any>([]);
  const [allOrder, setAllOrder] = useState<any>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadOrdersCount();
  }, [page]);

  useEffect(() => {
    getOrders(auth?.idToken).then((res) => {
      setAllOrder(res.data);
    });
  }, []);

  const loadOrdersCount = () =>
    getOrdersCount(page, auth?.idToken).then((res) => {
      setOrders(res.data);
    });

  const handleStatusChange = (orderId: string, orderStatus: any) => {
    changeStatus(orderId, orderStatus, auth?.idToken).then((res) => {
      toast.success("Status updated");
      loadOrdersCount();
    });
  };

  return (
    <div className="order-page">
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-10">
            <div className="content">
              <div className="title-page">Orders</div>
              <Orders orders={orders} handleStatusChange={handleStatusChange} />
              <nav className="col-md-10 offset-md-2 text-center pt-5 p-3">
                <Pagination
                  current={page}
                  total={allOrder?.length}
                  onChange={(value) => setPage(value)}
                  pageSize={3}
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
