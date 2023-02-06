import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";

interface PropsParam {
  updateProducts: (e: any) => void;
  // handleFormChange: () => void;
  handleChange: (e: any, field?: string) => void;
  values: any;
  handleCatagoryChange: (value: string) => void;
  subOptions: any;
  form: any;
  formRef: any;
  shippingOption: any;
  brandOption: any;
  colorOption: any;
  categories: any;
  selectedCategory: any;
  arrayOfSubs: any;
  setArrayOfSubs: (param: string) => void;
}

function ProductUpdateForm({
  updateProducts,
  // handleFormChange,
  form,
  formRef,
  values,
  handleChange,
  brandOption,
  colorOption,
  shippingOption,
  handleCatagoryChange,
  subOptions,
  categories,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
}: PropsParam) {
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  const [disabledSave, setDisabledSave] = useState(false);

  useEffect(() => {
    const isDisabled =
      !title ||
      !description ||
      !price ||
      !quantity ||
      !category ||
      !brand ||
      !color ||
      !shipping;
    setDisabledSave(isDisabled);
  }, [values]);

  return (
    <div
      className="tab-pane fade show active"
      id="signin-2"
      role="tabpanel"
      aria-labelledby="signin-tab-2"
    >
      <Form
        name="basic"
        onFinish={updateProducts}
        autoComplete="off"
        // onFieldsChange={handleFormChange}
        form={form}
        ref={formRef}
      >
        <Form.Item
          name="title"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input Product Name!",
          //   },
          // ]}
        >
          <div className="form-group">
            <label htmlFor="singin-password-2" style={{ display: "flex" }}>
              <div style={{ color: "#ff4d4f" }}>* </div>Product Name :
            </label>
            <input
              name="title"
              value={title}
              onChange={handleChange}
              type="text"
              className="form-control"
              required
            />
          </div>
        </Form.Item>
        <Form.Item
          name="description"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input Description!",
          //   },
          // ]}
        >
          <div className="form-group">
            <label htmlFor="singin-password-2" style={{ display: "flex" }}>
              <div style={{ color: "#ff4d4f" }}>* </div> Description :
            </label>
            <input
              name="description"
              value={description}
              onChange={handleChange}
              type="text"
              className="form-control"
              required
            />
          </div>
        </Form.Item>
        <Form.Item
          name="price"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input Price!",
          //   },
          // ]}
        >
          <div className="form-group">
            <label htmlFor="singin-password-2" style={{ display: "flex" }}>
              <div style={{ color: "#ff4d4f" }}>* </div> Price :
            </label>
            <input
              name="price"
              value={price}
              onChange={handleChange}
              type="text"
              className="form-control"
              required
            />
          </div>
        </Form.Item>
        <Form.Item
          name="quantity"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input Quantity!",
          //   },
          // ]}
        >
          <div className="form-group">
            <label htmlFor="singin-password-2" style={{ display: "flex" }}>
              <div style={{ color: "#ff4d4f" }}>* </div> Quantity :
            </label>
            <input
              name="quantity"
              value={quantity}
              onChange={handleChange}
              type="text"
              className="form-control"
              required
            />
          </div>
        </Form.Item>
        <Form.Item
          name="category"
          // label="Category"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please select a option",
          //   },
          // ]}
        >
          <div className="form-group">
            <label htmlFor="singin-password-2" style={{ display: "flex" }}>
              <div style={{ color: "#ff4d4f" }}>* </div>Category :
            </label>
            <Select
              placeholder="Select a option and change input text above"
              allowClear
              onChange={handleCatagoryChange}
              value={selectedCategory ? selectedCategory : category?._id}
            >
              {categories?.map((c: any) => (
                <Select.Option key={c._id} value={c._id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          name="subCategory"
          // label="Sub Category"
        >
          <div className="form-group">
            <label htmlFor="singin-password-2" style={{ display: "flex" }}>
              Sub Category :
            </label>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              value={arrayOfSubs}
              onChange={(value) => setArrayOfSubs(value)}
            >
              {subOptions.length &&
                subOptions.map((s: any) => (
                  <Select.Option key={s._id} value={s._id}>
                    {s.name}
                  </Select.Option>
                ))}
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          name="brand"
          // label="Brand"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please select a option",
          //   },
          // ]}
        >
          <div className="form-group">
            <label htmlFor="singin-password-2" style={{ display: "flex" }}>
              <div style={{ color: "#ff4d4f" }}>* </div>Brand :
            </label>
            <Select
              placeholder="Select a option and change input text above"
              allowClear
              options={brandOption}
              value={brand}
              onChange={(v) => handleChange(v, "brand")}
            ></Select>
          </div>
        </Form.Item>
        <Form.Item
          name="color"
          // label="Color"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please select a option",
          //   },
          // ]}
        >
          <div className="form-group">
            <label htmlFor="singin-password-2" style={{ display: "flex" }}>
              <div style={{ color: "#ff4d4f" }}>* </div>Color :
            </label>
            <Select
              placeholder="Select a option and change input text above"
              allowClear
              value={color}
              onChange={(v) => handleChange(v, "color")}
              options={colorOption}
            ></Select>
          </div>
        </Form.Item>
        <Form.Item
          name="shipping"
          //label="Shipping"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please select a option",
          //   },
          // ]}
        >
          <div className="form-group">
            <label htmlFor="singin-password-2" style={{ display: "flex" }}>
              <div style={{ color: "#ff4d4f" }}>* </div>Shipping :
            </label>
            <Select
              value={shipping}
              onChange={(v) => handleChange(v, "shipping")}
              placeholder="Select a option and change input text above"
              allowClear
              options={shippingOption}
            ></Select>
          </div>
        </Form.Item>
        <div>
          <Form.Item>
            <div className="form-footer">
              <button
                type="submit"
                className="btn btn-outline-primary-2"
                disabled={disabledSave}
              >
                <span>Save</span>
                <i className="icon-long-arrow-right" />
              </button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default ProductUpdateForm;
