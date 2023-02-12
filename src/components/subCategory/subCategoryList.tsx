import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubCategories } from "../../service/subCategory.service";
import LoadingSpinner from "../Loading/LoadingSpinner";
import "./styles.scss";

function SubCategoryList() {
  const [subs, setSubs] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    setLoading(true);
    getSubCategories().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs?.map((s: any) => (
      <Link to={`/sub/${s.slug}`} className="col btn btn-lg m-3">
        <div key={s._id}>{s.name}</div>
      </Link>
    ));

  return (
    <div className="container sub-category-list-home-page">
      <div className="row">{loading ? <LoadingSpinner /> : showSubs()}</div>
    </div>
  );
}

export default SubCategoryList;
