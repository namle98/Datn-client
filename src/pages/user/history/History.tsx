import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import Invoice from "../../../components/order/invoice";
import ShowPaymentInfo from "../../../components/showPaymentInfo/showPaymentInfo";
import UserNav from "../../../components/userNav/userNav";
import useAuth from "../../../hooks/useAuth";
import { getUserOrders } from "../../../service/user.service";
import "./styles.scss";

function HistoryPage() {
  const { auth } = useAuth();
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(auth?.idToken).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

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
              <b>{p.product?.title}</b>
            </td>
            <td>{p.product?.price}</td>
            <td>{p.product?.brand}</td>
            <td>{p?.color}</td>
            <td>{p?.count}</td>
            <td>
              {p.product?.shipping === "Yes" ? (
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

  const showEachOrders = () =>
    orders.reverse().map((order: any, i: any) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className="history-page">
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col">
            <div className="content">
              <div className="col title-page">
                {orders.length > 0
                  ? "User purchase orders"
                  : "No purchase orders"}

                {showEachOrders()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
