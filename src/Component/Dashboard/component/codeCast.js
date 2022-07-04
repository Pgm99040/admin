import React, {useEffect, useState} from 'react';
import {Button, Card, Input, Modal, Select, Table} from "antd";
import CKEditor from "../../Common/CKEditor";
import {
    activeCodeCastStatus,
    createCodeCast, deleteCodeCast,
    getAllCategoryList, getAllCodeCastAdmin,
    getCategoryIdBySubcategory,
    updateCodeCast
} from "../../../utils/_data";
import Loader from "../../Common/Loader";
import {EditOutlined} from "@ant-design/icons";
import {toastError, toastSuccess} from "../../../utils/common";
import  Flip_Image from '../../../assets/images/Flip_Image.jpg'

const codeCastLevel = [
    {value: "Beginner", label: "Beginner"},
    {value: "Intermediate", label: "Intermediate"},
    {value: "Expert", label: "Expert"}
];

const CodeCast = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditable, setIsEditable] = useState(false)
    const [flip, setFlip] = useState(false)
    const [codecastId, setcodecastId] = useState('')
    const [subcategory, setSubcategory] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [codeCastError, setValidation] = useState({});
    const [codeCastList, setCodeCastList] = useState([])
    const [subcategoryId, setSubcategoryId] = useState('');
    const [loading, setLoading] = useState(false);
    const [codeCastDetail, setCodeCastDetail] = useState({
        codeCastTitle : '',
        codeCastImage : '',
        codeCastFlipPageContent : '',
        mediaEmbed : '',
        codeCastLevel: '',
        category: "",
        subCategory: "",
        discription:'',
    });

    const getAllCategorysList = async () =>{
        const response = await getAllCategoryList();
        if (response && response.data && response.data.success) {
            setCategoryList(response.data.result || []);
        } else {
            console.log(response.msg);
        }
    };

    const getAllCodeCast = async () => {
        setLoading(true)
        const response = await getAllCodeCastAdmin();
        if (response && response.data) {
            setCodeCastList(response.data.data || []);
            setLoading(false)
        } else {
            console.log(response.msg);
            setLoading(false)
        }
    };

    useEffect(()=>{
        getAllCodeCast()
    },[])

    const getCategoryWithSubcategory = async (id) =>{
        const response = await getCategoryIdBySubcategory(id);
        if (response && response.data && response.data.success) {
            setSubcategory((response && response.data && response.data.result) || [])
        } else {
            console.log(response.msg);
        }
    };

    const handleChange = async (e) => {
        const {name, value} = e.target;
        if (name === "category") {
            await getCategoryWithSubcategory(value);
        }
        setCodeCastDetail({...codeCastDetail, [name]: value})
    };

    const blogHandleChangeEditor = (evt) => {
        setCodeCastDetail({...codeCastDetail, [evt.editor.name]: evt.editor.getData()})
    };

    const discriptionHandleChangeEditor = (evt) => {
        setCodeCastDetail({...codeCastDetail, [evt.editor.name]: evt.editor.getData()})
    };

    const showModal = () => {
        getAllCategorysList()
        setIsModalVisible(true);
    };

    const resetForm = () => {
        setCodeCastDetail({})
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        // setIsEditable(false);
        resetForm()
    };

    const validation = (name, value) => {
        switch (name) {
            case 'codeCastTitle':
                if (!value) {
                    return "'Please input codeCastTitle!'"
                } else {
                    return '';
                }
            case 'codeCastImage':
                if (!value) {
                    return "'Please input codeCastImage!'"
                } else {
                    return '';
                }
            case 'codeCastFlipPageContent':
                if (!value) {
                    return "'Please input codeCastFlipPageContent!'"
                } else {
                    return '';
                }
            case 'mediaEmbed':
                if (!value) {
                    return "'Please input mediaEmbed!'"
                } else {
                    return '';
                }
            case 'codeCastLevel':
                if (!value) {
                    return "'Please input codeCastLevel!'"
                } else {
                    return '';
                }
            case 'category':
                if (!value) {
                    return "'Please input category!'"
                } else {
                    return '';
                }
            case 'subCategory':
                if (!value) {
                    return "'Please input subCategory!'"
                } else {
                    return '';
                }
            case 'discription':
                if (!value) {
                    return "'Please input discription!'"
                } else {
                    return '';
                }
            default: {
                return null;
            }
        }
    };
    useEffect(()=>{
         setCodeCastDetail({...codeCastDetail,subCategory:subcategoryId})
    },[subcategoryId])

    const handleOk = async () => {
        let allErrors = {};

        const userData = {
            codeCastTitle : codeCastDetail.codeCastTitle,
            codeCastImage : codeCastDetail.codeCastImage,
            codeCastFlipPageContent : codeCastDetail.codeCastFlipPageContent,
            mediaEmbed : codeCastDetail.mediaEmbed,
            codeCastLevel : codeCastDetail.codeCastLevel,
            category : codeCastDetail.category,
            subCategory : codeCastDetail.subCategory,
            discription:codeCastDetail.discription
        };
        Object.keys(codeCastDetail).forEach(key => {
            const error = validation(key, userData[key]);
            if (error && error.length) {
                allErrors[key] = error
            }
        });
        if (Object.keys(allErrors).length) {
            return setValidation(allErrors)
        } else {
            if (codeCastDetail._id) {
                const res = await updateCodeCast(codeCastDetail);
                if (res?.success) {
                    console.log("success------>>>");
                } else {
                    console.log("error------>>>");
                }
            } else {
                const res = await createCodeCast(codeCastDetail);
                if (res?.success) {
                    console.log("success------>>>");
                } else {
                    console.log("error------>>>");
                }
            }
        }
            await getAllCodeCast();
            setIsModalVisible(false);
            resetForm()
    };

    const onShowContent=(id)=>{
        setFlip(!flip)
        setcodecastId(id)
    }

    const onEdit = async (item) => {
        getAllCategorysList()
        setIsEditable(true);
        setIsModalVisible(true);
        setCodeCastDetail({
            _id : item._id,
            codeCastTitle : item.codeCastTitle,
            codeCastImage : item.codeCastImage,
            codeCastFlipPageContent : item.codeCastFlipPageContent,
            mediaEmbed : item.mediaEmbed,
            codeCastLevel : item.codeCastLevel,
            category : item?.category?._id,
            subCategory: item?.subCategory?.name,
            discription:item?.discription
        });
        setSubcategoryId(item?.subCategory?._id)
    };

    const activeCodeCast = async (record) => {
        if (window.confirm("Are you want to active this Job Post ?")){
            const res = await activeCodeCastStatus(record._id);
            if (res && res.success){
                await getAllCodeCast();
                toastSuccess("Successfully Active JobPost");
            } else {
                toastError("Something went wrong");
            }
        }
    };

    const deActiveCodeCast = async (record) => {
        if (window.confirm("Are you want to delete this Job Post ?")){
            const res = await deleteCodeCast(record._id);
            if (res && res.success){
                await getAllCodeCast();
                toastSuccess("Successfully disActive JobPost");
            } else {
                toastError("Something went wrong");
            }
        }
    };
    if (loading) return <Loader/>;

    return (
        <>
            <div className="row taskEngagement mt-2">
                <Button type="primary" onClick={showModal} className="ml-auto mr-5 mb-3">Create CodeCast</Button>
            </div>
            {
                codeCastList && codeCastList.length ? codeCastList.map((item, i) =>(

                    <div className="col-sm-12 col-md-12 task-description" key={i}>
                        <div className='row'>
                            <div className='col-sm-2 col-xs-12'>
                                <img className="taskIcon" src={item?.codeCastImage} height={150} width={150} alt='' />
                            </div>

                            <div className="col-md-6 col-sm-12 col-xs-12 no-left-padding-div">
                                {flip && codecastId===item._id?<>
                                    {item.mediaEmbed &&
                                    <div className="col-md-12 col-xs-12 col-sm-12 no-padding-div">
                                        <iframe width="420" height="315" src={item?.mediaEmbed} title="Media Link" />
                                    </div>}
                                    <div className="col-md-12 col-xs-12 col-sm-12 no-padding-div">
                                        <p className="task_desc" dangerouslySetInnerHTML={{__html: item?.codeCastFlipPageContent || "-"}} />
                                    </div>
                                </>:<><div className="col-md-12 col-xs-12 col-sm-12 no-padding-div">
                                    <h1 className="task_category mb-3">{item?.codeCastTitle}</h1>&nbsp;
                                    <h5 className="task_category mb-3"><b>CodeCast Id</b> : {item?._id}</h5>
                                    <h5 className="task_category mb-3"><b>CodeCast Level</b> : {item?.codeCastLevel}</h5>
                                    <h5 className="task_category mb-3"><b>Category</b> : {item?.category.name}</h5>
                                    <h5 className="task_category mb-3"><b>Sub Category</b> : {item?.subCategory?.name||""}</h5>&nbsp;
                                    <div className="divider"></div>
                                </div></>}
                            </div>
                            <div className="edit-icon col-md-1 col-sm-12 col-xs-12 float-right">
                                <EditOutlined onClick={()=>onEdit(item)}/>
                            </div>
                           <div className="delete-icon col-md-1 col-sm-12 col-xs-12 float-right">
                                <Button disabled={item.isActive} type="primary" danger onClick={() => activeCodeCast(item)}>Active</Button>
                            </div>
                           <div className="delete-icon col-md-1 col-sm-12 col-xs-12 float-right">
                                <Button disabled={!item.isActive} type="primary" danger onClick={() => deActiveCodeCast(item)}>DeActive</Button>
                            </div>
                            <div className="delete-icon col-md-1 col-sm-12 col-xs-12 float-right">
                                <img
                                    style={{height: 50,borderRadius: "50%",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",margin:"10px",cursor:"pointer",width:'auto'}}
                                    alt="example"
                                    src={Flip_Image}
                                    id={item._id}
                                    onClick={()=>(onShowContent(item._id))}
                                />
                            </div>
                        </div>
                    </div>
                )) : <div className=" col-sm-12 col-md-12"><h4 className="text-center">Records not found</h4></div>
            }
            <Modal title={`${isEditable ? 'Edit CodeCast' : "Create CodeCast"}`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                   maskClosable={false}>
                <p className="font-weight-bold">Code Cast Title</p>
                <Input name="codeCastTitle" value={codeCastDetail?.codeCastTitle} onChange={handleChange}/>
                <p className="text-danger">{codeCastError.codeCastTitle || ""}</p>

                <p className="font-weight-bold">Code Cast Image</p>
                <Input name="codeCastImage" value={codeCastDetail?.codeCastImage} onChange={handleChange}/>
                <p className="text-danger">{codeCastError.codeCastImage || ""}</p>

                <p className="mt-3 font-weight-bold">Code Cast FlipPage Content</p>
                <CKEditor name="codeCastFlipPageContent" data={codeCastDetail?.codeCastFlipPageContent} onChange={blogHandleChangeEditor}/>
                <p className="text-danger">{codeCastError.codeCastFlipPageContent || ""}</p>

                <p className="mt-3 font-weight-bold">Discription</p>
                <CKEditor name="discription" data={codeCastDetail?.discription||''} onChange={discriptionHandleChangeEditor}/>
                <p className="text-danger">{codeCastError.discription || ""}</p>

                <p className="font-weight-bold">Media Embed</p>
                <Input name="mediaEmbed" value={codeCastDetail?.mediaEmbed} onChange={handleChange}/>
                <p className="text-danger">{codeCastError.mediaEmbed || ""}</p>

                <p className="font-weight-bold">Code Cast Level</p>
                <Select name="codeCastLevel"  placeholder="Select" value={codeCastDetail?.codeCastLevel || ''}
                        onChange={(value) =>handleChange({target: {name: "codeCastLevel", value}})}>
                    <Select.Option value="">Select</Select.Option>
                    {codeCastLevel && codeCastLevel.map((item, i) =>(
                        <Select.Option value={item.value} key={i}>{item.label}</Select.Option>
                    ))}
                </Select>
                <p className="text-danger">{codeCastError.codeCastLevel || ""}</p>

                <p className="mt-3 font-weight-bold">Category</p>
                <Select name="category"  placeholder="Select" value={codeCastDetail?.category || ''}
                        onChange={(value) =>handleChange({target: {name: "category", value}})}>
                    <Select.Option value="">Select</Select.Option>
                    {categoryList && categoryList.map((item, i) =>(
                        <Select.Option value={item._id} key={i}>{item.name}</Select.Option>
                    ))}
                </Select>
                <p className="text-danger">{codeCastError.category || ""}</p>

                <p className="mt-3 font-weight-bold">Subcategory</p>
                <Select name="subCategory"  placeholder="Select" value={codeCastDetail?.subCategory || ''}
                        onChange={(value) =>handleChange({target: {name: "subCategory", value}})}>
                    <Select.Option value="">Select</Select.Option>
                    {subcategory && subcategory.map((item, i) =>(
                        <Select.Option value={item._id} key={i}>{item.name}</Select.Option>
                    ))}
                </Select>
                <p className="text-danger">{codeCastError.subCategory || ""}</p>
            </Modal>
        </>
    )
};

export default CodeCast;
