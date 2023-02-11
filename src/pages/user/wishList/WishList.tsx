import { DeleteOutlined } from "@ant-design/icons";
import { Modal, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserNav from "../../../components/userNav/userNav";
import useAuth from "../../../hooks/useAuth";
import { getWishlist, removeWishlist } from "../../../service/user.service";
import "./styles.scss";

interface DataType {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
}

function WishList() {
  const { auth } = useAuth();
  const [wishlist, setWishlist] = useState<any>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState("");

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(auth?.idToken).then((res) => {
      // console.log(res);
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId: string) => {
    setShowConfirmDelete(productId);
  };

  const handleOk = async () => {
    if (!!showConfirmDelete && auth?.idToken) {
      removeWishlist(showConfirmDelete, auth?.idToken).then((res) => {
        loadWishlist();
      });
    }
    setShowConfirmDelete("");
  };

  const handleCancel = () => {
    setShowConfirmDelete("");
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "70%",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      sortDirections: ["descend", "ascend"],
      render: (_, record) => (
        <Link to={`/product/${record.slug}`}>
          <td>{record.title}</td>
        </Link>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "30%",
      render: (_, record) => (
        <Space size="middle">
          <DeleteOutlined
            onClick={() => handleRemove(record._id)}
            className="icon-delete"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="wish-list-page">
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col-md-10">
            <div className="content">
              <div className="title-page">Wishlist</div>
              <Table
                dataSource={wishlist}
                columns={columns}
                pagination={{
                  total: wishlist.length,
                  showTotal: (total) => `Total ${total} items`,
                }}
              ></Table>
              <Modal
                title="Please Confirm"
                open={showConfirmDelete ? true : false}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Do you want delete this wishlist?</p>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishList;
