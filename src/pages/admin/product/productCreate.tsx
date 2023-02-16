import { Form, Select } from "antd";
import { FormInstance, useForm } from "antd/es/form/Form";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNav from "../../../components/adminNav";
import FilesUpload from "../../../components/filesUpload";
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
const displayOption = [
  { value: "13,3 inh", label: "13,3 inh" },
  { value: "14 inh", label: "14 inh" },
  { value: "15.6 inh", label: "15.6 inh" },
  { value: "16 inh", label: "16 inh" },
];
const chipOption = [
  { value: "Core i3", label: "Core i3" },
  { value: "Core i5", label: "Core i5" },
  { value: "Core i7", label: "Core i7" },
  { value: "Core i9", label: "Core i9" },
  { value: "Ryzen 5", label: "Ryzen 5" },
  { value: "Ryzen 7", label: "Ryzen 7" },
  { value: "Ryzen 9", label: "Ryzen 9" },
  { value: "Apple M1", label: "Apple M1" },
  { value: "Apple M2", label: "Apple M2" },
];
const ramOption = [
  { value: "8GB", label: "8GB" },
  { value: "16GB", label: "16GB" },
  { value: "32GB", label: "32GB" },
  { value: "64GB", label: "64GB" },
];
const romOption = [
  { value: "128Gb", label: "128Gb" },
  { value: "256GB", label: "256GB" },
  { value: "512Gb", label: "512Gb" },
  { value: "1TB", label: "1TB" },
  { value: "2TB", label: "2TB" },
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
  display: "",
  chip: "",
  ram: "",
  rom: "",
};

function ProductCreate() {
  const [form] = useForm();
  const formRef = useRef<FormInstance>(null);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const createProducts = () => {
    createProduct(values, auth?.idToken)
      .then((res) => {
        toast.success(`"${res.data.title}" is created`);
        navigate("/admin/products");
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
      case "chip":
        setValues({ ...values, chip: e });
        break;
      case "display":
        setValues({ ...values, display: e });
        break;
      case "ram":
        setValues({ ...values, ram: e });
        break;
      case "rom":
        setValues({ ...values, rom: e });
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
          <div className="col-md-10">
            <div className="content">
              <div className="title-page">Create Product</div>
              <div className="p-3">
                <FilesUpload
                  values={values}
                  setValues={setValues}
                  setLoading={setLoading}
                />
              </div>

              <ProductCreateForm
                createProducts={createProducts}
                handleFormChange={handleFormChange}
                handleChange={handleChange}
                brandOption={brandOption}
                colorOption={colorOption}
                shippingOption={shippingOption}
                chipOption={chipOption}
                displayOption={displayOption}
                ramOption={ramOption}
                romOption={romOption}
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
