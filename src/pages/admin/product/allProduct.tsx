import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, InputRef, Modal, Pagination, Space, Table } from "antd";
import {
  ColumnsType,
  ColumnType,
  FilterConfirmProps,
} from "antd/es/table/interface";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNav from "../../../components/adminNav";
import AdminProductCard from "../../../components/cards/adminProductCard";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import {
  getProductsByCount,
  getProductsCount,
  removeProduct,
} from "../../../service/product.service";
import "./styles.scss";
import ModalImage from "react-modal-image";
import laptop from "../../../images/laptop.png";

function AllProduct() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState("");
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(page)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug: string) => {
    setShowConfirmDelete(slug);
  };

  const handleOk = async () => {
    if (!!showConfirmDelete && auth?.idToken) {
      if (auth?.idToken) {
        removeProduct(showConfirmDelete, auth?.idToken)
          .then((res) => {
            loadAllProducts();
            toast.error(`${res.data.title} is deleted`);
          })
          .catch((err) => {
            if (err.response.status === 400) toast.error(err.response.data);
            console.log(err);
          });
      }
    }
    setShowConfirmDelete("");
  };

  const handleCancel = () => {
    setShowConfirmDelete("");
  };

  interface IMG {
    public_id: string;
    url: string;
  }

  interface DataType {
    title: string;
    slug: string;
    brand: any;
    price: number;
    quantity: number;
    color: any;
    shipping: string;
    images: Array<IMG> | [];
    createdAt: string;
  }

  type DataIndex = keyof DataType;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              confirm({ closeDropdown: false });
              close();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      // width: "70%",
      render: (_, record) => (
        <td>
          {record.images.length ? (
            <ModalImage
              small={record.images[0].url}
              large={record.images[0].url}
            />
          ) : (
            <ModalImage small={laptop} large={laptop} />
          )}
        </td>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "70%",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("title"),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: "70%",
      ...getColumnSearchProps("brand"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "70%",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "70%",
      sorter: (a, b) => a.quantity - b.quantity,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: "70%",
      ...getColumnSearchProps("color"),
    },
    {
      title: "Action",
      key: "action",
      width: "30%",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            className="icon-edit-table"
            onClick={() => navigate(`/admin/product/${record.slug}`)}
          />
          <DeleteOutlined
            onClick={() => handleRemove(record.slug)}
            className="icon-delete"
          />
        </Space>
      ),
    },
  ];

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
              <div className="title-page">All Product</div>
              <div>
                <Table
                  dataSource={products}
                  columns={columns}
                  pagination={{
                    total: productsCount,
                    showTotal: (total) => `Total ${total} items`,
                    pageSize: 12,
                    onChange: (value) => {
                      console.log(value);
                      setPage(value);
                    },
                  }}
                ></Table>
                {/* {products.map((product: any) => (
                  <div key={product._id} className="col-md-4 pb-3">
                    <AdminProductCard
                      product={product}
                      handleRemove={handleRemove}
                    />
                  </div>
                ))} */}
                {/* <nav className="col-md-10 offset-md-2 text-center pt-5 p-3">
                  <Pagination
                    current={page}
                    total={productsCount}
                    onChange={(value) => setPage(value)}
                    pageSize={5}
                  />
                </nav> */}
                <Modal
                  title="Please Confirm"
                  open={showConfirmDelete ? true : false}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>Do you want delete this product?</p>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProduct;
