import { Form, Select } from "antd";
import { FormInstance, useForm } from "antd/es/form/Form";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../components/adminNav";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import {
  getCategories,
  getCategorySubs,
} from "../../../service/category.service";
import { createProduct } from "../../../service/product.service";
import ProductCreateForm from "./productCreateForm";
import "./styles.scss";

const colorOption = [
  { value: "Black", label: "Black" },
  { value: "Brown", label: "Brown" },
  { value: "Silver", label: "Silver" },
  { value: "White", label: "White" },
  { value: "Blue", label: "Blue" },
];
const brandOption = [
  { value: "Apple", label: "Apple" },
  { value: "Samsung", label: "Samsung" },
  { value: "Microsoft", label: "Microsoft" },
  { value: "Lenovo", label: "Lenovo" },
  { value: "ASUS", label: "ASUS" },
];
const shippingOption = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: "",
  brands: "",
  color: "",
  brand: "",
};

function ProductCreate() {
  const [form] = useForm();
  const formRef = useRef<FormInstance>(null);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const createProducts = () => {
    createProduct(values, auth?.idToken)
      .then((res) => {
        toast.success(`"${res.data.title}" is created`);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.err);
      });
  };

  const handleFormChange = () => {
    // const hasErrors =
    //   form.getFieldsError().some(({ errors }) => errors.length) ||
    //   !form.getFieldsValue().subCategory ||
    //   !form.getFieldsValue().category;
    // setDisabledSave(hasErrors);
  };

  const handleChange = (e: any, field?: string) => {
    switch (field) {
      case "shipping":
        setValues({ ...values, shipping: e });
        break;
      case "brand":
        setValues({ ...values, brand: e });
        break;
      case "color":
        setValues({ ...values, color: e });
        break;
      // case "category":
      //   setValues({ ...values, category: e });
      //   break;
      default:
        setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const handleCatagoryChange = (value: string) => {
    setValues({ ...values, subs: [], category: value });
    getCategorySubs(value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="create-product">
      {loading && <LoadingSpinner />}
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-8">
            <div className="content">
              <div className="title-page">Create Product</div>
              <ProductCreateForm
                createProducts={createProducts}
                handleFormChange={handleFormChange}
                handleChange={handleChange}
                brandOption={brandOption}
                colorOption={colorOption}
                shippingOption={shippingOption}
                form={form}
                formRef={formRef}
                values={values}
                handleCatagoryChange={handleCatagoryChange}
                showSub={showSub}
                subOptions={subOptions}
                setValues={setValues}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCreate;
