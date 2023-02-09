import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.png";
import "./styles.scss";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state: any) => ({ ...state }));

  return (
    <div className="side-drawer">
      <Drawer
        className="text-center"
        title={`Cart / ${cart.length} Product`}
        placement="right"
        closable={false}
        onClose={() => {
          dispatch({
            type: "SET_VISIBLE",
            payload: false,
          });
        }}
        open={drawer}
      >
        {cart.map((p: any) => (
          <div key={p._id} className="row">
            <div className="col">
              {p.images[0] ? (
                <>
                  <img
                    src={p.images[0].url}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="bg-title-drawer">
                    <p className="text-center ">
                      {p.title} x {p.count}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={laptop}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="bg-title-drawer">
                    <p className="text-center ">
                      {p.title} x {p.count}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        <Link
          to={{
            pathname: "/cart",
          }}
        >
          <button
            type="submit"
            onClick={() =>
              dispatch({
                type: "SET_VISIBLE",
                payload: false,
              })
            }
            className="btn btn-outline-primary-2"
          >
            Go To Cart
          </button>
        </Link>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
