import React, {useEffect, useState} from 'react';
import {Button, Card, Input, Modal} from "antd";
import CKEditor from "../../Common/CKEditor";
import {TagsInput} from "react-tag-input-component";
import {activeBlog, createBlog, deleteBlog, getAllBlog, updateBlog} from "../../../utils/_data";
import {EditOutlined} from "@ant-design/icons";
import moment from "moment";
import {toastError, toastSuccess} from "../../../utils/common";

const Blog = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [blogDetail, setBlogDetail] = useState({
        blogTitle : '',
        blogTitleForURL : '',
        blogContent : '',
        relevantCareerPath : '',
        blogDescription: '',
        embedMediaLink:""
    });
    const [isEditable, setIsEditable] = useState(false)
    const [selected, setSelected] = useState([]);
    const [blog, setBlog] = useState([])
    const [blogErrors, setValidation] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBlogDetail({...blogDetail, [name]: value})
    };

    const blogHandleChangeEditor = (evt) => {
        setBlogDetail({...blogDetail, [evt.editor.name]: evt.editor.getData()})
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const getBlogs = async () => {
        const response = await getAllBlog();
        if(response && response.data){
            setBlog(response.data.data);
        }else{
            toastError("Something went wrong");
        }
    };

    useEffect(()=>{
        getBlogs()
    },[])

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsEditable(false);
        setSelected([]);
        resetForm()
    };

    const validation = (name, value) => {
        switch (name) {
            case 'blogTitle':
                if (!value) {
                    return "'Please input blogTitle!'"
                } else {
                    return '';
                }
            case 'blogTitleForURL':
                if (!value) {
                    return "'Please input blogTitleForURL!'"
                } else {
                    return '';
                }
            case 'blogContent':
                if (!value) {
                    return "'Please input blogContent!'"
                } else {
                    return '';
                }
            case 'blogTags':
                if (parseInt(value) === 0) {
                    return "'Please input blogTags!'"
                } else {
                    return '';
                }
            case 'relevantCareerPath':
                if (!value) {
                    return "'Please input relevantCareerPath!'"
                } else {
                    return '';
                }
            case 'blogDescription':
                if (!value) {
                    return "'Please input blogDescription!'"
                } else {
                    return '';
                }
            case 'embedMediaLink':
                if (!value) {
                    return "'Please input embedMediaLink!'"
                } else {
                    return '';
                }
            default: {
                return null;
            }
        }
    };

    const resetForm = () => {
        setBlogDetail({});
        setValidation({});
        setSelected([]);
    };

    const handleOk = async () => {
        let allErrors = {};

        const userData = {
            blogTitle : blogDetail.blogTitle,
            blogTitleForURL : blogDetail.blogTitleForURL,
            blogContent : blogDetail.blogContent,
            blogTags : selected.length,
            relevantCareerPath : blogDetail.relevantCareerPath,
            blogDescription : blogDetail.blogDescription,
            embedMediaLink:blogDetail.embedMediaLink
        };
        blogDetail.blogTags = selected.length;
        Object.keys(blogDetail).forEach(key => {
            const error = validation(key, userData[key]);
            if (error && error.length) {
                allErrors[key] = error
            }
        });
        if (Object.keys(allErrors).length) {
            return setValidation(allErrors)
        } else {
            blogDetail.blogTags = selected.join();
            blogDetail.blogTitleForURL = blogDetail.blogTitleForURL.replaceAll(' ', '+');
            if (blogDetail._id) {
                const res = await updateBlog(blogDetail);
                if (res?.success) {
                    console.log("success------>>>");
                } else {
                    console.log("error------>>>");
                }
            } else {
                const res = await createBlog(blogDetail);
                if (res?.success) {
                    console.log("success------>>>");
                } else {
                    console.log("error------>>>");
                }
            }
            await getBlogs();
            setIsModalVisible(false);
            resetForm()
        }
    };

    const onEdit = (item) => {
        setIsEditable(true);
        setIsModalVisible(true);
        setSelected(item?.blogTags?.split(","));
        setBlogDetail(item);
    };

    const activeTask = async (record) => {
        if (window.confirm("Are you want to active this session ?")){
            const res = await activeBlog(record._id);
            if (res && res.success){
                await getBlogs();
                toastSuccess("Successfully Active session");
            } else {
                toastError("Something went wrong");
            }
        }
    };

    const deActiveTask = async (record) => {
        if (window.confirm("Are you want to delete this session ?")){
            const res = await deleteBlog(record._id);
            if (res && res.success){
                await getBlogs();
                toastSuccess("Successfully disActive session");
            } else {
                toastError("Something went wrong");
            }
        }
    };

    return (
        <>
            <div className="row taskEngagement mt-2">
                <Button type="primary" onClick={showModal} className="ml-auto mr-5 mb-3">Create Blog</Button>
                <div className="col-sm-12 col-md-12">
                    <div className="row add-task" style={{flexDirection: "column", gap: '30px', alignItems: "center"}}>
                        {
                            blog && blog.length ? blog.map((item, i) =>(
                                <div className="col-sm-12 col-xs-12 col-md-5" key={i}>
                                    <Card
                                        title={item?.blogTitle}
                                        extra={<div>
                                            <EditOutlined key="edit" style={{marginRight: "40px"}} onClick={()=>onEdit(item)}/>
                                            <button disabled={item.isActive} className="btn btn-success add-task-btn mr-5" onClick={() => activeTask(item)}>
                                                Active
                                            </button>
                                            <button disabled={!item.isActive} className="btn btn-danger add-task-btn mr-5" onClick={() => deActiveTask(item)}>
                                                DeActive
                                            </button>
                                        </div>}
                                    >
                                        <div>
                                            <h2>{item?.blogDescription}</h2><br/>
                                            <span dangerouslySetInnerHTML={{__html: item.blogContent || "-"}} />
                                            <span><b>Blog CareerPath :</b> {item?.relevantCareerPath}</span><br/>
                                            <span><b>Blog Tags :</b> {item?.blogTags}</span><br/>
                                            <span><b>Created At :</b> {moment(item?.createdAt).format("MMMM DD YYYY")}</span><br/>
                                        </div>
                                    </Card>
                                </div>
                            )) : <div className=" col-sm-12 col-md-12"><h4 className="text-center">Records not found</h4></div>
                        }
                    </div>
                </div>
            </div>
            <Modal title={`${isEditable ? 'Edit Blog' : "Create Blog"}`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                   maskClosable={false}>
                <p className="font-weight-bold">Blog Title</p>
                <Input name="blogTitle" value={blogDetail?.blogTitle} onChange={handleChange}/>
                <p className="text-danger">{blogErrors.blogTitle || ""}</p>

                <p className="font-weight-bold">Blog Title For URL</p>
                <Input name="blogTitleForURL" value={blogDetail?.blogTitleForURL} onChange={handleChange}/>
                <p className="text-danger">{blogErrors.blogTitleForURL || ""}</p>

                <p className="font-weight-bold">Blog embedMediaLinkL</p>
                <Input name="embedMediaLink" value={blogDetail?.embedMediaLink||''} onChange={handleChange}/>
                <p className="text-danger">{blogErrors.embedMediaLink || ""}</p>

                <p className="font-weight-bold">Blog Description</p>
                <Input name="blogDescription" value={blogDetail?.blogDescription} onChange={handleChange}/>
                <p className="text-danger">{blogErrors.blogDescription || ""}</p>

                <p className="mt-3 font-weight-bold">Blog content</p>
                <CKEditor name="blogContent" data={blogDetail?.blogContent} onChange={blogHandleChangeEditor}/>
                <p className="text-danger">{blogErrors.blogContent || ""}</p>

                <p className="font-weight-bold">Blog Tags</p>
                <TagsInput
                    value={selected}
                    onChange={setSelected}
                    name="blogTags"
                    placeHolder="enter blog tag"
                />
                <p className="text-danger">{blogErrors.blogTags || ""}</p>

                <p className="font-weight-bold">Relevant Career Path</p>
                <Input name="relevantCareerPath" value={blogDetail?.relevantCareerPath} onChange={handleChange}/>
                <p className="text-danger">{blogErrors.relevantCareerPath || ""}</p>
            </Modal>
        </>
    )
};

export default Blog;
