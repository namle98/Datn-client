import { Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../../components/adminNav";
import { getAllProducts } from "../../../service/product.service";
import PieChart from "./pieChart";
import "./styles.scss";
import ModalImage from "react-modal-image";
import laptop from "../../../images/laptop.png";
import { getOrders } from "../../../service/admin.service";
import useAuth from "../../../hooks/useAuth";
import Revenue from "./revenue";
import moment from "moment";

interface IMG {
  public_id: string;
  url: string;
}

interface DataType {
  title: string;
  slug: string;
  images: Array<IMG> | [];
}

const dayOption: any = [
  { value: "0", label: "Today" },
  // { value: "1", label: "Last day" },
  { value: "7", label: "7 days ago" },
  { value: "30", label: "Last month" },
];

function Dashboard() {
  const { auth } = useAuth();
  const [allProduct, setAllProduct] = useState<any>([]);
  const [orders, setOrders] = useState<any>([]);
  const [day, setDay] = useState("0");

  useEffect(() => {
    getAllProducts().then((res) => setAllProduct(res.data));
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(auth?.idToken).then((res) => {
      setOrders(res.data);
    });

  const totalAmount = () => {
    if (orders?.length > 0) {
      const newDate = moment().subtract(parseInt(day), "day").toISOString();
      const orderWithDate =
        day !== "0"
          ? orders?.filter(
              (o: any) =>
                moment(new Date(o?.createdAt)).diff(moment(newDate), "days") >=
                0
            )
          : orders?.filter(
              (o: any) =>
                moment(new Date(o?.createdAt)).dayOfYear() ===
                moment(newDate).dayOfYear()
            );

      const amountArr = orderWithDate?.map((o: any) => {
        return o.paymentIntent.amount;
      });
      if (amountArr) {
        let totalAmountCard = 0;
        for (let i = 0; i < amountArr.length; i++) {
          totalAmountCard += amountArr[i];
        }
        return totalAmountCard / 100;
      } else {
        return 0;
      }
    }
  };

  const money = (typePayment: string) => {
    if (orders?.length > 0) {
      const newDate = moment().subtract(parseInt(day), "day").toISOString();

      const orderPayCard = orders?.filter(
        (o: any) => o.paymentIntent.payment_method_types[0] === typePayment
      );

      const orderWithDate =
        day !== "0"
          ? orderPayCard?.filter(
              (o: any) =>
                moment(new Date(o?.createdAt)).diff(moment(newDate), "days") >=
                0
            )
          : orderPayCard?.filter(
              (o: any) =>
                moment(new Date(o?.createdAt)).dayOfYear() ===
                moment(newDate).dayOfYear()
            );

      const amountArr = orderWithDate?.map((o: any) => {
        return o.paymentIntent.amount;
      });
      if (amountArr) {
        let totalAmountCard = 0;
        for (let i = 0; i < amountArr.length; i++) {
          totalAmountCard += amountArr[i];
        }
        return totalAmountCard / 100;
      } else {
        return 0;
      }
    }
  };

  const handleChangeDay = (v: any) => {
    setDay(v);
  };

  const productOutOfStock = allProduct?.filter((p: any) => p.quantity === 0);

  const columns: ColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      // width: "70%",
      render: (_, record) => (
        <td>
          {record.images.length ? (
            <ModalImage
              small={record.images[0].url}
              large={record.images[0].url}
            />
          ) : (
            <ModalImage small={laptop} large={laptop} />
          )}
        </td>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
      width: "90%",
      render: (_, record) => (
        <td>
          <Link to={`/admin/product/${record.slug}`}>{record.title}</Link>
        </td>
      ),
    },
  ];

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-10">
            <div className="content">
              <div style={{ marginBottom: "20px" }}>
                <div className="title-page">Revenue</div>
                <div style={{ marginBottom: "10px" }}>
                  <Select
                    allowClear
                    options={dayOption}
                    value={day}
                    style={{ width: "50%" }}
                    onChange={handleChangeDay}
                  ></Select>
                </div>
                <Revenue totalAmount={totalAmount} money={money} />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <div className="title-page">List of products out of stock</div>
                <Table dataSource={productOutOfStock} columns={columns} />
              </div>
              <div className="title-page">Dashboard</div>
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
