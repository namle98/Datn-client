import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import {
  Button,
  Form,
  Input,
  InputRef,
  Modal,
  Select,
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
import { getCategories } from "../../../service/category.service";
import {
  createSubCategories,
  getSubCategories,
  updateSubCategories,
  getSubCategory,
  removeSubCategories,
} from "../../../service/subCategory.service";
import "./styles.scss";

function SubCategoryCreate() {
  const [form] = useForm();
  const formRef = useRef<FormInstance>(null);
  const [disabledSave, setDisabledSave] = useState(true);
  const [disabledSaveFormUpdate, setDisabledSaveFormUpdate] = useState(true);
  const { auth } = useAuth();
  const [dataSource, setDataSource] = useState<any>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState("");
  const [showModalUpdate, setShowModalUpdate] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<any>([]);
  const [subCategories, setSubCategories] = useState<any>([]);
  const [categoriesOption, setCategoriesOption] = useState<any>([]);

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  useEffect(() => {
    setCategoriesOption(
      categories.map((c: any) => {
        return { label: c.name, value: c._id };
      })
    );
  }, [categories]);

  useEffect(() => {
    const newSubCategories = subCategories.map((s: any) => {
      const category = categories.find((c: any) => c._id === s.parent);
      if (category) {
        return { ...s, parentName: category.name };
      } else {
        return s;
      }
    });

    setDataSource(newSubCategories);
  }, [categories, subCategories]);

  useEffect(() => {
    const disabled = !subCategoryName || !categoryValue;
    setDisabledSaveFormUpdate(disabled);
  }, [subCategoryName, categoryValue]);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () =>
    getSubCategories().then((s) => setSubCategories(s.data));

  const createSubCategory = (e: any) => {
    createSubCategories(
      { name: e.subCategory, parent: e.category },
      auth?.idToken
    )
      .then((res) => {
        // console.log(res)
        setLoading(false);
        toast.success(`"${res.data.name}" is created`);
        loadSubs();
        formRef.current?.resetFields();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleFormChange = () => {
    const hasErrors =
      form.getFieldsError().some(({ errors }) => errors.length) ||
      !form.getFieldsValue().subCategory ||
      !form.getFieldsValue().category;

    setDisabledSave(hasErrors);
  };

  const handleRemoveCategory = (item: any) => {
    setShowConfirmDelete(item?.slug);
  };

  const handleOk = async () => {
    if (!!showConfirmDelete && auth?.idToken) {
      setLoading(true);
      removeSubCategories(showConfirmDelete, auth?.idToken)
        .then((res) => {
          setLoading(false);
          toast.success(`${res.data.name} deleted`);
          loadSubs();
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
    // setCategoryValue(e.categoryUpdate);
  };

  const handleOnChangeSubCategoryName = (e: any) => {
    setSubCategoryName(e.target.value);
  };
  const handleOnChangeCategoryValue = (value: any) => {
    setCategoryValue(value);
  };

  const handleEditCategory = (item: any) => {
    setShowModalUpdate(item?.slug);
    setCategoryValue(item.parent);
    getSubCategory(item.slug).then((res) => {
      const subCategory = res.data;
      setSubCategoryName(subCategory.name);
    });
  };

  const handleUpdateCategory = () => {
    setShowModalUpdate("");
    setCategoryValue("");
    if (auth?.idToken)
      updateSubCategories(
        showModalUpdate,
        { name: subCategoryName, parent: categoryValue },
        auth?.idToken
      )
        .then((res) => {
          setLoading(false);
          setCategoryValue("");
          toast.success(`'${res.data.name}' is updated`);
          loadSubs();
        })
        .catch((err: any) => {
          setLoading(false);
          if (err.response.status === 400) toast.error(err.response.data);
        });
  };

  const handleCancelModalUpdate = () => {
    setShowModalUpdate("");
    setCategoryValue("");
  };

  interface DataType {
    name: string;
    slug: string;
    parent: string;
    parentName: string;
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
      title: "Sub Category",
      dataIndex: "name",
      key: "name",
      width: "35%",
      sorter: (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("name"),
    },
    {
      title: "Category",
      dataIndex: "parentName",
      key: "parentName",
      width: "35%",
      sorter: (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("parentName"),
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
    <div className="create-sub-category">
      {loading && <LoadingSpinner />}
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-8">
            <div className="content">
              <div className="title-page">Create Sub Category</div>
              <div
                className="tab-pane fade show active"
                id="signin-2"
                role="tabpanel"
                aria-labelledby="signin-tab-2"
              >
                <Form
                  name="basic"
                  onFinish={createSubCategory}
                  autoComplete="off"
                  onFieldsChange={handleFormChange}
                  form={form}
                  ref={formRef}
                >
                  <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                      {
                        required: true,
                        message: "Please select a option",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select a option and change input text below"
                      allowClear
                      options={categoriesOption}
                    ></Select>
                  </Form.Item>
                  <Form.Item
                    name="subCategory"
                    rules={[
                      {
                        required: true,
                        message: "Please input Sub Category!",
                      },
                    ]}
                  >
                    <div className="form-group">
                      <label
                        htmlFor="singin-password-2"
                        style={{ display: "flex" }}
                      >
                        <div style={{ color: "#ff4d4f" }}>* </div> New Sub
                        Category :
                      </label>
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
              <div className="title-page">Sub Category List</div>
              <div
                className="tab-pane fade show active"
                id="signin-2"
                role="tabpanel"
                aria-labelledby="signin-tab-2"
              >
                <Table
                  loading={loading}
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
                <p>Do you want delete this sub category?</p>
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
                    form={form}
                  >
                    <Form.Item
                      name="categoryUpdate"
                      // label="Category"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please select a option",
                      //   },
                      // ]}
                      className="display-block-select-modal"
                    >
                      <div className="form-group">
                        <label
                          htmlFor="singin-password-2"
                          style={{ display: "flex" }}
                        >
                          <div style={{ color: "#ff4d4f" }}>* </div>
                          Category :
                        </label>
                        <Select
                          placeholder="Select a option and change input text below"
                          allowClear
                          options={categoriesOption}
                          value={categoryValue}
                          onChange={handleOnChangeCategoryValue}
                        ></Select>
                      </div>
                    </Form.Item>
                    <Form.Item
                      name="subCategoryUpdate"
                      rules={[
                        {
                          required: true,
                          message: "Please input Sub Category!",
                        },
                      ]}
                    >
                      <div className="form-group">
                        <label
                          htmlFor="singin-password-2"
                          style={{ display: "flex" }}
                        >
                          <div style={{ color: "#ff4d4f" }}>* </div> Sub
                          Category :
                        </label>
                        <input
                          value={subCategoryName}
                          type="text"
                          className="form-control"
                          required
                          onChange={(e) => handleOnChangeSubCategoryName(e)}
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

export default SubCategoryCreate;
