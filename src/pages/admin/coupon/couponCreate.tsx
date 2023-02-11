import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputRef,
  Modal,
  Space,
  Table,
} from "antd";
import { FormInstance, useForm } from "antd/es/form/Form";
import { ColumnsType, ColumnType } from "antd/es/table";
import { FilterConfirmProps } from "antd/es/table/interface";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../components/adminNav";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import {
  createCoupon,
  getCoupons,
  removeCoupon,
} from "../../../service/coupon.service";
import "./styles.scss";

interface DataType {
  _id: string;
  name: string;
  expiry: string;
  discount: string;
  createdAt: string;
}

type DataIndex = keyof DataType;

function CouponCreate() {
  const { auth } = useAuth();
  const [form] = useForm();
  const formRef = useRef<FormInstance>(null);
  const [expiry, setExpiry] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState<any>([]);
  const [disabledSave, setDisabledSave] = useState(true);
  const searchInput = useRef<InputRef>(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState("");

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => {
    setLoading(true);
    getCoupons()
      .then((res) => {
        setLoading(false);
        setCoupons(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log("get coupon err", err);
      });
  };

  const handleSubmit = (e: any) => {
    setLoading(true);
    createCoupon(
      { name: e.coupon, expiry, discount: e.discount },
      auth?.idToken
    )
      .then((res) => {
        setLoading(false);
        loadAllCoupons(); // load all coupons
        formRef.current?.resetFields();
        setExpiry("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => {
        setLoading(false);
        console.log("create coupon err", err);
      });
  };

  const handleFormChange = () => {
    const hasErrors =
      form.getFieldsError().some(({ errors }) => errors.length) ||
      !form.getFieldsValue().coupon ||
      !form.getFieldsValue().discount;

    setDisabledSave(hasErrors);
  };

  const handleChangeExpiry = (e: any) => {
    setExpiry(e?.$d);
  };

  const handleRemove = (couponId: string) => {
    setShowConfirmDelete(couponId);
  };

  const handleOk = async () => {
    if (!!showConfirmDelete && auth?.idToken) {
      setLoading(true);
      removeCoupon(showConfirmDelete, auth?.idToken)
        .then((res) => {
          loadAllCoupons(); // load all coupons
          setLoading(false);
          toast.error(`Coupon "${res.data.name}" deleted`);
        })
        .catch((err) => console.log(err));
    }
    setShowConfirmDelete("");
  };

  const handleCancel = () => {
    setShowConfirmDelete("");
  };

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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "70%",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("name"),
    },
    {
      title: "Expiry",
      dataIndex: "expiry",
      key: "expiry",
      width: "70%",
      render: (_, record) => (
        <td>{new Date(record.expiry).toLocaleDateString()}</td>
      ),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      width: "70%",
      render: (_, record) => <td>{record.discount}%</td>,
    },
    {
      title: "Action",
      key: "action",
      width: "30%",
      render: (_, record) => (
        <Space size="middle">
          <DeleteOutlined
            onClick={() => handleRemove(record._id)}
            className="icon-delete"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="create-coupon">
      {loading && <LoadingSpinner />}
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-10">
            <div className="content">
              <div className="title-page">Create Coupon</div>
              <div
                className="tab-pane fade show active"
                id="signin-2"
                role="tabpanel"
                aria-labelledby="signin-tab-2"
              >
                <Form
                  name="basic"
                  onFinish={handleSubmit}
                  autoComplete="off"
                  onFieldsChange={handleFormChange}
                  form={form}
                  ref={formRef}
                >
                  <Form.Item
                    name="coupon"
                    rules={[
                      {
                        required: true,
                        message: "Please input Name!",
                      },
                    ]}
                  >
                    <div className="form-group">
                      <label htmlFor="singin-password-2">Name *</label>
                      <input type="text" className="form-control" required />
                    </div>
                  </Form.Item>
                  <Form.Item
                    name="discount"
                    rules={[
                      {
                        required: true,
                        message: "Please input Discount!",
                      },
                    ]}
                  >
                    <div className="form-group">
                      <label htmlFor="singin-password-2">Discount *</label>
                      <input type="text" className="form-control" required />
                    </div>
                  </Form.Item>
                  <Form.Item name="expiry">
                    <div className="form-group select-expiry-date">
                      <label htmlFor="singin-password-2">Expiry *</label>
                      <DatePicker onChange={handleChangeExpiry} />
                    </div>
                  </Form.Item>
                  <div>
                    <Form.Item>
                      <div className="form-footer">
                        <button
                          type="submit"
                          className="btn btn-outline-primary-2"
                          disabled={disabledSave || !expiry}
                        >
                          <span>Save</span>
                          <i className="icon-long-arrow-right" />
                        </button>
                      </div>
                    </Form.Item>
                  </div>
                </Form>
              </div>
              <div className="title-page">Coupon List</div>
              <div
                className="tab-pane fade show active"
                id="signin-2"
                role="tabpanel"
                aria-labelledby="signin-tab-2"
              >
                <Table
                  loading={loading}
                  dataSource={coupons}
                  columns={columns}
                  pagination={{
                    total: coupons.length,
                    showTotal: (total) => `Total ${total} items`,
                  }}
                ></Table>
              </div>
              <Modal
                title="Please Confirm"
                open={showConfirmDelete ? true : false}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Do you want delete this coupon?</p>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponCreate;
