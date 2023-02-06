import { Route, Routes } from "react-router-dom";
import Header from "./components/header/index";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./pages/auth/Register/RegisterComplete";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { auth } from "./firebase";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { currentUser } from "./utils/auth";
import { AxiosResponse } from "axios";
import Footer from "./components/footer";
import ScrollButton from "./components/scrollTop";
import HistoryPage from "./pages/user/History";
import UserRoutes from "./components/routes/UserRoutes";
import Password from "./pages/user/password/Password";
import WishList from "./pages/user/wishList/WishList";
import AdminRoutes from "./components/routes/AdminRoutes";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import SubCategoryCreate from "./pages/admin/subCategory/subCategoryCreate";
import ProductCreate from "./pages/admin/product/productCreate";
import AllProduct from "./pages/admin/product/allProduct";
import ProductUpdate from "./pages/admin/product/productUpdate";
import Product from "./pages/product/Product";

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
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route element={<UserRoutes />}>
          <Route path="/user/history" element={<HistoryPage />} />
          <Route path="/user/password" element={<Password />} />
          <Route path="/user/wishlist" element={<WishList />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/category" element={<CategoryCreate />} />
          <Route path="/admin/sub" element={<SubCategoryCreate />} />
          <Route path="/admin/product" element={<ProductCreate />} />
          <Route path="/admin/products" element={<AllProduct />} />
          <Route path="/admin/product/:slug" element={<ProductUpdate />} />
        </Route>
      </Routes>
      <ScrollButton />
      <Footer />
    </>
  );
}

export default App;
