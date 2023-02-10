import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../components/adminNav";
import Orders from "../../../components/order/order";
import useAuth from "../../../hooks/useAuth";
import { changeStatus, getOrders } from "../../../service/admin.service";
import "./styles.scss";

function Dashboard() {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(auth?.idToken).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId: string, orderStatus: any) => {
    changeStatus(orderId, orderStatus, auth?.idToken).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };
  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-8">
            <div className="content">
              <Orders orders={orders} handleStatusChange={handleStatusChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
