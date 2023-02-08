import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SearchForm() {
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
    <div className="header-search">
      <a
        onClick={handleSubmit}
        className="search-toggle"
        role="button"
        title="Search"
      >
        <i className="icon-search" />
      </a>
      <form onSubmit={handleSubmit}>
        <div className="header-search-wrapper show active">
          <label htmlFor="q" className="sr-only">
            Search
          </label>
          <input
            type="search"
            className="form-control"
            name="q"
            id="q"
            placeholder="Search in..."
            required
            onChange={handleChange}
            value={text}
          />
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
