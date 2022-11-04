import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register/Register";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./pages/auth/Register/RegisterComplete";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { auth } from "./firebase";
import ForgotPassword from "./pages/auth/ForgotPassword";

function App() {
  const { unsubcribeUser } = useAuth();
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(
      auth.getAuth(),
      async (user: any) => {
        if (user) {
          const idTokenResult = await user.getIdTokenResult();
          unsubcribeUser({
            email: user.email,
            idToken: idTokenResult.token,
          });
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
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
