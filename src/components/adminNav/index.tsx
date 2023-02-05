import { useLocation, useNavigate } from "react-router-dom";
import "./index.scss";

function AdminNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const redirectToPage = (url: string) => {
    navigate(url);
  };
  return (
    <div className="admin-nav-page">
      <div className="menu-user">
        <ul>
          <li
            onClick={() => redirectToPage("/admin/dashboard")}
            className={`${pathname.includes("dashboard") ? "active" : ""}`}
          >
            DashBoard
          </li>
          <li
            onClick={() => redirectToPage("/admin/product")}
            className={`${pathname === "/admin/product" ? "active" : ""}`}
          >
            Product
          </li>
          <li
            onClick={() => redirectToPage("/admin/products")}
            className={`${pathname.includes("products") ? "active" : ""}`}
          >
            Products
          </li>
          <li
            onClick={() => redirectToPage("/admin/category")}
            className={`${pathname.includes("category") ? "active" : ""}`}
          >
            Category
          </li>
          <li
            onClick={() => redirectToPage("/admin/sub")}
            className={`${pathname.includes("sub") ? "active" : ""}`}
          >
            Sub Category
          </li>
          <li
            onClick={() => redirectToPage("/admin/coupon")}
            className={`${pathname.includes("coupon") ? "active" : ""}`}
          >
            Coupon
          </li>
          <li
            onClick={() => redirectToPage("/user/password")}
            className={`${pathname.includes("password") ? "active" : ""}`}
          >
            Password
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminNav;
