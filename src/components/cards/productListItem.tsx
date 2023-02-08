import React from "react";
import { Link } from "react-router-dom";

function ProductListItems({ product }: any) {
  const {
    price,
    category,
    subs,
    shipping,
    color,
    brand,
    quantity,
    sold,
    display,
    chip,
    ram,
    rom,
  } = product;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        <span>Price</span>{" "}
        <span className="label label-default label-pill pull-xs-right">
          $ {price}
        </span>
      </li>

      {category && (
        <li className="list-group-item">
          <span>Category</span>{" "}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          <span>Sub Categories</span>

          {subs.map((s: any) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        <span>Chipset</span>{" "}
        <span className="label label-default label-pill pull-xs-right">
          {chip}
        </span>
      </li>
      <li className="list-group-item">
        <span>Ram</span>{" "}
        <span className="label label-default label-pill pull-xs-right">
          {ram}
        </span>
      </li>
      <li className="list-group-item">
        <span>Rom</span>{" "}
        <span className="label label-default label-pill pull-xs-right">
          {rom}
        </span>
      </li>
      <li className="list-group-item">
        <span>Display</span>{" "}
        <span className="label label-default label-pill pull-xs-right">
          {display}
        </span>
      </li>
      <li className="list-group-item">
        <span>Shipping</span>{" "}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>

      <li className="list-group-item">
        <span>Color</span>{" "}
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>

      <li className="list-group-item">
        <span>Brand</span>{" "}
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>

      <li className="list-group-item">
        <span>Available</span>{" "}
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>

      <li className="list-group-item">
        <span>Sold</span>{" "}
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
}

export default ProductListItems;
