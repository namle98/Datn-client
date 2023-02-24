import {
  CreditCardOutlined,
  DollarCircleOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic } from "antd";
import React from "react";

function Revenue({ totalAmount, money }: any) {
  return (
    <Space direction="horizontal">
      <Card style={{ width: "200px" }}>
        <Space direction="horizontal">
          <CreditCardOutlined style={{ fontSize: "20px" }} />
          <Statistic title="Card" value={`$${money("card") || 0}`} />
        </Space>
      </Card>
      <Card style={{ width: "200px" }}>
        <Space direction="horizontal">
          <PayCircleOutlined style={{ fontSize: "20px" }} />
          <Statistic title="Cash" value={`$${money("cash") || 0}`} />
        </Space>
      </Card>
      <Card style={{ width: "200px" }}>
        <Space direction="horizontal">
          <DollarCircleOutlined style={{ fontSize: "20px" }} />
          <Statistic title="Total" value={`$${totalAmount() || 0}`} />
        </Space>
      </Card>
    </Space>
  );
}

export default Revenue;
