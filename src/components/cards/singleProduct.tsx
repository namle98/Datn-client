import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Tabs, Tooltip } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import _ from "lodash";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { addToWishlist } from "../../service/user.service";
import StarRating from "react-star-ratings";
import Laptop from "../../images/laptop.png";
import RatingModal from "../modal/ratingModal";
import ProductListItems from "./productListItem";
import ImageSlider from "../imageSlider/imageSlider";

interface PropsParam {
  product: any;
  onStarClick: (rating: number) => void;
  star: any;
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

function SingleProduct({ product, onStarClick, star }: PropsParam) {
  const { auth } = useAuth();
  const [tooltip, setTooltip] = useState("Click to add");

  // redux

  const dispatch = useDispatch();
  // router
  let navigate = useNavigate();

  const { title, images, description, _id } = product;

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        cart = JSON.parse(cartData);
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

  const handleAddToWishlist = (e: any) => {
    e.preventDefault();
    addToWishlist(product._id, auth?.idToken).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      navigate("/user/wishlist");
    });
  };

  return (
    <>
      <div className="col-lg-7">
        {images && images.length ? (
          <ImageSlider images={images} />
        ) : (
          //   {images &&
          //     images.map((i: any) => <img src={i.url} key={i.public_id} />)}
          // </ImageSlider>
          <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-lg-5">
        <h1 className="bg-info p-3">{title}</h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}

        <Card
          actions={[
            <Tooltip placement="top" title={tooltip}>
              <button
                onClick={handleAddToCart}
                style={{
                  color: "rgba(0, 0, 0, 0.45)",
                  border: "0px",
                  backgroundColor: "white",
                }}
                disabled={product.quantity < 1}
              >
                <ShoppingCartOutlined className="text-danger" />
                <br />
                {product.quantity < 1 ? "Out of Stock" : "Add To Cart"}
              </button>
            </Tooltip>,
            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </a>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                // isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
}

export default SingleProduct;
