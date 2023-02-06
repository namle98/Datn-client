import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Card, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@mui/icons-material";
import Meta from "antd/es/card/Meta";
import { EyeOutlined } from "@ant-design/icons";
import StarRating from "react-star-ratings";
import laptop from "../../images/laptop.png";

interface PropsParam {
  product: any;
}

const showAverage = (p: any) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total: any = [];
    let length = ratingsArray.length;
    // console.log("length", length);

    ratingsArray.map((r: any) => total.push(r.star));
    let totalReduced = total.reduce((p: any, n: any) => p + n, 0);
    // console.log("totalReduced", totalReduced);

    let highest = length * 5;
    // console.log("highest", highest);

    let result = (totalReduced * 5) / highest;
    // console.log("result", result);

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            rating={result}
            // editing={false}
          />{" "}
          ({p.ratings.length})
        </span>
      </div>
    );
  }
};

function ProductCard({ product }: PropsParam) {
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  const { cart } = useSelector((state: any) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      const dataCart = localStorage.getItem("cart");
      if (dataCart) {
        cart = JSON.parse(dataCart);
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  // destructure
  const { images, title, description, slug, price } = product;
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}

      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <button
              style={{
                color: "rgba(0, 0, 0, 0.45)",
                border: "0px",
                backgroundColor: "white",
              }}
              onClick={handleAddToCart}
              disabled={product.quantity < 1}
            >
              <ShoppingCartOutlined className="text-danger" /> <br />
              {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
            </button>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
}

export default ProductCard;
