import React, {useEffect, useState} from 'react'
import {Button, Input, Modal, Select, Card, Table} from "antd";
import CKEditor from "../../Common/CKEditor";
import {
    activeJobPosts,
    createJobPost, deleteJobPosts,
    getAllCategoryList, getAllJobPost,
    getCategoryIdBySubcategory,
    updateJobPost
} from "../../../utils/_data";
import cloneDeep from "lodash.clonedeep";
import {JobRole} from '../../constants/JobRole'
import {EditOutlined} from "@ant-design/icons";
import {toastError, toastSuccess} from "../../../utils/common";

const JobPosting = (props) => {

    const initial = {
        taskCategory: null,
        taskSubCategory: null,
        numOfTask: null
    };
    const [jobPost, setJobPost] = useState([])

    const [isEditable, setIsEditable] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [jobPostDetail, setJobPostDetail] = useState({
        jobTitle : '',
        jobRole : '',
        city : '',
        company:'',
        country : '',
        jobDescription : '',
        jobApplicationURL : '',
        remote:false,
        CompanyRecruitercontactemail:''
    });
    const [taskRequire, setTaskRequire] = useState([initial]);
    const [predefinedTaskList, setPredefinedTaskList] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [jobPostErrors, setValidation] = useState({});
    const [isModel, setIsModel] = useState(false);

    const getJobPost = async () => {
        const response = await getAllJobPost();
        if (response && response.data) {
            setJobPost(response.data.data);
        } else {
            console.log('somthing wait wrrong')
        }
    };

    useEffect(()=>{
        getJobPost()
    },[])

    const getAllCategorysList = async () =>{
        const response = await getAllCategoryList();
        if (response && response.data && response.data.success) {
            setPredefinedTaskList(response.data.result || []);
        } else {
            console.log(response.msg);
        }
    };

    const getCategoryWithSubcategory = async (id) =>{
        const response = await getCategoryIdBySubcategory(id);
        if (response && response.data && response.data.success) {
            setSubcategory((response && response.data && response.data.result) || [])
        } else {
            console.log(response.msg);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "remote") {
            setJobPostDetail({...jobPostDetail, [name]: e.target.checked})
        } else {
            setJobPostDetail({...jobPostDetail, [name]: value})
        }
    };

    const handleChangeTask = async (e) => {
        const {name, value, index} = e.target;
        let updatedTask = cloneDeep(taskRequire);
        if (name === "taskCategory") {
            await getCategoryWithSubcategory(value);
        }
        if(name === 'numOfTask'){
            updatedTask[index][name] = value.target.value;
        }else {
            updatedTask[index][name] = value;
        }
        setTaskRequire([...updatedTask])
    };

    const blogHandleChangeEditor = (evt) => {
        setJobPostDetail({...jobPostDetail, [evt.editor.name]: evt.editor.getData()})
    };

    const showModal = () => {
        getAllCategorysList()
        setIsModalVisible(true);
    };

    const resetForm = () => {
        setJobPostDetail({});
        setValidation({})
        setTaskRequire([initial])
        // setValidation({});
    };

    const validation = (name, value) => {
        switch (name) {
            case 'jobTitle':
                if (!value) {
                    return "'Please input jobTitle!'"
                } else {
                    return '';
                }
            case 'jobRole':
                if (!value) {
                    return "'Please input jobRole!'"
                } else {
                    return '';
                }
            case 'city':
                if (!value) {
                    return "'Please input city!'"
                } else {
                    return '';
                }
            case 'country':
                if (!value) {
                    return "'Please input country!'"
                } else {
                    return '';
                }
            case 'comapny':
                if (!value) {
                    return "'Please input comapny!'"
                } else {
                    return '';
                }
            case 'jobDescription':
                if (!value) {
                    return "'Please input jobDescription!'"
                } else {
                    return '';
                }
            case 'jobApplicationURL':
                if (!value) {
                    return "'Please input jobApplicationURL!'"
                } else {
                    return '';
                }
            case 'CompanyRecruitercontactemail':
                if (!value) {
                    return "'Please input CompanyRecruitercontactemail!'"
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
            jobTitle: jobPostDetail.jobTitle,
            city: jobPostDetail.city,
            country: jobPostDetail.country,
            jobDescription: jobPostDetail.jobDescription,
            jobApplicationURL: jobPostDetail.jobApplicationURL,
            jobRole: jobPostDetail.jobRole,
            remote:jobPostDetail.remote,
            CompanyRecruitercontactemail:jobPostDetail?.CompanyRecruitercontactemail||''
        };
        Object.keys(jobPostDetail).forEach(key => {
            const error = validation(key, userData[key])
            if (error && error.length) {
                allErrors[key] = error
            }
        });
        if (Object.keys(allErrors).length) {
            return setValidation(allErrors)
        } else {
            jobPostDetail.taskRequire = taskRequire;
            if(jobPostDetail._id){
                const res = await updateJobPost(jobPostDetail);
                if (res?.success) {
                    console.log("success------>>>");
                } else {
                    console.log("error------>>>");
                }
            }else {
                const res = await createJobPost(jobPostDetail);
                if (res?.data?.success) {
                    console.log("success------>>>");
                } else {
                    console.log("error------>>>");
                }
            }
            await getJobPost();
            setIsModalVisible(false);
            resetForm()
        }
    };

    const handleCancel = () => {
        resetForm()
        setIsModalVisible(false);
    };

    const onAdd = () => {
        const task = taskRequire[taskRequire.length - 1];
        if (task.numOfTask && task.taskCategory && task.taskSubCategory) {
            taskRequire[taskRequire.length] = initial
            setTaskRequire([...taskRequire])
        }
    };

    const onEdit = async (item) => {
        getAllCategorysList()
        const userData = {
            jobTitle: item.jobTitle,
            city: item.city,
            country: item.country,
            jobDescription: item.jobDescription,
            jobApplicationURL: item.jobApplicationURL,
            jobRole: item.jobRole,
            remote:item.remote,
            company:item.company,
            CompanyRecruitercontactemail:item?.CompanyRecruitercontactemail||'',
            _id:item._id
        };
        setIsEditable(true);
        setIsModalVisible(true);
        setJobPostDetail(userData);
        const task = [];
        item?.taskRequire.forEach(eachItem => {
            const data = {
                taskCategory : eachItem?.taskCategory?._id,
                taskSubCategory: eachItem?.taskSubCategory?._id,
                numOfTask: eachItem?.numOfTask,
                _id:eachItem?._id
            };
            getCategoryWithSubcategory(eachItem?.taskSubCategory?._id)
            task.push(data)
        });
        setTaskRequire(task || [])
    };

    const onPromote = () => {
        setIsModel(true)
    };

    const Columns = [
        {
            title: 'Task Category', dataIndex: '',
            render: (record, i) => {
                return (
                    <div>{record?.taskCategory?.name}</div>
                )
            }
        },
        {
            title: 'Task Sub Category', dataIndex: '',
            render: (record, i) => {
                return (
                    <div>{record?.taskSubCategory?.name}</div>
                )
            }
        },
        {title: 'Number Of Task', dataIndex: 'numOfTask'}
    ];

    const activeJobPost = async (record) => {
        if (window.confirm("Are you want to active this Job Post ?")){
            const res = await activeJobPosts(record._id);
            if (res && res.success){
                await getJobPost();
                toastSuccess("Successfully Active JobPost");
            } else {
                toastError("Something went wrong");
            }
        }
    };

    const deActiveJobPost = async (record) => {
        if (window.confirm("Are you want to delete this Job Post ?")){
            const res = await deleteJobPosts(record._id);
            if (res && res.success){
                await getJobPost();
                toastSuccess("Successfully disActive JobPost");
            } else {
                toastError("Something went wrong");
            }
        }
    };


    return (
        <>
            <div className="row taskEngagement mt-2">
                <Button type="primary" onClick={showModal} className="ml-auto mr-5 mb-3">Job Post</Button>
            </div>
            {
                jobPost && jobPost.map(item => (
                    <Card
                        title={item?.jobTitle}
                        extra={<div>
                            <EditOutlined key="edit" style={{marginRight: "40px"}} onClick={()=>onEdit(item)}/>
                            <button disabled={item.isActive} className="btn btn-success add-task-btn mr-5" onClick={() => activeJobPost(item)}>
                                Active
                            </button>
                            <button disabled={!item.isActive} className="btn btn-danger add-task-btn mr-5" onClick={() => deActiveJobPost(item)}>
                                DeActive
                            </button>
                        </div>}
                        style={{marginTop: "15px", marginBottom: "15px"}}>
                        <div className="d-flex">
                            <p><b>Job Role:</b> <span>{item?.jobRole}</span></p>
                        </div>
                        <div className="d-flex">
                            <p><b>Company:</b>  <span>{item?.company}</span></p>
                        </div>
                        <div className="d-flex">
                            <p><b>Application URL:</b> <span>{item?.jobApplicationURL}</span></p>
                        </div>
                        <div className="d-flex">
                            <p><b>Job Description:</b> <span dangerouslySetInnerHTML={{__html: item?.jobDescription || "-"}}/></p>
                        </div>
                        <div className="d-flex" style={{flexDirection : "column", alignItems : "flex-start"}}>
                            <label>Remote My Application</label>
                            <label>Criteria</label>
                            <Card className="w-100">
                                <Table
                                    columns={Columns}
                                    dataSource={item?.taskRequire}
                                    pagination={false}
                                    showHeader={true}/>
                            </Card>
                        </div>
                        <div className="d-flex" style={{justifyContent : "center", marginTop: "30px"}}>
                            <Button onClick={onPromote}>Promote To Company</Button>
                        </div>
                    </Card>
                ))
            }
            <Modal title={`${isEditable ? 'edit job post' : "add job post"}`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                   maskClosable={false}>

                <p className="font-weight-bold">Job Title</p>
                <Input name="jobTitle" value={jobPostDetail?.jobTitle} onChange={handleChange}/>
                <p className="text-danger">{jobPostErrors.jobTitle || ""}</p>

                <p className="mt-3 font-weight-bold">Job Role</p>
                <Select defaultValue="Select JobRole" value={jobPostDetail?.jobRole}
                        onChange={value => handleChange({target: {name: "jobRole", value}})}>
                    {Object.keys(JobRole).map(items => (
                        <Select.Option key={items}
                                       value={JobRole[items]}>{items}</Select.Option>
                    ))}
                </Select>
                <p className="text-danger">{jobPostErrors.jobRole || ""}</p>

                <p className="font-weight-bold">Company Recruiter contact email</p>
                <Input name="CompanyRecruitercontactemail" value={jobPostDetail?.CompanyRecruitercontactemail} onChange={handleChange}/>
                <p className="text-danger">{jobPostErrors.CompanyRecruitercontactemail || ""}</p>


                <p className="mt-3 font-weight-bold">Location</p>

                <p className="mt-3 font-weight-bold">City</p>
                <Input name="city" value={jobPostDetail?.city} onChange={handleChange}/>
                <p className="text-danger">{jobPostErrors.city || ""}</p>
                <p className="mt-3 font-weight-bold">Country</p>
                <Input name="country" value={jobPostDetail?.country} onChange={handleChange}/>
                <p className="mt-3 font-weight-bold">Company</p>
                <Input name="company" value={jobPostDetail?.company} onChange={handleChange}/>
                <p className="text-danger">{jobPostErrors.country || ""}</p>

                <div className="d-flex remote">
                    <Input name="remote" type="checkBox" onChange={handleChange}/>
                    <p className="mt-3 font-weight-bold ml-4">Remote</p>
                </div>

                <p className="mt-3 font-weight-bold">Job Description</p>
                <CKEditor name="jobDescription" data={jobPostDetail?.jobDescription} onChange={blogHandleChangeEditor}/>
                <p className="text-danger">{jobPostErrors.jobDescription || ""}</p>

                <p className="mt-3 font-weight-bold">Job Application URL</p>
                <Input name="jobApplicationURL" value={jobPostDetail?.jobApplicationURL} onChange={handleChange}/>
                <p className="text-danger">{jobPostErrors.jobApplicationURL || ""}</p>

                <p className="mt-3 font-weight-bold">Task Required:</p>

                {
                    taskRequire && taskRequire.map((item, index) => (
                        <>

                                <p className="mt-3 font-weight-bold">Task Category</p>
                                <Select name="taskCategory" value={(item && item.taskCategory) || ''} placeholder="Select"
                                        onChange={(value) =>handleChangeTask({target: {name: "taskCategory", value, index}})}
                                >
                                    <Select.Option value="">Select</Select.Option>
                                    {predefinedTaskList && predefinedTaskList.map((eachItem, i) =>(
                                        <Select.Option value={eachItem._id} key={i}>{eachItem.name}</Select.Option>
                                    ))}
                                </Select>

                                <p className="mt-3 font-weight-bold">Task Sub Category</p>
                                <Select name="taskSubCategory" placeholder="Select"
                                        onChange={(value) =>handleChangeTask({target: {name: "taskSubCategory", value, index}})}>
                                    <Select.Option value="">Select</Select.Option>
                                    {subcategory && subcategory.map((eachItem, i) =>(
                                        <Select.Option value={eachItem._id} key={i}>{eachItem.name}</Select.Option>
                                    ))}
                                </Select>

                            <p className="mt-3 font-weight-bold">Number Of Task With Acceptable Rating</p>
                            <Input name="numOfTask" value={item.numOfTask}
                                   onChange={(value) =>handleChangeTask({target: {name: "numOfTask", value, index}})}/>
                        </>
                    ))
                }
                <div style={{marginTop:'10px'}}>
                    <Button style={{height:'fit-content',alignItems:'center',justifyContent:'center',gap:'10px',padding:'0 10px'}} className="d-flex" onClick={() => onAdd()}><span style={{fontSize:'30px'}}>+</span> Add Another Task Category</Button>
                </div>
            </Modal>
            <Modal show={isModel} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Promote to Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Your application will be promoted to the company</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleOk}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default JobPosting;
