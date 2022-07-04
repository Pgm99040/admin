import React, {useEffect, useState} from 'react';
import {Table, Popconfirm, Badge, Menu, Dropdown, Tooltip} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import moment from "moment-timezone";
import {
    getBatches,
    addBatches,
    createSessions,
    createIterator,
    updateIterator,
    getIteratorByBatch,
    removeIterator, removeBatch,
    activeSession,
    deleteSession,
    getAllCategoryList, getCategoryIdBySubcategory, updateSessions, updateBatches, getSessions, getInstructors
} from "../../../utils/_data";
import {toastError, toastSuccess} from "../../../utils/common";
import {Modal, Button} from 'antd';
import {Select} from 'antd';
import {DatePicker, Space, Input, InputNumber} from 'antd';
import {TimePicker} from 'antd';
import Loader from "../../Common/Loader";

const {Option} = Select;
const {TextArea} = Input;

const languages = [
    {value: "Hindi", label: "Hindi"},
    {value: "Gujarati", label: "Gujarati"},
    {value: "Telugu", label: "Telugu"},
    {value: "Tamil", label: "Tamil"},
    {value: "Bahasa", label: "Bahasa"},
    {value: "Spanish", label: "Spanish"},
    {value: "Chinese", label: "Chinese"},
];
const country = [
    {value: "India", label: "India"},
    {value: "Singapore", label: "Singapore"},
    {value: "USA", label: "USA"}
];
const timezone = [
    {value: "IST", label: "IST"},
    {value: "SGT", label: "SGT"},
    {value: "PST", label: "PST"},
    {value: "PDT", label: "PDT"},
    {value: "EST", label: "EST"},
    {value: "CST", label: "CST"}
];

const Sessions = (props) => {
    const [batches, setBatches] = useState([]);
    const [sessions, setSessions] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [isModalVisible3, setIsModalVisible3] = useState(false);
    const [isIteratorModalVisisble, setIteratorModalVisisble] = useState(false);
    const [sessionId, setSessionId] = useState("");
    const [batchId, setBatchId] = useState("");
    const [name, setName] = useState("");
    const [instructorId, setInstructorId] = useState([]);
    const [selected, setSelected] = useState([]);
    const [date, setDate] = useState("");
    const [sessionDetails, setSessionDetails] = useState({})
    const [duration, setDuration] = useState("");
    const [meetLink, setMeetLink] = useState("");
    const [batchInterval, setBatchInterval] = useState("");
    const [batchDescription, setbatchDescription] = useState("")
    const [batchUrlName, setBatchUrlName] = useState("")
    const [seats, setSeats] = useState("");
    const [noOfSeats, setNoOfSeats] = useState(null);
    const [editIterator, setEditIterator] = useState({});
    const [iterationErrors, setIterationErrors] = useState({});
    const [iterateData, setIterateData] = useState([]);
    const [iteratorObj, setIterator] = useState("");
    const [sessionErrors, setSessionErrors] = useState({});
    const [batchErrors, setBatchErrors] = useState({});
    const [sessionTitle, setSessionTitle] = useState("");
    const [thumbnailImage, setThumbnailImage] = useState("");
    const [instructorName, setInstructorName] = useState("");
    const [price, setPrice] = useState("")
    const [currencyCode, setCurrencyCode] = useState("");
    const [language, setLanguage] = useState("");
    const [sessionLocation, setLocation] = useState("");
    const [timeZone, setTimeZone] = useState("");
    const [description, setdescription] = useState("");
    const [expandedSessionRowKey, setSessionKey] = useState([]);
    const [expandedIteratorRowKey, setIteratorKey] = useState([]);
    const [sessionRecord, setSessionRecord] = useState({});
    const [batchRecord, setBatchRecord] = useState({});
    const [edit, setEdit] = useState(false);
    const [changeDate, setChangeDate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [predefinedTaskList, setPredefinedTaskList] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [instructors, setInstructors] = useState([])


    const timezoneList = moment.tz.names();
    console.log("sessionList", timezoneList)

    const getAllCategorysList = async () => {
        const response = await getAllCategoryList();
        if (response && response.data && response.data.success) {
            setPredefinedTaskList(response.data.result || []);
        } else {
            console.log(response.msg);
        }
    };

    const getCategoryWithSubcategory = async (id) => {
        const response = await getCategoryIdBySubcategory(id);
        if (response && response.data && response.data.success) {
            setSubcategory((response && response.data && response.data.result) || [])
        } else {
            console.log(response.msg);
        }
    };

    const getSession = async () => {
        setLoading(true)
        const response = await getSessions();
        console.log("response", response)
        if(response && response.data){
            setLoading(false)
            setSessions(response.data)
            // setLoading(false);
        }else{
            toastError("Something went wrong");
            setLoading(false)
            // setLoading(false);
        }
    }

    const getInstructor = async () => {
        // setLoading(true)
        const response = await getInstructors();
        console.log("response", response)
        if(response){
            console.log("response", response)

            setInstructors(response.data.data.instructor)
            // setLoading(false);
        }else{
            toastError("Something went wrong");
            // setLoading(false);
        }
    }

    useEffect(()=>{
        getSession()
        getInstructor()
    },[])

    function onChangeDuration(time, timeString) {
        const timeInterval = timeString[0] + "-" + timeString[1];
        console.log("timeInterval", timeInterval);
        setDuration(time);
        setBatchInterval(timeInterval);
        console.log(time, "---------------", timeString);
    }

    function onChange1(date, dateString) {
        console.log("date-----------------", date)
        setChangeDate(true);
        setDate(new Date(date).toString());
    }

    function onChange(selectedInstructors) {
        // var instructorId = [];
        // selectedInstructors.map((value)=>{
        // const instructor = instructors && instructors.length && instructors.filter((instructor)=>instructor.name==value);
        //     const instructorIds = instructor[0]._id;
        //     instructorId.push(instructorIds);
        // setName(selectedInstructors);

        // })
        console.log(instructorId)
        setInstructorId(selectedInstructors)
    }

    const getAllIteratorByBatch = async (id) => {
        setLoading(true);
        const res = await getIteratorByBatch(id);
        if (res?.data?.msg === "success") {
            setIterateData(res.data.response);
        }
        setLoading(false);
        console.log("getAllIteratorByBatch----->>", res);

    }
    const liveSessionChange = (value) => {
        let instructorId = instructors.filter((instructor) => instructor.name == value);
        console.log("fffff----->>>", instructorId);
        setInstructorName(value);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModal2 = () => {
        setIsModalVisible2(true);
    };

    const showModal3 = () => {
        getAllCategorysList();
        setIsModalVisible3(true);
    };

    const showIteratorModal = (index, record) => {
        setEditIterator(index);
        setIterator(record.id);
        setIteratorModalVisisble(true);
        if (index && index.isEdit) {
            const str = index.duration;
            const duration = str.split('(')[0].trim();
            setBatchInterval(duration);
            const timeArray = duration.split("-");
            const start = moment(timeArray[0], 'hh:mm a');
            const end = moment(timeArray[1], 'hh:mm a');
            const durations = [start, end];
            setEdit(true);
            setDate(new Date(index.date).toString());
            setMeetLink(index.meetLink);
            setDuration(durations);
        } else {
            setEdit(false)
        }
        ;
    };

    const handleOk3 = async () => {
        let error = {};
        if (sessionTitle === '') {
            error.title = "Title is required";
        }
        if (thumbnailImage === "") {
            error.thumbnailImage = "Image is required"
        }
        if (noOfSeats == null || noOfSeats === "") {
            error.noOfSeats = "Seat is required";
        }
        if (price === "") {
            error.price = "Price is required";
        }
        if (description === "") {
            error.description = "Description is required";
        }
        if (currencyCode === "") {
            error.currencyCode = "Currency code is required";
        }
        if (sessionLocation === "") {
            error.sessionLocation = "Location is required";
        }
        if (timeZone === "") {
            error.timezone = "Timezone is required";
        }
        if (category === "") {
            error.category = "category is required";
        }
        if (subCategory === "") {
            error.subCategory = "subCategory is required";
        }

        if (Object.keys(error).length) {
            setSessionErrors(error);
            return true;
        }
        const user = localStorage.getItem("_id")
        let Obj = {
            Thumbnail_ImageURL: thumbnailImage,
            title: sessionTitle,
            // instructorName,
            LanguageOfInstruction: language === "" ? "English" : "English and " + language,
            price: price,
            currencyCode: currencyCode,
            seats: noOfSeats,
            description,
            sessionLocation,
            timeZone,
            user: user,
            batchIsFull: false,
            category: category,
            subCategory: subCategory
        };
        if (sessionId !== "") {
            Obj._id = sessionId;
            const res = await updateSessions(Obj);
            if (res?.data?.success) {
                console.log("success------>>>");
            } else {
                console.log("error------>>>");
            }
        } else {
            const res = await createSessions(Obj);
            if (res?.data?.success) {
                console.log("success------>>>");
            } else {
                console.log("error------>>>");
            }
        }
        await getSession();
        setCategory("");
        setSubCategory("");
        setSeats("");
        setThumbnailImage("");
        setSessionTitle("");
        setInstructorName("");
        setPrice("");
        setdescription("");
        setbatchDescription("");
        setBatchUrlName("");
        setLanguage("");
        setCurrencyCode("");
        setLocation("");
        setTimeZone("");
        setSessionErrors({});
        setIsModalVisible3(false);
    };

    const handleOkIterator = async () => {
        // const zone = moment.tz.guess();
        let error = {};
        if (date === '') {
            error.date = "Date is required";
        }
        if (duration === "") {
            error.duration = "Duration is required";
        }
        // if (meetLink === "") {
        //     error.meetLink = "Link is required";
        // }
        if (Object.keys(error).length) {
            setIterationErrors(error);
            return
        }
        // let editDate = new Date(moment(date)).toUTCString();
        // let strDate = new Date(date).toString();
        // console.log("new Date(editDate).toUTCString()",editDate, moment(editDate).toUTCString());
        let record = {
            sessionId: sessionRecord.id,
            batchId: iteratorObj,
            duration: batchInterval,
            location: sessionRecord.sessionLocation || "-",
            meetLink,
            date,
            timeZone: sessionRecord.timeZone || "-"
        };

        if (edit) {
            console.log("zack:", editIterator)
            const res = await updateIterator(record, editIterator.id);
            if (res?.data?.msg === "success") {
                toastSuccess("iterator Successfully Updated");
                if (batchRecord && Object.keys(batchRecord).length > 0) {
                    await getAllIteratorByBatch(batchRecord.id)
                }
            } else {
                toastError("Something went wrong");
            }
        } else {
            const res = await createIterator(record);
            if (res?.data?.msg === "success") {
                toastSuccess("Successfully iterator added");
                if (batchRecord && Object.keys(batchRecord).length > 0) {
                    await getAllIteratorByBatch(batchRecord.id)
                }
            } else {
                toastError("Something went wrong");
            }
        }
        setDate("");
        setDuration("");
        setMeetLink("");
        setIteratorModalVisisble(false);
        setChangeDate(false);
        cancelIterator()
    };

    const cancelIterator = () => {
        setIterationErrors({})
        setDate("");
        setDuration("");
        setMeetLink("");
        setIteratorModalVisisble(false);
    };
    const handleCancel3 = () => {
        setCategory("");
        setSubCategory("");
        setSeats("");
        setThumbnailImage("");
        setSessionTitle("");
        setInstructorName("");
        setPrice("");
        setdescription("");
        setbatchDescription("");
        setBatchUrlName("");
        setLanguage("");
        setCurrencyCode("");
        setTimeZone("");
        setLocation("");
        setSessionErrors({});
        setIsModalVisible3(false);
    };

    const handleOk2 = async () => {
        let error = {};
        if (instructorId.length == 0) {
            error.instructorId = "Please Select Instructor";
        }
        // if (seats == "") {
        //     error.seats = "Seat is required";
        // }
        if (batchDescription === "") {
            error.batchDescription = "Description is required";
        }
        if (batchUrlName === "") {
            error.batchUrlName = "BatchURLName is required";
        }
        if (Object.keys(error).length) {
            setBatchErrors(error);
            return true;
        }
        setSelected(null)
        var obj = []
        const instructorData =
            {
                capacityOfSeats: sessionDetails.seats || 0,
                instructorId: instructorId,
                batchDescription: batchDescription,
                batchUrlName: batchUrlName.replaceAll(' ', '+')
            };
        obj.push(instructorData);
        if (batchId !== "") {
            obj[0]._id = batchId;
            const res = await updateBatches(obj[0]);
            if (res?.success) {
                await showBatch(sessionRecord.id);
            } else {
                console.log("error------>>>");
            }
        } else {
            const res = await addBatches(sessionDetails.id, obj);
            if (res && res.data && res.data.data && res.data.msg) {
                if (sessionRecord && Object.keys(sessionRecord).length > 0) {
                    await showBatch(sessionRecord.id);
                }
            } else {
                console.log("error----------->>>>", res);
            }
        }

        setName("");
        setDate("");
        setDuration("");
        setSeats("");
        setbatchDescription("");
        setBatchUrlName("");
        setInstructorId([]);
        setIsModalVisible2(false);
    };

    const handleCancel2 = () => {
        setName("");
        setDate("");
        setDuration("");
        setIsModalVisible2(false);
        setSelected([])
        setInstructorId([]);
        setBatchErrors({})
    };
    const showBatch = async (i) => {
        console.log("i", i);
        const res = await getBatches(i);
        if (res && res.data) {
            setBatches(res.data.data || []);
            console.log("res.data---------------------------------------", res.data)
        } else {
            toastError("Something went wrong");
        }
    };

    const activeTask = async (record) => {
        if (window.confirm("Are you want to active this session ?")) {
            const res = await activeSession(record.id);
            if (res && res.success) {
                getSession();
                toastSuccess("Successfully Active session");
            } else {
                toastError("Something went wrong");
            }
        }
    };

    const deActiveTask = async (record) => {
        if (window.confirm("Are you want to delete this session ?")) {
            const res = await deleteSession(record.id);
            if (res && res.success) {
                getSession();
                toastSuccess("Successfully disActive session");
            } else {
                toastError("Something went wrong");
            }
        }
    };

    const editBatch = (record) => {
        setBatchId(record.id);
        setInstructorId(record.instructorId);
        setbatchDescription(record.description);
        setBatchUrlName(record.batchUrlName);
        setIsModalVisible2(true);
    };

    const editSession = (record) => {
        getAllCategorysList()
        setCategory(record.category)
        setSubCategory(record.subCategory)
        setSessionId(record.id);
        setSessionTitle(record.title);
        setThumbnailImage(record.Thumbnail_ImageURL);
        setNoOfSeats(record.seats);
        setPrice(record.price);
        setCurrencyCode(record.currencyCode);
        setLanguage(record.LanguageOfInstruction);
        setdescription(record.description);
        setLocation(record.sessionLocation);
        setTimeZone(record.timeZone);
        setIsModalVisible3(true);
    };

    const addBatch = async (i) => {
        console.log("id------>>>", i);
        setSessionDetails(i);
        showModal2()
    };
    const columns = [
        {title: 'Title', dataIndex: 'title', key: 'title', width: 250},
        {title: 'Description', dataIndex: 'description', key: 'description', ellipsis: {showTitle: false}},
        {title: 'Price', dataIndex: 'price', key: 'price', width: 150},
        {title: 'category', dataIndex: 'category', key: 'category', width: 200},
        {title: 'subCategory', dataIndex: 'subCategory', key: 'subCategory', width: 250},
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record, i) => {
                return (
                    <>
                        <button className="btn btn-primary add-task-btn mr-5" onClick={() => editSession(record)}>
                            Edit Session
                        </button>
                        <button className="btn btn-primary add-task-btn mr-5" onClick={() => addBatch(record)}>Add
                            Batch
                        </button>
                        <button disabled={record.isActive} className="btn btn-success add-task-btn mr-5"
                                onClick={() => activeTask(record)}>
                            Active
                        </button>
                        <button disabled={!record.isActive} className="btn btn-danger add-task-btn mr-5"
                                onClick={() => deActiveTask(record)}>
                            DeActive
                        </button>

                    </>
                )
            },
        },
    ];
    const data = [];
    sessions && sessions.data && sessions.data.forEach((item, i) => {
        data.push({
            key: i + 1,
            id: item._id,
            title: item && item.title,
            description: item && item.description,
            // instructorName: item && item.instructorName,
            price: item.price,
            sessionLocation: item.sessionLocation,
            seats: item.seats,
            timeZone: item.timeZone,
            isActive: item.isActive,
            category: item?.category?.name || "",
            subCategory: item?.subCategory?.name || "",
            Thumbnail_ImageURL: item?.Thumbnail_ImageURL || "",
            currencyCode: item?.currencyCode || "",
            LanguageOfInstruction: item?.LanguageOfInstruction
        })
    });

    const deleteIterator = async (index, record) => {
        console.log("index", batchRecord.id)
        const res = await removeIterator(record.id);
        console.log("res----------------------->>>", res);
        if (res?.data?.msg === "success") {
            toastSuccess("Successfully record deleted");
            getAllIteratorByBatch(batchRecord.id)
        } else {
            toastError("Something went wrong")
        }
    };
    const handleIterateEdit = () => {

    };
    const expandedBatchRender = (data) => {
        const IteratorColumns = [
            {title: 'Date', dataIndex: 'date', key: 'date'},
            {title: 'Time', dataIndex: 'duration', key: 'duration'},
            {
                title: 'Action',
                dataIndex: '',
                key: '',
                render: (index, record) => (
                    <>
                        <Popconfirm placement="top" title="Are you sure delete this record ?"
                                    onConfirm={() => deleteIterator(index, record)} okText="Yes" cancelText="No">
                            <button className="btn btn-primary add-task-btn" data-toggle="modal"
                                    data-target="#exampleModal">Delete
                            </button>
                        </Popconfirm> &nbsp;&nbsp;
                        <button className="btn btn-primary add-task-btn"
                                onClick={() => showIteratorModal(index, data)}>Edit
                        </button>
                    </>
                ),
            },
        ];
        const iteratorData = [];
        iterateData && iterateData.length && iterateData.map((item, i) => {
            iteratorData.push({
                key: i + 1,
                id: item._id || "-",
                date: item && moment(item.date).format("MMM DD, yyyy"),
                duration: `${item.duration || "-"} (${item.timeZone || "-"})`,
                meetLink: item.meetLink,
                isEdit: true
            })
        });
        if (loading) return <Loader/>;
        return <div className="col-sm-12 col-md-12">
            <Table
                columns={IteratorColumns}
                dataSource={iteratorData}
                pagination={iteratorData.length > 10 ? true : false}
                showHeader={true}/>
        </div>;

    };

    const deleteBatch = async (index, record) => {
        console.log("index, record", index, record);
        const res = await removeBatch(sessionRecord.id, record.id);
        console.log("deleteBatch----------->>>", res);
        if (res?.data?.success) {
            toastSuccess("Successfully record deleted");
            await showBatch(sessionRecord.id);
        } else {
            toastError("Something went wrong");
        }
    };

    const expandedRowRender = () => {
        const batchColumns = [
            // { title: 'Date', dataIndex: 'date', key: 'date' },
            // {
            //     title: 'Batch',
            //     key: 'batch',
            //     dataIndex: 'batch',
            //     render: (item, record, index) =>{
            //         return <h6>{`Batch ${index + 1}`}</h6>
            //     }
            // },
            {title: 'Batch Name', dataIndex: 'description', key: 'description'},
            {title: 'Batch Instructor', dataIndex: 'name', key: 'name'},
            // {
            //     title: 'Seat',
            //     key: 'seat',
            //     dataIndex: 'seat'
            // },
            {title: 'Batch Instructor Bio', dataIndex: 'bio', key: 'bio', width: "500px"},
            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                render: (index, record) => (
                    <>
                        <button className="btn btn-primary add-task-btn mr-5" onClick={() => editBatch(record)}>
                            Edit Batch
                        </button>
                        <button className="btn btn-primary add-task-btn" data-toggle="modal"
                                onClick={() => showIteratorModal(index, record)}
                                data-target="#exampleModal">Add Iterator
                        </button>
                        &nbsp; &nbsp;
                        <Popconfirm placement="top" title="Are you sure delete this batch ?"
                                    onConfirm={() => deleteBatch(index, record)} okText="Yes" cancelText="No">
                            <button className="btn btn-primary add-task-btn" data-toggle="modal"
                                    data-target="#exampleModal">Delete Batch
                            </button>
                        </Popconfirm>

                    </>
                ),
            },
        ];

        const batchData = [];
        batches && batches.length && batches.forEach((item, i) => {
            batchData.push({
                key: i + 1,
                id: item._id,
                bio: item.bio || "-",
                name: item.name || "-",
                seat: item.capacityOfSeats || 0,
                instructorId: item.instructorId || "-",
                description: item.batchDescription || "-",
                batchUrlName: item.batchUrlName || "-"
            })
        });
        return <div className="col-sm-12 col-md-12">
            <Table
                columns={batchColumns}
                dataSource={batchData}
                expandable={{
                    expandedRowRender: data => expandedBatchRender(data),
                    onExpand: iteratorFetchData,
                    expandedRowKeys: expandedIteratorRowKey
                }}
                pagination={batchData.length > 10 ? true : false}
                showHeader={true}/>
        </div>;
    };

    const iteratorFetchData = async (expanded, record) => {
        setBatchRecord(record);
        console.log("iteratorFetchData", record)
        let keys = [];
        if (expanded) {
            await getAllIteratorByBatch(record.id);
            keys.push(record.key);
        }
        setIteratorKey(keys)
    };

    const batchFetchData = async (expanded, record) => {
        setSessionRecord(record);
        console.log("record11111-------->>>>", record);
        let keys = [];
        if (expanded) {
            await showBatch(record.id);
            keys.push(record.key);
        }
        setSessionKey(keys)
    };

    const handleChangeTask = async (e) => {
        const {name, value} = e.target;
        if (name === "category") {
            setCategory(value);
            await getCategoryWithSubcategory(value);
        } else {
            setSubCategory(value)
        }
    };
    if (loading) return <Loader/>;

    return (
        <>
            <div className="row taskEngagement mt-2">
                <Button type="primary" onClick={showModal3} className="ml-auto mr-5 mb-3">Add Sessions</Button>
                <div className="col-sm-12 col-md-12">
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={data.length > 10 ? true : false}
                        expandable={{
                            expandedRowRender,
                            onExpand: batchFetchData,
                            expandedRowKeys: expandedSessionRowKey
                        }}
                    />
                </div>
            </div>

            <Modal title={`${(batchId) ? 'Edit Batch' : "Add Batch"}`} visible={isModalVisible2} onOk={handleOk2}
                   onCancel={handleCancel2}
                   maskClosable={false}>
                <p> Instrutor Name </p>
                <Select
                    showSearch
                    mode="single"
                    allowClear
                    style={{width: 200}}
                    placeholder="Select a person"
                    onChange={onChange}
                    value={instructorId || []}
                >
                    {instructors && instructors.map(val => {
                        return <Option value={val._id}>{val.name}</Option>
                    })}
                </Select>
                <p className="text-danger">{batchErrors.instructorId || ""}</p>

                <p className="mt-3">Description</p>
                <TextArea rows={4} value={batchDescription} onChange={(e) => setbatchDescription(e.target.value)}/>
                <p className="text-danger">{batchErrors.batchDescription || ""}</p>

                <p className="mt-3">Batch_URL_Name</p>
                <TextArea rows={4} value={batchUrlName} onChange={(e) => setBatchUrlName(e.target.value)}/>
                <p className="text-danger">{batchErrors.batchUrlName || ""}</p>

            </Modal>


            <Modal title={`${(sessionId) ? 'Edit Session' : "Add Session"}`} visible={isModalVisible3} onOk={handleOk3}
                   onCancel={handleCancel3}
                   maskClosable={false}>
                <p className="font-weight-bold">Title</p>
                <Input value={sessionTitle} onChange={(e) => setSessionTitle(e.target.value)}/>
                <p className="text-danger">{sessionErrors.title || ""}</p>
                {/*<p className='mt-3'> Instrutor Name </p>*/}
                {/*<Select*/}
                {/*    showSearch*/}
                {/*    value={instructorName}*/}
                {/*    style={{ width: 200 }}*/}
                {/*    placeholder="Select a instructor"*/}
                {/*    optionFilterProp="children"*/}
                {/*    onChange={liveSessionChange}*/}
                {/*    filterOption={(input, option) =>*/}
                {/*        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0*/}
                {/*    }*/}
                {/*>*/}
                {/*    {instructors && instructors.map(val => {*/}
                {/*        return <Option value={val.name}>{val.name}</Option>*/}
                {/*    })}*/}
                {/*        </Select>*/}

                {/* <div className="d-flex mt-3 set-position"> */}
                <p className="font-weight-bold">Thumbnail Image URL</p>
                <Input value={thumbnailImage} onChange={(e) => setThumbnailImage(e.target.value)}/>
                <p className="text-danger">{sessionErrors.thumbnailImage || ""}</p>
                <p className='mt-3 font-weight-bold'>Seats</p>
                <InputNumber min={1} value={noOfSeats} onChange={(e) => {
                    setNoOfSeats(e)
                }}/>
                <p className="text-danger">{sessionErrors.noOfSeats || ""}</p>
                <p className="mt-3 font-weight-bold">Category</p>
                <Select name="category" placeholder="Select" value={category || ''}
                        onChange={(value) => handleChangeTask({target: {name: "category", value}})}>
                    <Select.Option value="">Select</Select.Option>
                    {predefinedTaskList && predefinedTaskList.map((item, i) => (
                        <Select.Option value={item._id} key={i}>{item.name}</Select.Option>
                    ))}
                </Select>
                <p className="text-danger">{sessionErrors.category}</p>
                <p className="mt-3 font-weight-bold">Subcategory</p>
                <Select name="subcategory" placeholder="Select" value={subCategory || ''}
                        onChange={(value) => handleChangeTask({target: {name: "subcategory", value}})}>
                    <Select.Option value="">Select</Select.Option>
                    {subcategory && subcategory.map((item, i) => (
                        <Select.Option value={item._id} key={i}>{item.name}</Select.Option>
                    ))}
                </Select>
                <p className="text-danger">{sessionErrors.subCategory}</p>

                <p className='mt-3 font-weight-bold'>Price</p>
                <InputNumber min={1} value={price} onChange={(e) => {
                    setPrice(e)
                }}/>
                <p className="text-danger">{sessionErrors.price || ""}</p>

                <p className='mt-3 font-weight-bold'>Currency Code</p>
                <Select
                    showSearch
                    style={{width: 200}}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    value={currencyCode}
                    onChange={(value) => setCurrencyCode(value)}
                >
                    <Option value="USD">USD</Option>
                    <Option value="INR">INR</Option>
                </Select>
                <p className="text-danger">{sessionErrors.currencyCode || ""}</p>
                <p className="mt-3 font-weight-bold">Apart from English, You can add one additional Language of
                    instructionThat will be used during the live sessions</p>
                <Select
                    showSearch
                    style={{width: 200}}
                    placeholder="Select a language"
                    optionFilterProp="children"
                    value={language}
                    onChange={(value) => setLanguage(value)}
                >
                    {languages && languages.map((item, i) => (
                        <Option value={item.value} key={i}>{item.label}</Option>
                    ))}
                </Select>
                <p className="mt-3 font-weight-bold">Description</p>
                <TextArea rows={4} value={description} onChange={(e) => setdescription(e.target.value)}/>
                <p className="text-danger">{sessionErrors.description || ""}</p>
                <p className="mt-3 font-weight-bold">Session Location</p>
                <Select
                    showSearch
                    style={{width: 200}}
                    placeholder="Select a Country"
                    optionFilterProp="children"
                    value={sessionLocation === "" ? null : sessionLocation}
                    onChange={(value) => setLocation(value)}
                >
                    {country && country.length && country.map((item, i) => (
                        <Option value={item.value} key={i}>{item.label}</Option>
                    ))}
                </Select>
                <p className="text-danger">{sessionErrors.sessionLocation || ""}</p>
                <p className="mt-3 font-weight-bold">Session Location</p>
                <Select
                    showSearch
                    style={{width: 200}}
                    placeholder="Select a timezone"
                    optionFilterProp="children"
                    value={timeZone === "" ? null : timeZone}
                    onChange={(value) => setTimeZone(value)}
                >
                    {/*{ timezoneList && timezoneList.length && timezoneList.map((item, i) =>(*/}
                    {/*    <Option value={item} key={i}>{item}</Option>*/}
                    {/*))}*/}
                    {timezone && timezone.length && timezone.map((item, i) => (
                        <Option value={item.value} key={i}>{item.label}</Option>
                    ))}
                </Select>
                <p className="text-danger">{sessionErrors.timezone || ""}</p>
            </Modal>
            <Modal title={edit ? "Edit Iterator" : "Add Iterator"} visible={isIteratorModalVisisble}
                   onOk={() => handleOkIterator()}
                   onCancel={() => cancelIterator()} maskClosable={false}>
                <p className='mt-3'> Date </p>

                <Space direction="vertical">
                    <DatePicker onChange={onChange1} value={date !== "" ? moment(date) : ""} format={"YYYY-MM-DD"}/>
                </Space>
                <p className="text-danger">{iterationErrors.date || ""}</p>

                <p className='mt-3'> Batch Time </p>
                <TimePicker.RangePicker use12Hours format="hh:mm a" onChange={onChangeDuration} value={duration}/>
                <p className="text-danger">{iterationErrors.duration || ""}</p>
                <div className="row">
                    <div className="col-sm-6">
                        <span>Country : {sessionRecord.sessionLocation || ""}</span>
                    </div>
                    <div className="col-sm-6">
                        <span>Timezone : {sessionRecord.timeZone || ""}</span>
                    </div>
                </div>

                <p className='mt-3'>Zoom or Google meet link</p>
                <Input name="meetLink" onChange={(e) => setMeetLink(e.target.value)} value={meetLink}/>
                {/*<p className="text-danger">{iterationErrors.meetLink || ""}</p>*/}
            </Modal>
        </>
    )
};
export default Sessions;
