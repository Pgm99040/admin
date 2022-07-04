import React, {useEffect, useState} from 'react';
import {Button, Input, Modal, InputNumber, Table, Popconfirm, Select} from "antd";
import {TagsInput} from "react-tag-input-component";
import {
    activeSessionMicroCourse,
    createLesson,
    createMicroCourse,
    deleteSessionMicroCourse, getAllCategoryList, getAllMicroCourse, getCategoryIdBySubcategory,
    getLessons,
    updateLesson,
    updateMicroCourse
} from "../../../utils/_data";
import Loader from "../../Common/Loader";

import CKEditor from "../../Common/CKEditor";
import {toastError, toastSuccess} from "../../../utils/common";
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

const MicroCourse = (props) => {
    const [courseDetail, setCourseDetail] = useState({
        _id: '',
        name: '',
        description: '',
        courseImageUrl: '',
        // courseTagWords : '',
        courseAuthor: '',
        courseLanguage: '',
        coursePrice: ''
    });
    const [lessonDetail, setLessonDetail] = useState({
        lessonName: '',
        lessonDescription: '',
        lessonImageUrl: '',
        microLessonContent: '',
        lessonOrder: null
        // lessonTags : ''
    });
    const [loading, setLoading] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [editableLesson, setEditableLesson] = useState(false);
    const [isEditableMicroCourse, setIsEditableMicroCourse] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [lessonModel, setLessonModel] = useState(false);
    const [courseErrors, setValidation] = useState({});
    const [lessonErrors, setValidationLesson] = useState({});
    const [courseRecord, setCourseRecord] = useState({});
    const [expandedLessonRowKey, setLessonKey] = useState([]);
    const [selected, setSelected] = useState([]);
    const [lessonSelected, setLessonSelected] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [microCourse, setMicroCourse] = useState([])


    useEffect(() => {
    }, [lessonSelected]);

    const getAllCategorysList = async () =>{
        const response = await getAllCategoryList();
        if (response && response.data && response.data.success) {
            setCategoryList(response.data.result || []);
        } else {
            console.log(response.msg);
        }
    };

    const getMicroCourse = async () => {
        setLoading(true)
        const response = await getAllMicroCourse();

        if(response && response.data){
            setMicroCourse(response.data.data);
            setLoading(false)

        }else{
            toastError("Something went wrong");
            setLoading(false)

        }
    };

    useEffect(()=>{
        getMicroCourse()
    },[])

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
            case 'courseImageUrl':
                if (!value) {
                    return "'Please input courseImageUrl!'"
                } else {
                    return '';
                }
            case 'courseTagWords':
                if (parseInt(value) === 0) {
                    return "'Please input courseTagWords!'"
                } else {
                    return '';
                }
            case 'courseAuthor':
                if (!value) {
                    return "'Please input courseAuthor!'"
                } else {
                    return '';
                }
            case 'courseLanguage':
                if (!value) {
                    return "'Please input courseLanguage!'"
                } else {
                    return '';
                }
            case 'coursePrice':
                if (!value) {
                    return "'Please input coursePrice!'"
                } else {
                    return '';
                }
            default: {
                return null;
            }
        }
    };

    const lessonValidation = (name, value) => {
        switch (name) {
            case 'lessonName':
                if (!value) {
                    return "'Please input lessonName!'"
                } else {
                    return '';
                }
            case 'lessonDescription':
                if (!value) {
                    return "'Please input lessonDescription!'"
                } else {
                    return '';
                }
            case 'lessonImageUrl':
                if (!value) {
                    return "'Please input lessonImageUrl!'"
                } else {
                    return '';
                }
            case 'microLessonContent':
                if (!value) {
                    return "'Please input microLessonContent!'"
                } else {
                    return '';
                }
            case 'lessonTags':
                if (parseInt(value) === 0) {
                    return "'Please input lessonTags!'"
                } else {
                    return '';
                }
            case 'lessonOrder':
                if (!value) {
                    return "'Please input lessonOrder!'"
                } else {
                    return '';
                }
            default: {
                return null;
            }
        }
    };

    const resetForm = () => {
        setCourseDetail({});
        setValidation({});
    };

    const resetLessonForm = () => {
        setLessonDetail({});
        setValidationLesson({});
    };

    const handleOk = async () => {
        let allErrors = {};

        const userData = {
            name: courseDetail.name,
            description: courseDetail.description,
            courseImageUrl: courseDetail.courseImageUrl,
            courseTagWords: selected.length,
            courseAuthor: courseDetail.courseAuthor,
            courseLanguage: courseDetail.courseLanguage,
            coursePrice: courseDetail.coursePrice,
            category: courseDetail.category,
            subCategory: courseDetail.subCategory
        };
        if(!courseDetail._id){
            courseDetail.courseTagWords = selected.length
        }
        Object.keys(courseDetail).forEach(key => {
            const error = validation(key, userData[key])
            if (error && error.length) {
                allErrors[key] = error
            }
        });
        if (Object.keys(allErrors).length) {
            return setValidation(allErrors)
        } else {
            if(courseDetail._id){
                const res = await updateMicroCourse(courseDetail);
                if (res?.success) {
                    console.log("success------>>>");
                } else {
                    console.log("error------>>>");
                }
            }else {
                courseDetail.courseTagWords = selected.join();
                const res = await createMicroCourse(courseDetail);
                if (res?.success) {
                    console.log("success------>>>");
                } else {
                    console.log("error------>>>");
                }
            }
            await getMicroCourse();
            setIsModalVisible(false);
            setIsEditableMicroCourse(false);
            resetForm()
        }
    };

    const handleLessonOk = async () => {
        let lessonAllErrors = {};

        const lessonUserData = {
            lessonName: lessonDetail.lessonName,
            lessonDescription: lessonDetail.lessonDescription,
            lessonImageUrl: lessonDetail.lessonImageUrl,
            microLessonContent: lessonDetail.microLessonContent,
            lessonTags: lessonSelected.length,
            lessonOrder: lessonDetail.lessonOrder
        };
        lessonDetail.lessonTags = lessonSelected.length
        Object.keys(lessonDetail).forEach(key => {
            const error = lessonValidation(key, lessonUserData[key])
            if (error && error.length) {
                lessonAllErrors[key] = error
            }
        });
        if (Object.keys(lessonAllErrors).length) {
            return setValidationLesson(lessonAllErrors)
        } else {
            lessonDetail.lessonTags = lessonSelected.join();
            lessonDetail.microCourseID = courseRecord.id;
            if (lessonDetail.id) {
                const res = await updateLesson(lessonDetail);
                if (res?.success) {
                    console.log("success------>>>");
                } else {
                    console.log("error------>>>");
                }
            } else {
                const res = await createLesson(lessonDetail);
                if (res?.success) {
                    console.log("success------>>>");
                } else {
                    console.log("error------>>>");
                }
            }
            await getMicroCourse();
            setLessonModel(false);
            resetLessonForm()
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

    const handleChange = async (e, name) => {
        if (e?.target?.name === "category") {
            await getCategoryWithSubcategory(e.target.value);
            setCourseDetail({...courseDetail, [name]: e.target.value})
        }
        if(name === "courseLanguage"){
            setCourseDetail({...courseDetail, [name]: e});
        }else {
            const {name, value} = e.target;
            setCourseDetail({...courseDetail, [name]: value})
        }
    };

    const courseHandleChangeEditor = (evt) => {
        setCourseDetail({...courseDetail, [evt.editor.name]: evt.editor.getData()})
    };

    const LessonHandleChange = (e) => {
        const {name, value} = e.target;
        setLessonDetail({...lessonDetail, [name]: value})
    };

    const LessonHandleChangeEditor = (evt) => {
        setLessonDetail({...lessonDetail, [evt.editor.name]: evt.editor.getData()})
    };

    const showModal = () => {
        getAllCategorysList()
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsEditableMicroCourse(false);
        setEditableLesson(false);
        setIsModalVisible(false);
        setCourseDetail({})
        setSelected([])
    };

    const handleLessonCancel = () => {
        setLessonModel(false);
        setEditableLesson(false);
        setLessonDetail({});
        setLessonSelected([]);
    };

    const onAddLesson = (record) => {
        setCourseRecord(record);
        setLessonModel(true)
    };

    const onEditMicroLesson = (record) => {
        setIsModalVisible(true);
        setIsEditableMicroCourse(true);
        setCourseDetail({
            _id: record.id,
            name: record.title,
            description: record.description,
            coursePrice: record.price
        })
    };

    const activeTask = async (record) => {
        if (window.confirm("Are you want to active this session ?")) {
            const res = await activeSessionMicroCourse(record.id);
            if (res && res.success) {
                await getMicroCourse();
                toastSuccess("Successfully Active session");
            } else {
                toastError("Something went wrong");
            }
        }
    };

    const deActiveTask = async (record) => {
        if (window.confirm("Are you want to delete this session ?")) {
            const res = await deleteSessionMicroCourse(record.id);
            if (res && res.success) {
                await getMicroCourse();
                toastSuccess("Successfully disActive session");
            } else {
                toastError("Something went wrong");
            }
        }
    };

    const columns = [
        {title: 'Title', dataIndex: 'title', key: 'title', width: 350},
        {
            title: 'Description',
            dataIndex: '',
            key: '',
            ellipsis: {showTitle: false},
            render: (record, i) => {
                return (
                    <span dangerouslySetInnerHTML={{__html: record?.description || "-"}}/>
                )
            },
        },
        {title: 'Price', dataIndex: 'price', key: 'price', width: 150},
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record, i) => {
                return (
                    <>
                        <button className="btn btn-primary add-task-btn mr-5" onClick={() => onEditMicroLesson(record)}>
                            Edit MicroCourse
                        </button>
                        <button className="btn btn-primary add-task-btn mr-5" onClick={() => onAddLesson(record)}>
                            Add Lesson
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
    microCourse && microCourse.length && microCourse.forEach((item, i) => {
        data.push({
            id: item?._id,
            key: i + 1,
            title: item?.name,
            description: item?.description,
            price: item?.coursePrice,
            isActive: item?.isActive
        })
    });

    const onEditLesson = (record) => {
        setLessonSelected([]);
        setEditableLesson(true);
        setLessonModel(true);
        setLessonDetail(record)
        setLessonSelected(record?.lessonTags?.split(","))
    };

    const expandedRowRender = () => {
        const lessonColumns = [
            {title: 'Lesson Name', dataIndex: 'lessonName', key: 'lessonName'},
            {
                title: 'Lesson Description',
                dataIndex: '',
                key: '',
                render: (record, i) => {
                    return (
                        <span dangerouslySetInnerHTML={{__html: record?.lessonDescription || "-"}}/>
                    )
                },
            },
            {title: 'Lesson Tags', dataIndex: 'lessonTags', key: 'lessonTags'},
            {title: 'Lesson Order', dataIndex: 'lessonOrder', key: 'lessonOrder'},
            {
                title: 'Action',
                dataIndex: '',
                key: '',
                render: (record, i) => {
                    return (
                        <>
                            <button className="btn btn-primary add-task-btn mr-5"
                                    onClick={() => onEditLesson(record)}>Edit Lesson
                            </button>
                        </>
                    )
                },
            }
        ];

        const lessonData = [];
        lessons && lessons.length && lessons.forEach((item, i) => {
            lessonData.push({
                key: i + 1,
                id: item._id,
                lessonName: item.lessonName || "-",
                lessonDescription: item.lessonDescription || "-",
                lessonImageUrl: item.lessonImageUrl || "-",
                microLessonContent: item.microLessonContent || "-",
                lessonTags: item.lessonTags || 0,
                lessonOrder: item.lessonOrder,
            })
        });
        return <div className="col-sm-12 col-md-12">
            <Table
                columns={lessonColumns}
                dataSource={lessonData}
                pagination={lessonData.length > 10 ? true : false}
                showHeader={true}/>
        </div>;
    };

    const showMicroLesson = async (i) => {
        const res = await getLessons(i);
        if (res && res.data) {
            setLessons(res.data.data || []);
        } else {
            toastError("Something went wrong");
        }
    };

    const batchFetchData = async (expanded, record) => {
        setCourseRecord(record);
        let keys = [];
        if (expanded) {
            await showMicroLesson(record.id);
            keys.push(record.key);
        }
        setLessonKey(keys)
    };
    if (loading) return <Loader/>;

    return (
        <>
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
            </div>
            {isModalVisible &&
            <Modal title={`${isEditableMicroCourse ? 'Edit Micro Course' : 'Add Micro Course'}`}
                   visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} maskClosable={false}>

                <p className="font-weight-bold">Name</p>
                <Input name="name" value={courseDetail?.name} onChange={(e) => handleChange(e,"name")}/>
                <p className="text-danger">{courseErrors.name || ""}</p>

                <p className="mt-3 font-weight-bold">Description</p>
                <CKEditor name="description" data={courseDetail?.description} onChange={courseHandleChangeEditor}/>
                <p className="text-danger">{courseErrors.description || ""}</p>

                {
                    !isEditableMicroCourse &&
                    <>
                        <p className="font-weight-bold">Course Category</p>
                        <Select name="category" placeholder="Select" value={courseDetail?.category || ''}
                                onChange={(value) => handleChange({target: {name: "category", value}})}>
                            <Select.Option value="">Select</Select.Option>
                            {categoryList && categoryList.map((item, i) => (
                                <Select.Option value={item._id} key={i}>{item.name}</Select.Option>
                            ))}
                        </Select>
                        <p className="text-danger">{courseErrors.category || ""}</p>
                    </>
                }

                {
                    !isEditableMicroCourse &&
                    <>
                        <p className="mt-3 font-weight-bold">Course Subcategory</p>
                        <Select name="subCategory" placeholder="Select" value={courseDetail?.subCategory || ''}
                                onChange={(value) => handleChange({target: {name: "subCategory", value}})}>
                            <Select.Option value="">Select</Select.Option>
                            {subcategory && subcategory.map((item, i) => (
                                <Select.Option value={item._id} key={i}>{item.name}</Select.Option>
                            ))}
                        </Select>
                        <p className="text-danger">{courseErrors.subCategory || ""}</p>
                    </>
                }


                {!isEditableMicroCourse && <><p className="font-weight-bold">Course Image URL</p>
                    <Input name="courseImageUrl" value={courseDetail?.courseImageUrl} onChange={(e) => handleChange(e,"courseImageUrl")}/>
                    <p className="text-danger">{courseErrors.courseImageUrl || ""}</p></>}

                {!isEditableMicroCourse && <><p className="font-weight-bold">Course Tag Words</p>
                    <TagsInput
                        value={selected}
                        onChange={setSelected}
                        name="courseTagWords"
                        placeHolder="enter course tag"
                    />
                    <p className="text-danger">{courseErrors.courseTagWords || ""}</p></>}

                {!isEditableMicroCourse && <><p className="font-weight-bold">Course Author</p>
                    <Input name="courseAuthor" value={courseDetail?.courseAuthor} onChange={(e) => handleChange(e,"courseAuthor")}/>
                    <p className="text-danger">{courseErrors.courseAuthor || ""}</p></>}

                {!isEditableMicroCourse && <>
                    <p className="mt-3 font-weight-bold">Apart from English, You can add one additional Language of
                        instructionThat will be used during the live sessions</p>
                    <Select
                        name="language"
                        style={{width: 200}}
                        placeholder="Select a language"
                        optionFilterProp="children"
                        value={courseDetail?.courseLanguage}
                        onChange={(e) => handleChange(e,"courseLanguage")}
                    >
                        {languages && languages.map((item, i) => (
                            <Option value={item.value} key={i}>{item.label}</Option>
                        ))}
                    </Select>
                    <p className="text-danger">{courseErrors.coursePrice || ""}</p></>}

                <p className="font-weight-bold">Course Price</p>
                <Input name="coursePrice" value={courseDetail?.coursePrice} onChange={(e) => handleChange(e,"coursePrice")}/>
                <p className="text-danger">{courseErrors.coursePrice || ""}</p>
            </Modal>
            }
            {lessonModel &&
            <Modal title={`${editableLesson ? 'Edit Micro Lesson' : 'Add Micro Lesson'}`} visible={lessonModel}
                   onOk={handleLessonOk} onCancel={handleLessonCancel} maskClosable={false}>
                <p className="font-weight-bold">Name</p>
                <Input name="lessonName" value={lessonDetail?.lessonName} onChange={LessonHandleChange}/>
                <p className="text-danger">{lessonErrors.lessonName || ""}</p>
                <p className="font-weight-bold">Lesson Order</p>
                <InputNumber name="lessonOrder" value={lessonDetail?.lessonOrder}
                             onChange={value => LessonHandleChange({target: {name: "lessonOrder", value}})}/>
                <p className="text-danger">{lessonErrors.lessonOrder || ""}</p>
                <p className="mt-3 font-weight-bold">Description</p>
                <CKEditor name="lessonDescription" data={lessonDetail?.lessonDescription}
                          onChange={LessonHandleChangeEditor}/>
                <p className="text-danger">{lessonErrors.lessonDescription || ""}</p>
                <p className="font-weight-bold">Image URL</p>
                <Input name="lessonImageUrl" value={lessonDetail?.lessonImageUrl} onChange={LessonHandleChange}/>
                <p className="text-danger">{lessonErrors.lessonImageUrl || ""}</p>
                <p className="font-weight-bold">microLesson Content</p>
                <CKEditor name="microLessonContent" data={lessonDetail?.microLessonContent}
                          onChange={LessonHandleChangeEditor}/>
                <p className="text-danger">{lessonErrors.microLessonContent || ""}</p>
                <p className="font-weight-bold">Lesson Tags</p>
                <TagsInput
                    value={lessonSelected && lessonSelected.length > 0 ? lessonSelected : []}
                    onChange={setLessonSelected}
                    name="lessonTags"
                    placeHolder="enter lesson tag"
                />
                <p className="text-danger">{lessonErrors.lessonTags || ""}</p>
            </Modal>}
        </>
    )
};

export default MicroCourse
