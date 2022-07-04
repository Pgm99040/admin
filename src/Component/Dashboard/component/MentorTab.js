import React, {useEffect, useState} from "react";
import {Input, Modal, Table} from 'antd';
import {
    predefinedTaskList,
    addPredefinedTaskInMentor,
    deleteApprovedTask,
    getMentorSearchByEmail,
    getAllTaskEngagementCompleted, createFeed, updateMentor, predefinedAllTaskList, getAllMentorBio, getAllActiveMentors
} from "../../../utils/_data";
import {toastError, toastSuccess} from "../../../utils/common";
import MyTask from "./MyTask";
import Loader from "../../Common/Loader";
import AddTaskModal from "./AddTaskModal";
const { Search } = Input;

const MentorTab = () => {
    const [mentorActive, setMentorActive] = useState([]);
    const [mentorsActive, setMentorsActive] = useState([]);
    const [mentorBio, setMentorBios] = useState([])
    const [activeTaskList, setActiveTaskList] = useState([]);
    const [expandedRowKey, setExpandedRowKey] = useState([]);
    const [selectTask, setSelectTask] = useState([]);
    const [selectRowRecord, setSelectRowRecord] = useState({});
    const [searchEmail, setSearchEmail] = useState("");
    const [showModal, setModal] = useState(false);
    const [bioModel, setBioModel] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const [modalText, setModalText] = React.useState('Are You Sure to Remove Approved Task');
    const [listId, setListId] = useState("");
    const [recordList, setRecordList] = useState({});
    const [taskAssignLength, setLength] = useState(null);
    const [listTaskStatus, setTaskStatus] = useState([]);
    const [AllMentorBio, setMentorBio] = useState([])
    const [predefinedTaskRecords, setPredefinedTaskRecords] = useState([]);
    const [mentorBioDetail, setMentorBoiDetail] = useState({
        mentorBio : '',
        currentPosition : '',
        imageUrl : ''
    });
    const [bioErrors, setValidation] = useState({});
    const [currentRecord, setCurrentRecord] = useState({});

    const predefinedTaskDetails = async () => {
        const response = await predefinedAllTaskList();
        if (response && response.data && response.data.success) {
            setPredefinedTaskRecords(response.data.result || []);
        } else {
            console.log(response.msg);
        }
    };

    const getMentorBio = async () => {
        setLoading(true);
        const response = await getAllMentorBio();
        if(response && response.data){
            setMentorBios(response.data.data);
            setLoading(false);
        }else{
            toastError("Something went wrong");
            setLoading(false);
        }
    };

    const getAllActiveMentorsDetails = async () =>{
        setLoading(true);
        const response = await getAllActiveMentors();
        if (response && response.success) {
            setMentorsActive(response.data);
            setLoading(false);
        } else {
            toastError("Something went wrong");
            setLoading(false);
        }
    };

    useEffect(() => {
        setMentorBio(mentorBio);
        setMentorActive(mentorsActive);
    }, [mentorsActive]);

    useEffect(()=>{
        predefinedTaskDetails()
        getMentorBio()
        getAllActiveMentorsDetails()
    },[])

    const activeTask = async (id) => {
        setLoading(true);
        const res = await predefinedTaskList(id);
        if (res && res.success) {
            setActiveTaskList(res.data);
            setLoading(false);
        } else {
            setLoading(false);
            toastError("Something went wrong");
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setMentorBoiDetail({...mentorBioDetail, [name]: value})
    };

    const getAllActiveTaskWithTaskEng = async (id) =>{
        let statusList = [];
        const res = await getAllTaskEngagementCompleted(id);
        console.log("resTask-------->", res);
        if (res && res.success){
            setLength(res && res.data.length);
            if (res && res.data.length > 0){
                res && res.data.length && res && res.data.map(item =>{
                    statusList.push(item.status);
                });
                setTaskStatus(statusList);
            }
        } else {
            console.log("error");
        }
    };

    const showDeleteModal = (id) => {
        setVisible(true);
        setListId(id);
    };

    const handleDelete = async () => {
        setVisible(false);
        const res = await deleteApprovedTask(recordList.mentorId, listId);
        if (res && res.success) {
            await activeTask(recordList.id);
            toastSuccess("Task deleted successfully");
        } else {
            toastError("Something went wrong");
        }
        console.log("res", res);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const bioHandleCancel = () => {
        setBioModel(false);
    };

    const resetForm = () => {
        setMentorBoiDetail({});
        setValidation({});
    };

    const validation = (name, value) => {
        switch (name) {
            case 'mentorBio':
                if (!value) {
                    return "'Please input mentorBio!'"
                } else {
                    return '';
                }
            case 'currentPosition':
                if (!value) {
                    return "'Please input currentPosition!'"
                } else {
                    return '';
                }
            case 'imageUrl':
                if (!value) {
                    return "'Please input imageUrl!'"
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
            mentorBio: mentorBioDetail.mentorBio,
            currentPosition: mentorBioDetail.currentPosition,
            imageUrl: mentorBioDetail.imageUrl
        };
        Object.keys(mentorBioDetail).forEach(key => {
            const error = validation(key, userData[key])
            if (error && error.length) {
                allErrors[key] = error
            }
        });
        if (Object.keys(allErrors).length) {
            return setValidation(allErrors)
        } else {
            const id = currentRecord?.mentorId;
            const res = await updateMentor(mentorBioDetail, id);
            if (res?.success) {
                console.log("success------>>>");
            } else {
                console.log("error------>>>");
            }
            await getMentorBio();
            setBioModel(false);
            resetForm()
        }
    };

    const bioHandleModel = async (record) => {
        setCurrentRecord(record)
        setBioModel(true);
    };

    const handleModal = async (record) => {
        console.log("record---->", record);
        setLoading(true);
        setSelectRowRecord(record);
        await getAllActiveTaskWithTaskEng(record.mentorId || "");
        await predefinedTaskDetails();
        setLoading(false);
        setModal(true);
    };

    const onSelectChange = (id) => {
        const index = selectTask.indexOf(id);

        if (index >= 0) {
            const array = [...selectTask];
            array.splice(index, 1);
            setSelectTask(array)
        } else {
            if(selectTask.length < 3){
                setSelectTask([...selectTask, id]);
            }
        }
    };

    const onSearchByEmail = async (email) =>{
        if (searchEmail !== "") {
            const res = await getMentorSearchByEmail(email);
            if (res && res.success) {
                setMentorActive(res.data || []);
            } else {
                toastError("Something Went Wrong")
            }
        } else {
            setMentorActive(mentorsActive);
        }

    };

    const addTask = async () => {
        const res = await addPredefinedTaskInMentor(selectRowRecord.mentorId, selectTask);
        if (res && res.success) {
            setModal(false);
            setSelectTask([]);
            await activeTask(recordList.id);
            toastSuccess("Successfully added task");
        } else {
            toastError("Something went wrong");
            setModal(false);
        }
    };

    const expandedRowRender = () => {
        return (
            <div style={{position: "relative"}}>
                {loading ? <div style={{position: "absolute"}}> <Loader/></div> : <MyTask activeTaskList={activeTaskList} showDeleteModal={showDeleteModal}/>}
            </div>);
    };

    const columns = [
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'Email', dataIndex: 'email', key: 'email'},
        {title: 'Mentor Bio', dataIndex: 'mentorBio', key: 'mentorBio'},
        {title: 'Current Position', dataIndex: 'currentPosition', key: 'currentPosition'},
        {title: 'imageUrl', dataIndex: 'imageUrl', key: 'imageUrl'},
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record, index) => {
                return (
                    <>
                        <button className="btn btn-primary add-task-btn" onClick={() => handleModal(record, index)}>Add Approved Tasks for Mentor</button>{' '}
                        <button className="btn btn-primary add-task-btn" onClick={() => bioHandleModel(record, index)}>Add Mentor Bio</button>
                    </>
                )
            },
        },
    ];
    const data = [];
    mentorActive && mentorActive.length && mentorActive.forEach((item, i) => {
        const mentor = AllMentorBio?.find(each => each._id === item.mentor);
            data.push({
                mentorBio : mentor?.mentorBio || '',
                currentPosition : mentor?.currentPosition || '',
                imageUrl : mentor?.imageUrl || '',
                key: i + 1,
                name: `${item.firstName} ${item.lastName}`,
                email: item.email,
                id: item._id,
                mentorId: item.mentor
            })
    });
    const fetchData = async (expanded, record) => {
        setRecordList(record);
        let keys = [];
        if (expanded) {
            await activeTask(record.id);
            keys.push(record.key);
        }
        setExpandedRowKey(keys);
    };
    if (loading) return <Loader/>;
    return (
        <div className="mentor-tab">
            <Modal title="Add Mentor Bio" visible={bioModel} onOk={handleOk} onCancel={bioHandleCancel}
                   maskClosable={false}>
                <p className="font-weight-bold">Mentor Bio</p>
                <Input name="mentorBio" value={mentorBioDetail?.mentorBio} onChange={handleChange}/>
                <p className="text-danger">{bioErrors.mentorBio || ""}</p>
                <p className="mt-3 font-weight-bold">Current Position</p>
                <Input name="currentPosition" value={mentorBioDetail?.currentPosition} onChange={handleChange}/>
                <p className="text-danger">{bioErrors.currentPosition || ""}</p>
                <p className="font-weight-bold">Image URL</p>
                <Input name="imageUrl" value={mentorBioDetail?.imageUrl} onChange={handleChange}/>
                <p className="text-danger">{bioErrors.imageUrl || ""}</p>
            </Modal>
           {/*{listTaskStatus.every((item) => item === "completed") &&*/}
           <AddTaskModal setModal={setModal}
                          showModal={showModal}
                          predefinedTaskRecords={predefinedTaskRecords}
                          onSelectChange={onSelectChange}
                          addTask={addTask}
                          selectTask={selectTask}/>
                          {/*}*/}
            <div className="row mentors-list mt-2">
                <div className="col-sm-12 col-md-12">
                    <div className="col-md-3 float-right pr-0 mb-3">
                        <Search name="emailSearch"
                                value={searchEmail}
                                onChange={(e) =>setSearchEmail(e.target.value)}
                                onSearch={onSearchByEmail}
                                placeholder="Email search here..."
                                enterButton
                        />
                    </div>
                    <Table
                        columns={columns}
                        expandable={{
                            expandedRowRender,
                            onExpand: fetchData,
                            expandedRowKeys: expandedRowKey
                        }}
                        dataSource={data}
                        pagination={{pageSize: 25}}
                    />
                </div>
            </div>
            <Modal
                title="Remove the Approved Task"
                visible={visible}
                onOk={handleDelete}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </div>
    )
};
export default MentorTab;
