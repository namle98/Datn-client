import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import { getUsers } from "../../service/admin.service";
import ShowPaymentInfo from "../showPaymentInfo/showPaymentInfo";
import Invoice from "./invoice";
import "./styles.scss";

function Orders({ orders, handleStatusChange }: any) {
  const { auth } = useAuth();
  const [users, setUser] = useState<any>([]);

  useEffect(() => {
    getUsers(auth?.idToken).then((res) => setUser(res.data));
  }, []);

  const showOrderInTable = (order: any) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p: any, i: any) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showDownloadLink = (order: any) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Download PDF
    </PDFDownloadLink>
  );

  return (
    <div className="order-component">
      {orders.map((order: any) => (
        <div key={order._id} className="pb-5">
          <div className="btn btn-block bg-light row not-margin-row">
            <ShowPaymentInfo users={users} order={order} showStatus={false} />

            <div className="row center-status">
              <div className="col-md-5">Delivery Status</div>
              <div className="col-md-7">
                <select
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="form-control"
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="Not Processed">Not Processed</option>
                  <option value="Cash On Delivery">Cash On Delivery</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {showOrderInTable(order)}
          <div className="row">
            <div className="col">{showDownloadLink(order)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
