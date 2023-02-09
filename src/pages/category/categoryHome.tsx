import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/cards/productCard";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { getCategory } from "../../service/category.service";

function CategoryHome() {
  const [category, setCategory] = useState<any>({});
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    if (slug) {
      getCategory(slug).then((res) => {
        setCategory(res.data.category);
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
              {products?.length} Products in "{category?.name}" category
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

export default CategoryHome;
