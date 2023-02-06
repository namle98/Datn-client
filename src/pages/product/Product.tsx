import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/cards/productCard";
import SingleProduct from "../../components/cards/singleProduct";
import useAuth from "../../hooks/useAuth";
import {
  getProduct,
  getRelated,
  productStar,
} from "../../service/product.service";
import "./styles.scss";

function Product() {
  const { auth } = useAuth();
  const [product, setProduct] = useState<any>({});
  const [related, setRelated] = useState<any>([]);
  const [star, setStar] = useState(0);
  // redux

  const { slug } = useParams();

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && auth?._id) {
      let existingRatingObject = product.ratings.find(
        (ele: any) => ele.postedBy.toString() === auth._id?.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  });

  const loadSingleProduct = () => {
    if (slug) {
      getProduct(slug).then((res) => {
        setProduct(res.data);
        // load related
        getRelated(res.data._id).then((res) => setRelated(res.data));
      });
    }
  };

  const onStarClick = (newRating: any) => {
    setStar(newRating);
    console.table(newRating, product._id);
    productStar(product._id, newRating, auth?.idToken).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
    });
  };

  return (
    <div className="product-detail">
      <div className="container">
        <div className="row pt-4">
          <SingleProduct
            product={product}
            onStarClick={onStarClick}
            star={star}
          />
        </div>

        <div className="row">
          <div className="col text-center pt-5 pb-5">
            <hr />
            <h4>Related Products</h4>
            <hr />
          </div>
        </div>

        <div className="row pb-5">
          {related.length ? (
            related.map((r: any) => (
              <div key={r._id} className="col-md-4">
                <ProductCard product={r} />
              </div>
            ))
          ) : (
            <div className="text-center col">No Products Found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
