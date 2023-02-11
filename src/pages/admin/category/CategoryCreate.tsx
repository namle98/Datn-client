import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, InputRef, Modal, Space, Table } from "antd";
import { FormInstance, useForm } from "antd/lib/form/Form";
import { ColumnsType, ColumnType } from "antd/lib/table";
import { FilterConfirmProps } from "antd/lib/table/interface";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../components/adminNav";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import {
  createCategories,
  getCategories,
  removeCategories,
  updateCategories,
  getCategory,
  //createCategory1,
} from "../../../service/category.service";
import "./styles.scss";

function CategoryCreate() {
  const [form] = useForm();
  const formRef = useRef<FormInstance>(null);
  const [disabledSave, setDisabledSave] = useState(true);
  const [disabledSaveFormUpdate, setDisabledSaveFormUpdate] = useState(true);
  const { auth } = useAuth();
  const [dataSource, setDataSource] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState("");
  const [showModalUpdate, setShowModalUpdate] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: (category: string) => {
      return createCategories({ name: category }, auth?.idToken);
    },
    onError: () => {
      toast.error("category already exists");
    },
    onSuccess: (data) => {
      toast.success(`${data.data?.name} is created`);
    },
  });

  const createCategory = (e: any) => {
    mutate(e.category);
    setTimeout(() => {
      getCategories().then((res) => setDataSource(res.data));
      formRef.current?.resetFields();
    }, 500);
  };

  const { isLoading: loadingTable } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategories(),
    onSuccess: (data) => {
      setDataSource(data.data);
    },
  });

  const handleFormChange = () => {
    const hasErrors =
      form.getFieldsError().some(({ errors }) => errors.length) ||
      !form.getFieldsValue().category ||
      !!categoryName;
    setDisabledSave(hasErrors);
  };
  const handleFormChangeUpdate = () => {
    const hasErrors =
      form.getFieldsError().some(({ errors }) => errors.length) ||
      !form.getFieldsValue().categoryUpdate;
    setDisabledSaveFormUpdate(hasErrors);

    handleOnChangeCategoryName(form.getFieldsValue().categoryUpdate);
  };

  const handleRemoveCategory = (item: any) => {
    setShowConfirmDelete(item?.slug);
  };

  const handleOk = async () => {
    if (!!showConfirmDelete && auth?.idToken) {
      setLoading(true);
      removeCategories(showConfirmDelete, auth?.idToken)
        .then((res) => {
          setLoading(false);
          toast.success(`${res.data.name} deleted`);
          getCategories().then((res) => setDataSource(res.data));
        })
        .catch((err: any) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
    setShowConfirmDelete("");
  };

  const handleCancel = () => {
    setShowConfirmDelete("");
  };

  const updateCategory = (e: any) => {
    // setCategoryName(e.categoryUpdate);
  };

  const handleOnChangeCategoryName = (value: any) => {
    setCategoryName(value);
  };

  const handleEditCategory = (item: any) => {
    console.log(item);
    setShowModalUpdate(item?.slug);
    getCategory(item.slug).then((res) => {
      const category = res.data;
      setCategoryName(category.category.name);
    });
  };

  const handleUpdateCategory = () => {
    setShowModalUpdate("");
    if (auth?.idToken)
      updateCategories(showModalUpdate, { name: categoryName }, auth?.idToken)
        .then((res) => {
          setLoading(false);
          setCategoryName("");
          toast.success(`'${res.data.name}' is updated`);
          getCategories().then((res) => setDataSource(res.data));
        })
        .catch((err: any) => {
          setLoading(false);
          if (err.response.status === 400) toast.error(err.response.data);
        });
  };

  const handleCancelModalUpdate = () => {
    setShowModalUpdate("");
  };

  interface DataType {
    name: string;
    slug: string;
    updatedAt: string;
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
      title: "Category",
      dataIndex: "name",
      key: "name",
      width: "70%",
      sorter: (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("name"),
    },
    {
      title: "Action",
      key: "action",
      width: "30%",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            className="icon-edit"
            onClick={() => handleEditCategory(record)}
          />
          <DeleteOutlined
            onClick={() => handleRemoveCategory(record)}
            className="icon-delete"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="create-category">
      {(isLoading || loading) && <LoadingSpinner />}
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-10">
            <div className="content">
              <div className="title-page">Create Category</div>
              <div
                className="tab-pane fade show active"
                id="signin-2"
                role="tabpanel"
                aria-labelledby="signin-tab-2"
              >
                <Form
                  name="basic"
                  onFinish={createCategory}
                  autoComplete="off"
                  onFieldsChange={handleFormChange}
                  form={form}
                  ref={formRef}
                >
                  <Form.Item
                    name="category"
                    rules={[
                      {
                        required: true,
                        message: "Please input Category!",
                      },
                    ]}
                  >
                    <div className="form-group">
                      <label htmlFor="singin-password-2">New Category *</label>
                      <input type="text" className="form-control" required />
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
              <div className="title-page">Category List</div>
              <div
                className="tab-pane fade show active"
                id="signin-2"
                role="tabpanel"
                aria-labelledby="signin-tab-2"
              >
                <Table
                  loading={loadingTable}
                  dataSource={dataSource}
                  columns={columns}
                  pagination={{
                    total: dataSource.length,
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
                <p>Do you want delete this category?</p>
              </Modal>
              <Modal
                title="Update Category"
                open={showModalUpdate ? true : false}
                onOk={handleUpdateCategory}
                onCancel={handleCancelModalUpdate}
                okText="Save"
                okButtonProps={{
                  disabled: disabledSaveFormUpdate,
                }}
              >
                <div
                  className="tab-pane fade show active"
                  id="signin-2"
                  role="tabpanel"
                  aria-labelledby="signin-tab-2"
                >
                  <Form
                    name="basic"
                    onFinish={updateCategory}
                    autoComplete="off"
                    onFieldsChange={handleFormChangeUpdate}
                    form={form}
                  >
                    <Form.Item
                      name="categoryUpdate"
                      rules={[
                        {
                          required: true,
                          message: "Please input Category!",
                        },
                      ]}
                    >
                      <div className="form-group">
                        <label htmlFor="singin-password-2">Category *</label>
                        <input
                          defaultValue={categoryName}
                          value={categoryName}
                          type="text"
                          className="form-control"
                          required
                          onChange={(e) => handleOnChangeCategoryName(e)}
                        />
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCreate;
