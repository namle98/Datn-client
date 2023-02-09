import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductCardInCheckout from "../../components/cards/productCardInCheckout";
import useAuth from "../../hooks/useAuth";
import { userCart } from "../../service/user.service";
import "./styles.scss";

function Cart() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { cart } = useSelector((state: any) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue: any, nextValue: any) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, auth?.idToken)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, auth?.idToken)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
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

  const showProductSummary = () =>
    cart.map((c: any, i: any) => (
      <tr>
        <td>
          <a>{c.title}</a>
        </td>
        <td>{c.count}</td>
        <td>${c.price * c.count}</td>
      </tr>
    ));

  const setUrlCart = () => {
    localStorage.setItem("url", "/cart");
  };

  return (
    <div className="container cart-page pt-2">
      <div className="row">
        <div className="col-md-7">
          <h4>Cart / {cart.length} Product</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <aside className="col-md-5">
          <div className="summary">
            <h3 className="summary-title">Your Order</h3>

            <table className="table table-summary">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Count</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {showProductSummary()}
                <tr className="summary-total">
                  <td>Total: </td>
                  <td>${getTotal()}</td>
                </tr>
              </tbody>
            </table>

            <div className="col">
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
        </aside>
      </div>
    </div>
  );
}

export default Cart;
