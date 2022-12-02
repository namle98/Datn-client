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

function App() {
  const { unsubcribeUser } = useAuth();
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
      </Routes>
      <ScrollButton />
      <Footer />
    </>
  );
}

export default App;
