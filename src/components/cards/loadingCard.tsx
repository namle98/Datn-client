import { Card, Skeleton } from "antd";
import React from "react";

interface PropsParam {
  count: number;
}

function LoadingCard({ count }: PropsParam) {
  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className="col-md-4" key={i}>
          <Skeleton active></Skeleton>
        </Card>
      );
    }

    return totalCards;
  };

  return <div className="row pb-5">{cards()}</div>;
}

export default LoadingCard;
