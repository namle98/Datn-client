import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SearchFormMobile() {
  const dispatch = useDispatch();
  const { search } = useSelector((state: any) => ({ ...state }));
  const { text } = search;

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate(`/shop?${text}`);
  };
  return (
    <form className="mobile-search" onSubmit={handleSubmit}>
      <label className="sr-only">Search</label>
      <input
        type="search"
        className="form-control"
        name="mobile-search"
        id="mobile-search"
        placeholder="Search in..."
        required
        onChange={handleChange}
        value={text}
      />
      <button onClick={handleSubmit} className="btn btn-primary" type="submit">
        <i className="icon-search"></i>
      </button>
    </form>
  );
}

export default SearchFormMobile;
