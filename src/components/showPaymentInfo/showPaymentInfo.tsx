function ShowPaymentInfo({ users, order, showStatus = true }: any) {
  const newOrders = () => {
    const user = users?.find((u: any) => u._id === order.orderdBy);
    if (user) {
      return { ...order, address: user.address, phone: user.phone };
    } else {
      return order;
    }
  };

  return (
    <div>
      <p className="text-center">
        <span>Order Id: {order.paymentIntent.id}</span>
        {" / "}
        <span>
          Amount:{" / "}
          {(order.paymentIntent.amount / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
        {" / "}
        <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
        {" / "}
        <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
        {" / "}
        <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
        {" / "}
        <span>
          Orderd on:{" / "}
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </span>
        {" / "}
        {newOrders()?.address && (
          <>
            <span>Address: {newOrders()?.address.toUpperCase()}</span>
            {" / "}
          </>
        )}
        {newOrders()?.phone && (
          <>
            <span>Phone: {newOrders()?.phone.toUpperCase()}</span>
            {" / "}
          </>
        )}

        <br />
        {showStatus && (
          <span className="badge bg-primary text-white">
            STATUS: {order.orderStatus}
          </span>
        )}
      </p>
    </div>
  );
}

export default ShowPaymentInfo;
