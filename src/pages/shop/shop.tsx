import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Checkbox, Menu, Pagination, Radio, Slider } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/cards/productCard";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { getCategories } from "../../service/category.service";
import {
  fetchProductsByFilter,
  getProductsByCount,
  getProductsCount,
} from "../../service/product.service";
import { getSubCategories } from "../../service/subCategory.service";
import Star from "./star";
import "./styles.scss";

function Shop() {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState<[number, number]>([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState<any>([]);
  const [categoryIds, setCategoryIds] = useState<any>([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState<any>([]);
  const [sub, setSub] = useState<any>("");
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  const [brands, setBrands] = useState([
    "Apple",
    "LG",
    "Microsoft",
    "Lenovo",
    "ASUS",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Gray",
    "Silver",
    "White",
    "Yellow",
  ]);
  const [color, setColor] = useState("");
  const [chips, setChips] = useState([
    "Core i3",
    "Core i5",
    "Core i7",
    "Core i9",
    "Ryzen 5",
    "Ryzen 7",
    "Ryzen 9",
    "Apple M1",
    "Apple M2",
  ]);
  const [chip, setChip] = useState("");
  const [rams, setRams] = useState(["8GB", "16GB", "32GB", "64GB"]);
  const [ram, setRam] = useState("");
  const [displays, setDisplays] = useState([
    "13,3 inh",
    "14 inh",
    "15.6 inh",
    "16 inh",
  ]);
  const [display, setDisplay] = useState("");
  const [roms, setRoms] = useState(["128Gb", "256GB", "512Gb", "1TB", "2TB"]);
  const [rom, setRom] = useState("");
  const [shipping, setShipping] = useState("");

  let dispatch = useDispatch();
  let { search } = useSelector((state: any) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubCategories().then((res) => setSubs(res.data));
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const fetchProducts = (arg: any) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(page).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    if (text) {
      const delayed = setTimeout(() => {
        fetchProducts({ query: text });
      }, 300);
      return () => clearTimeout(delayed);
    } else {
      loadAllProducts();
    }
  }, [text]);

  // 3. load products based on price range
  // useEffect(() => {
  //   console.log("ok to request");
  //   fetchProducts({ price });
  // }, [ok]);

  const handleSlider = (value: any) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setRam("");
    setRom("");
    setChip("");
    setDisplay("");
    setShipping("");
    setTimeout(() => {
      fetchProducts({ price: value });
    }, 300);
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c: any) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e: any) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setRam("");
    setRom("");
    setChip("");
    setDisplay("");
    setShipping("");
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    if (inTheState?.length) {
      fetchProducts({ category: inTheState });
    } else {
      loadAllProducts();
    }
    // console.log(inTheState);
  };

  // 5. show products by star rating
  const handleStarClick = (num: any) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setBrand("");
    setColor("");
    setRam("");
    setRom("");
    setChip("");
    setDisplay("");
    setShipping("");
    fetchProducts({ stars: num });
  };

  const onChangeStar = (e: any) => {
    handleStarClick(e.target.value);
  };
  const start = [5, 4, 3, 2, 1];
  const showStars = () => (
    <div>
      {start.map((s) => (
        <div>
          <Radio
            className="pb-2 pl-4 pr-4"
            value={s}
            checked={s === parseInt(star)}
            onChange={onChangeStar}
          >
            <Star starClick={handleStarClick} numberOfStars={s} />
          </Radio>
        </div>
      ))}
    </div>
  );

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s: any) => (
      <Radio
        key={s._id}
        value={s}
        name={s.name}
        checked={s._id === sub?._id}
        onChange={handleSub}
        className="pb-1 pl-4 pr-4"
      >
        {s.name}
      </Radio>
    ));

  const handleSub = (e: any) => {
    // console.log("SUB", sub);
    setSub(e.target.value);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setRam("");
    setRom("");
    setChip("");
    setDisplay("");
    setShipping("");
    fetchProducts({ sub: e.target.value });
  };

  // 7. show products based on brand name
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        key={b}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));
  const showChips = () =>
    chips.map((c) => (
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === chip}
        onChange={handleChip}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));
  const showDisplays = () =>
    displays.map((d) => (
      <Radio
        key={d}
        value={d}
        name={d}
        checked={d === display}
        onChange={handleDisplay}
        className="pb-1 pl-4 pr-4"
      >
        {d}
      </Radio>
    ));
  const showRams = () =>
    rams.map((r) => (
      <Radio
        key={r}
        value={r}
        name={r}
        checked={r === ram}
        onChange={handleRam}
        className="pb-1 pl-4 pr-4"
      >
        {r}
      </Radio>
    ));
  const showRoms = () =>
    roms.map((r) => (
      <Radio
        key={r}
        value={r}
        name={r}
        checked={r === rom}
        onChange={handleRom}
        className="pb-1 pl-4 pr-4"
      >
        {r}
      </Radio>
    ));

  const handleBrand = (e: any) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setRam("");
    setRom("");
    setChip("");
    setDisplay("");
    setBrand(e.target.value);
    setShipping("");
    fetchProducts({ brand: e.target.value });
  };
  const handleRom = (e: any) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setRom(e.target.value);
    setBrand("");
    setChip("");
    setRam("");
    setDisplay("");
    setShipping("");
    fetchProducts({ rom: e.target.value });
  };
  const handleRam = (e: any) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setDisplay("");
    setBrand("");
    setChip("");
    setRom("");
    setRam(e.target.value);
    setShipping("");
    fetchProducts({ ram: e.target.value });
  };
  const handleDisplay = (e: any) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setRam("");
    setRom("");
    setChip("");
    setBrand("");
    setDisplay(e.target.value);
    setShipping("");
    fetchProducts({ display: e.target.value });
  };
  const handleChip = (e: any) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setDisplay("");
    setRom("");
    setRam("");
    setBrand("");
    setChip(e.target.value);
    setShipping("");
    fetchProducts({ chip: e.target.value });
  };

  // 8. show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e: any) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    setShipping("");
    fetchProducts({ color: e.target.value });
  };

  // 9. show products based on shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  const handleShippingchange = (e: any) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setRam("");
    setRom("");
    setChip("");
    setDisplay("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  const clearFilter = () => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setRam("");
    setRom("");
    setChip("");
    setDisplay("");
    setShipping("");
    loadAllProducts();
  };

  return (
    <div>
      {loading && <LoadingSpinner />}
      <div className="container shop-page">
        <div className="row">
          <div className="col-md-3 pt-2">
            <div className="title-search-filter">
              <h4>Search/Filter</h4> <h6 onClick={clearFilter}>Clear Filter</h6>
            </div>

            <hr />
            <Menu defaultOpenKeys={["1", "2", "4", "5"]} mode="inline">
              {/* price */}
              <SubMenu
                key="1"
                title={
                  <span className="h6">
                    <DollarOutlined /> Price
                  </span>
                }
              >
                <div>
                  <Slider
                    className="ml-4 mr-4"
                    tipFormatter={(v) => `$${v}`}
                    range
                    value={price}
                    onChange={handleSlider}
                    max={4999}
                  />
                </div>
              </SubMenu>

              {/* category */}
              <SubMenu
                key="2"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Categories
                  </span>
                }
              >
                <div>{showCategories()}</div>
              </SubMenu>

              {/* stars */}
              <SubMenu
                key="3"
                title={
                  <span className="h6">
                    <StarOutlined /> Rating
                  </span>
                }
              >
                <div>{showStars()}</div>
              </SubMenu>

              {/* sub category */}
              <SubMenu
                key="4"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Sub Categories
                  </span>
                }
              >
                <div className="pl-4 pr-4">{showSubs()}</div>
              </SubMenu>

              {/* brands */}
              <SubMenu
                key="5"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Brands
                  </span>
                }
              >
                <div className="pr-5">{showBrands()}</div>
              </SubMenu>
              {/* Chip */}
              <SubMenu
                key="6"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Chipset
                  </span>
                }
              >
                <div className="pr-5">{showChips()}</div>
              </SubMenu>
              {/* display */}
              <SubMenu
                key="7"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Display
                  </span>
                }
              >
                <div className="pr-5">{showDisplays()}</div>
              </SubMenu>
              {/* ram */}
              <SubMenu
                key="8"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Ram
                  </span>
                }
              >
                <div className="pr-5">{showRams()}</div>
              </SubMenu>
              {/* rom */}
              <SubMenu
                key="9"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Rom
                  </span>
                }
              >
                <div className="pr-5">{showRoms()}</div>
              </SubMenu>

              {/* colors */}
              <SubMenu
                key="10"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Colors
                  </span>
                }
              >
                <div className="pr-5">{showColors()}</div>
              </SubMenu>

              {/* shipping */}
              <SubMenu
                key="11"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Shipping
                  </span>
                }
              >
                <div className="pr-5">{showShipping()}</div>
              </SubMenu>
            </Menu>
          </div>

          <div className="col-md-9 pt-2">
            <h4 style={{ color: "#1890ff" }}>Products</h4>

            {products.length < 1 && <p>No products found</p>}

            <div className="row pb-5">
              {products.map((p: any) => (
                <div key={p._id} className="col-md-4 mt-3">
                  <ProductCard product={p} />
                </div>
              ))}

              <nav className="col-md-10 offset-md-2 text-center pt-5 p-3">
                <Pagination
                  current={page}
                  total={productsCount}
                  onChange={(value) => setPage(value)}
                  pageSize={12}
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
