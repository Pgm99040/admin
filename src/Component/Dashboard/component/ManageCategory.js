import React, {useEffect, useState} from 'react'
import {Button, Input, Modal, Table} from "antd";
import {
    createCategory,
    getCategoryIdBySubcategoryAdmin,
    createSubCategory,
    activeCategory, deleteCategory, activeSubCategory, deleteSubCategory, getAllCategoryListAdmin
} from "../../../utils/_data";
import {toastError, toastSuccess} from "../../../utils/common";
import Loader from "../../Common/Loader";

const ManageCategory = (props) => {

    const [categoryDetail, setCategoryDetail] = useState({
        name : '',
        description : ''
    });
    const [subCategoryDetail, setSubCategoryDetail] = useState({
        name : '',
        description : ''
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [categoryList, setCategoryList] = useState([])
    const [categoryError, setValidation] = useState({});
    const [subCategoryError, setValidationSubCategory] = useState({});
    const [expandedLessonRowKey, setLessonKey] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [categoryRecord, setCategoryRecord] = useState({});
    const [subCategoryModel, setSubCategoryModel] = useState(false);
    const [loading, setLoading] = useState(false);

    const getAllCategorysList = async () =>{
        setLoading(true)
        const response = await getAllCategoryListAdmin();
        if (response && response.data && response.data.success) {
            setCategoryList(response.data.result || []);
            setLoading(false)

        } else {
            console.log(response.msg);
            setLoading(false)

        }
    };

    useEffect(()=>{
        getAllCategorysList()
    },[])
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleCancel1 = () => {
        setSubCategoryModel(false)
    };

    const resetForm = () => {
        setCategoryDetail({});
        setSubCategoryDetail({})
    };

    const validation = (name, value) => {
        switch (name) {
            case 'name':
                if (!value) {
                    return "'Please input name!'"
                } else {
                    return '';
                }
            case 'description':
                if (!value) {
                    return "'Please input description!'"
                } else {
                    return '';
                }
            default: {
                return null;
            }
        }
    };

    const handleOk = async () => {
        let allErrors = {};

        const userData = {
            name : categoryDetail.name,
            description : categoryDetail.description
        };
        Object.keys(categoryDetail).forEach(key => {
            const error = validation(key, userData[key])
            if (error && error.length) {
                allErrors[key] = error
            }
        });
        if (Object.keys(allErrors).length) {
            return setValidation(allErrors)
        } else {
            const res = await createCategory(categoryDetail);
            if (res?.success) {
                console.log("success------>>>");
            } else {
                console.log("error------>>>");
            }
            await getAllCategorysList();
            setIsModalVisible(false);
            resetForm()
        }
    };

    const handleOkSubCategory = async () => {
        let allErrors = {};

        const userData = {
            name : subCategoryDetail.name,
            description : subCategoryDetail.description
        };
        Object.keys(subCategoryDetail).forEach(key => {
            const error = validation(key, userData[key]);
            if (error && error.length) {
                allErrors[key] = error
            }
        });
        if (Object.keys(allErrors).length) {
            return setValidationSubCategory(allErrors)
        } else {
            subCategoryDetail.categoryId = categoryRecord.id;
            const res = await createSubCategory(subCategoryDetail);
            if (res?.success) {
                console.log("success------>>>");
            } else {
                console.log("error------>>>");
            }
            await getSubCategory(categoryRecord.id);
            setSubCategoryModel(false);
            resetForm()
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCategoryDetail({...categoryDetail, [name]: value})
    };

    const handleChangeSubCategory = (e) => {
        const {name, value} = e.target;
        setSubCategoryDetail({...subCategoryDetail, [name]: value})
    };

    const onAddSubCategory = (record) => {
        setCategoryRecord(record);
        setSubCategoryModel(true)
    };

    const columns = [
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'Description', dataIndex: 'description', key: 'description'},
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record, i) => {
                return (
                    <>
                        <button className="btn btn-primary add-task-btn mr-5" onClick={()=>onAddSubCategory(record)}>
                            Add SubCategory
                        </button>
                        <button disabled={record.isActive} className="btn btn-success add-task-btn mr-5" onClick={() => activateCategory(record)}>
                            Active
                        </button>
                        <button disabled={!record.isActive} className="btn btn-danger add-task-btn mr-5" onClick={() => deActiveCategory(record)}>
                            DeActive
                        </button>
                    </>
                )
            },
        },
    ];

    const data = [];
    categoryList && categoryList.length && categoryList.forEach((item, i) => {
        data.push({
            id: item?._id,
            key: i + 1,
            name: item?.name,
            description: item?.description,
            isActive: item?.isActive,
        })
    });

    const getSubCategory = async (i) => {
        const res = await getCategoryIdBySubcategoryAdmin(i);
        if (res && res.data && res.data.success) {
            setSubCategory(res.data.result || []);
        } else {
            toastError("Something went wrong");
        }
    };

    const batchFetchData = async (expanded, record) => {
        setCategoryRecord(record)
        let keys = [];
        if (expanded) {
            await getSubCategory(record.id);
            keys.push(record.key);
        }
        setLessonKey(keys)
    };

    const activateCategory = async (record) => {
        if (window.confirm("Are you want to active this session ?")){
            const res = await activeCategory(record.id);
            if (res && res.success){
                await getAllCategorysList();
                toastSuccess("Successfully Active session");
            } else {
                toastError("Something went wrong");
            }
        }
    };

    const deActiveCategory = async (record) => {
        if (window.confirm("Are you want to delete this session ?")){
            const res = await deleteCategory(record.id);
            if (res && res.success){
                await getAllCategorysList();
                toastSuccess("Successfully disActive session");
            } else {
                toastError("Something went wrong");
            }
        }
    };

    const activateSubCategory = async (record) => {
        if (window.confirm("Are you want to active this session ?")){
            const res = await activeSubCategory(record.id);
            if (res && res.success){
                await getSubCategory(categoryRecord.id);
                toastSuccess("Successfully Active session");
            } else {
                toastError("Something went wrong");
            }
        }
    };

    const deActiveSubCategory = async (record) => {
        if (window.confirm("Are you want to delete this session ?")){
            const res = await deleteSubCategory(record.id);
            if (res && res.success){
                await getSubCategory(categoryRecord.id);
                toastSuccess("Successfully disActive session");
            } else {
                toastError("Something went wrong");
            }
        }
    };

    const expandedRowRender = () => {
        const subCategoryColumns = [
            {title: 'Name', dataIndex: 'name', key: 'name'},
            {title: 'Description', dataIndex: 'description', key: 'description'},
            {
                title: 'Action',
                dataIndex: '',
                key: '',
                render: (record, i) => {
                    return (
                        <>
                            <button disabled={record.isActive} className="btn btn-success add-task-btn mr-5" onClick={() => activateSubCategory(record)}>
                                Active
                            </button>
                            <button disabled={!record.isActive} className="btn btn-danger add-task-btn mr-5" onClick={() => deActiveSubCategory(record)}>
                                DeActive
                            </button>
                        </>
                    )
                },
            }
        ];

        const subCategoryData = [];
        subCategory && subCategory.length && subCategory.forEach((item, i) => {
            subCategoryData.push({
                key: i + 1,
                id: item._id,
                name: item.name || "-",
                description: item.description || "-",
                isActive: item.isActive
            })
        });
        return <div className="col-sm-12 col-md-12">
            <Table
                columns={subCategoryColumns}
                dataSource={subCategoryData}
                pagination={subCategoryData.length > 10 ? true : false}
                showHeader={true}/>
        </div>;
    };
    if (loading) return <Loader/>;

    return (
        <div className="row taskEngagement mt-2">
            <Button type="primary" className="ml-auto mr-5 mb-3" onClick={showModal}>Add Micro Course</Button>
            <div className="col-sm-12 col-md-12">
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={data.length > 10 ? true : false}
                    expandable={{
                        expandedRowRender,
                        onExpand: batchFetchData,
                        expandedRowKeys: expandedLessonRowKey
                    }}
                />
            </div>
            {isModalVisible &&
            <Modal title='Add Category' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} maskClosable={false}>
                <p className="font-weight-bold">Name</p>
                <Input name="name" value={categoryDetail?.name} onChange={handleChange}/>
                <p className="text-danger">{categoryError.name || ""}</p>
                <p className="font-weight-bold">Description</p>
                <Input name="description" value={categoryDetail?.description} onChange={handleChange}/>
                <p className="text-danger">{categoryError.description || ""}</p>
            </Modal>}
            {subCategoryModel &&
            <Modal title='Add Sub Category' visible={subCategoryModel} onOk={handleOkSubCategory} onCancel={handleCancel1} maskClosable={false}>
                <p className="font-weight-bold">Name</p>
                <Input name="name" value={subCategoryDetail?.name} onChange={handleChangeSubCategory}/>
                <p className="text-danger">{subCategoryError.name || ""}</p>
                <p className="font-weight-bold">Description</p>
                <Input name="description" value={subCategoryDetail?.description} onChange={handleChangeSubCategory}/>
                <p className="text-danger">{subCategoryError.description || ""}</p>
            </Modal>}
        </div>
    )
};

export default ManageCategory;
