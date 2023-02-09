import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../../components/cards/productCardInCheckout";
import useAuth from "../../hooks/useAuth";
import "./styles.scss";

function Cart() {
  const { auth } = useAuth();
  const { cart } = useSelector((state: any) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue: any, nextValue: any) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    //  userCart(cart, user.token)
    //    .then((res) => {
    //      console.log("CART POST RES", res);
    //      if (res.data.ok) history.push("/checkout");
    //    })
    //    .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    //  userCart(cart, user.token)
    //    .then((res) => {
    //      console.log("CART POST RES", res);
    //      if (res.data.ok) history.push("/checkout");
    //    })
    //    .catch((err) => console.log("cart save err", err));
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p: any) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  const setUrlCart = () => {
    localStorage.setItem("url", "/cart");
  };

  return (
    <div className="container cart-page pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c: any, i: any) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {auth ? (
            <>
              <button
                onClick={saveOrderToDb}
                className="btn btn-outline-primary-2"
                disabled={!cart.length}
              >
                Proceed to Checkout
              </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-warning mt-2"
                disabled={!cart.length}
              >
                Pay Cash on Delivery
              </button>
            </>
          ) : (
            <button
              type="submit"
              onClick={setUrlCart}
              className="btn btn-outline-primary-2"
            >
              <Link
                to={{
                  pathname: "/login",
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
