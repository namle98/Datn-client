import { FormInstance, useForm } from "antd/es/form/Form";
import React, { useEffect, useRef, useState } from "react";
import AdminNav from "../../../components/adminNav";
import FilesUpload from "../../../components/filesUpload";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../../service/product.service";
import {
  getCategories,
  getCategorySubs,
} from "../../../service/category.service";
import { toast } from "react-toastify";
import ProductUpdateForm from "./productUpdateForm";

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

const initialState = {
  title: "",
  description: "",
  price: "",
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

function ProductUpdate() {
  const [form] = useForm();
  const formRef = useRef<FormInstance>(null);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [arrayOfSubs, setArrayOfSubs] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  let { slug } = useParams();

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    if (slug) {
      getProduct(slug).then((p) => {
        // console.log("single product", p);
        // 1 load single proudct
        setValues({ ...values, ...p.data });
        // 2 load single product category subs
        getCategorySubs(p.data.category._id).then((res) => {
          setSubOptions(res.data); // on first load, show default subs
        });
        // 3 prepare array of sub ids to show as default sub values in antd Select
        let arr: any = [];
        p.data.subs.map((s: any) => {
          arr.push(s._id);
        });
        console.log("ARR", arr);
        setArrayOfSubs((prev: any) => arr); // required for ant design select to work
      });
    }
  };

  const loadCategories = () =>
    getCategories().then((c) => {
      console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
      setCategories(c.data);
    });

  const handleUpdateProduct = (e: any) => {
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;
    if (slug) {
      updateProduct(slug, values, auth?.idToken)
        .then((res) => {
          setLoading(false);
          toast.success(`"${res.data.title}" is updated`);
          navigate("/admin/products");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error(err.response.data.err);
        });
    }
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

  const handleCategoryChange = (value: string) => {
    console.log("CLICKED CATEGORY", value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(value);

    getCategorySubs(value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
    });

    console.log("EXISTING CATEGORY values.category", values.category);

    // if user clicks back to the original category
    // show its sub categories in default
    if (values.category === value) {
      loadProduct();
    }
    // clear old sub category ids
    setArrayOfSubs([]);
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
              <div className="title-page">Update Product</div>
              <div className="p-3">
                <FilesUpload
                  values={values}
                  setValues={setValues}
                  setLoading={setLoading}
                />
              </div>
              <ProductUpdateForm
                updateProducts={handleUpdateProduct}
                categories={categories}
                selectedCategory={selectedCategory}
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
                handleCatagoryChange={handleCategoryChange}
                subOptions={subOptions}
                setArrayOfSubs={setArrayOfSubs}
                arrayOfSubs={arrayOfSubs}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductUpdate;
