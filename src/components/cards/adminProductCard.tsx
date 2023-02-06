import React from "react";
import { Card } from "antd";
import laptop from "../../images/laptop.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

interface PropsParam {
  product: any;
  handleRemove: (param: string) => void;
}

const AdminProductCard = ({ product, handleRemove }: PropsParam) => {
  // destructure
  const { title, description, images, slug } = product;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : laptop}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(slug)}
          style={{ color: "red" }}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 19)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
