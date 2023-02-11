import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../../components/adminNav";
import { getAllProducts } from "../../../service/product.service";
import PieChart from "./pieChart";
import "./styles.scss";

interface DataType {
  title: string;
  slug: string;
}

function Dashboard() {
  const [allProduct, setAllProduct] = useState<any>([]);

  useEffect(() => {
    getAllProducts().then((res) => setAllProduct(res.data));
  }, []);

  const productOutOfStock = allProduct?.filter((p: any) => p.quantity === 0);

  const columns: ColumnsType<DataType> = [
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
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
