import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, lazy, Suspense } from "react";
import useAuth from "./hooks/useAuth";
import { auth } from "./firebase";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { currentUser } from "./utils/auth";
import { AxiosResponse } from "axios";
import LoadingSpinner from "./components/Loading/LoadingSpinner";
// import Order from "./pages/admin/orders/Order";
// import Header from "./components/header/index";
// import Login from "./pages/auth/Login";
// import Home from "./pages/Home";
// import RegisterComplete from "./pages/auth/Register/RegisterComplete";
// import Footer from "./components/footer";
// import ScrollButton from "./components/scrollTop";
// import UserRoutes from "./components/routes/UserRoutes";
// import Password from "./pages/user/password/Password";
// import WishList from "./pages/user/wishList/WishList";
// import AdminRoutes from "./components/routes/AdminRoutes";
// import Dashboard from "./pages/admin/dashboard/Dashboard";
// import CategoryCreate from "./pages/admin/category/CategoryCreate";
// import SubCategoryCreate from "./pages/admin/subCategory/subCategoryCreate";
// import ProductCreate from "./pages/admin/product/productCreate";
// import AllProduct from "./pages/admin/product/allProduct";
// import ProductUpdate from "./pages/admin/product/productUpdate";
// import Product from "./pages/product/Product";
// import CategoryHome from "./pages/category/categoryHome";
// import SubCategoryHome from "./pages/subCategory/subCategoryHome";
// import Shop from "./pages/shop/shop";
// import Cart from "./pages/cart/cart";
// import SideDrawer from "./components/drawer/SideDrawer";
// import Checkout from "./pages/checkout/checkout";
// import CouponCreate from "./pages/admin/coupon/couponCreate";
// import AdminPassword from "./pages/admin/changePassword/adminPassword";
// import Payment from "./pages/payment/payment";
// import HistoryPage from "./pages/user/history/History";

const Login = lazy(() => import("./pages/auth/Login"));
const Header = lazy(() => import("./components/header/index"));
const Home = lazy(() => import("./pages/Home"));
const RegisterComplete = lazy(
  () => import("./pages/auth/Register/RegisterComplete")
);
const Footer = lazy(() => import("./components/footer"));
const ScrollButton = lazy(() => import("./components/scrollTop"));
const UserRoutes = lazy(() => import("./components/routes/UserRoutes"));
const Password = lazy(() => import("./pages/user/password/Password"));
const WishList = lazy(() => import("./pages/user/wishList/WishList"));
const AdminRoutes = lazy(() => import("./components/routes/AdminRoutes"));
const Dashboard = lazy(() => import("./pages/admin/dashboard/Dashboard"));
const CategoryCreate = lazy(
  () => import("./pages/admin/category/CategoryCreate")
);
const SubCategoryCreate = lazy(
  () => import("./pages/admin/subCategory/subCategoryCreate")
);
const ProductCreate = lazy(() => import("./pages/admin/product/productCreate"));
const AllProduct = lazy(() => import("./pages/admin/product/allProduct"));
const ProductUpdate = lazy(() => import("./pages/admin/product/productUpdate"));
const Product = lazy(() => import("./pages/product/Product"));
const CategoryHome = lazy(() => import("./pages/category/categoryHome"));
const SubCategoryHome = lazy(
  () => import("./pages/subCategory/subCategoryHome")
);
const Shop = lazy(() => import("./pages/shop/shop"));
const Cart = lazy(() => import("./pages/cart/cart"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const Checkout = lazy(() => import("./pages/checkout/checkout"));
const CouponCreate = lazy(() => import("./pages/admin/coupon/couponCreate"));
const AdminPassword = lazy(
  () => import("./pages/admin/changePassword/adminPassword")
);
const Payment = lazy(() => import("./pages/payment/payment"));
const HistoryPage = lazy(() => import("./pages/user/history/History"));
const Order = lazy(() => import("./pages/admin/orders/Order"));

function App() {
  const { unsubcribeUser, auth: user } = useAuth();
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(
      auth.getAuth(),
      async (user: any) => {
        if (user) {
          const idTokenResult = await user.getIdTokenResult();
          currentUser(idTokenResult?.token)
            .then((res: AxiosResponse) => {
              unsubcribeUser({
                email: res.data.email,
                idToken: idTokenResult?.token,
                name: res.data.name,
                role: res.data.role,
                _id: res.data._id,
              });
            })
            .catch((err: any) => console.log(err));
        }
      }
    );
    return () => unsubcribe();
  }, []);
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/category/:slug" element={<CategoryHome />} />
        <Route path="/sub/:slug" element={<SubCategoryHome />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<UserRoutes />}>
          <Route path="/user/history" element={<HistoryPage />} />
          <Route path="/user/password" element={<Password />} />
          <Route path="/user/wishlist" element={<WishList />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/category" element={<CategoryCreate />} />
          <Route path="/admin/sub" element={<SubCategoryCreate />} />
          <Route path="/admin/product" element={<ProductCreate />} />
          <Route path="/admin/products" element={<AllProduct />} />
          <Route path="/admin/product/:slug" element={<ProductUpdate />} />
          <Route path="/admin/coupon" element={<CouponCreate />} />
          <Route path="/admin/order" element={<Order />} />
          <Route path="/admin/password" element={<AdminPassword />} />
        </Route>
      </Routes>
      <ScrollButton />
      <Footer />
    </Suspense>
  );
}

export default App;
