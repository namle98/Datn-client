import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../service/category.service";
import LoadingSpinner from "../Loading/LoadingSpinner";
import "./styles.scss";

function CategoryList() {
  const [categories, setCategories] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories?.map((c: any) => (
      <Link to={`/category/${c.slug}`} className="col btn btn-lg m-3">
        <div key={c._id}>{c.name}</div>
      </Link>
    ));

  return (
    <div className="container category-list-home-page">
      <div className="row">
        {loading ? <LoadingSpinner /> : showCategories()}
      </div>
    </div>
  );
}

export default CategoryList;
