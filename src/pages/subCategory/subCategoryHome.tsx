import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/cards/productCard";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { getSubCategory } from "../../service/subCategory.service";

function SubCategoryHome() {
  const [sub, setSub] = useState<any>({});
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    if (slug) {
      getSubCategory(slug).then((res) => {
        console.log(JSON.stringify(res.data, null, 4));
        setSub(res.data.sub);
        setProducts(res.data.products);
        setLoading(false);
      });
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products?.length} Products in "{sub?.name}" sub category
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products?.map((p: any) => (
          <div className="col" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubCategoryHome;
