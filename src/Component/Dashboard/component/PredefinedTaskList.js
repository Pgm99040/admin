import React, {useEffect, useState} from "react";
import {Button, Input, Modal} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import {
    deletePredefinedTask,
    activePredefinedTask,
    reviewtask
} from "../../../utils/_data";
import {toastError, toastSuccess} from "../../../utils/common";
import CKEditor from "../../Common/CKEditor";
import cloneDeep from "lodash.clonedeep";
const PredefinedTask = (props) => {

    const {predefinedTaskRecords, selectTask, onSelectChange, flag, handleEditModal, predefinedTaskDetails} = props;
    const [visible, setVisible] = useState(false);
    const [predefinedTaskList, setPredefinedTaskList] = useState({title: "", description: ""});
    const [review, setReview] = useState({TaskID: "", reviews: []});
    const [taskRequire, setTaskRequire] = useState([predefinedTaskList]);
    const [jobPostErrors, setValidation] = useState({title: "", description: ""});

    const resetForm = () => {
        setTaskRequire([predefinedTaskList])
    };

    const onSaveReview = async () => {
        let allErrors = true;
        taskRequire.map((item) => {
            if (item.title === "") {
                allErrors = false
            } else if (item.description === "") {
                allErrors = false
            } else {
                allErrors = true
            }
        });
        if (allErrors === true) {
            setVisible(false);
            const res = await reviewtask(review.TaskID, taskRequire);
            if (res && res.success) {
                toastSuccess("Successfully Added");
                await predefinedTaskDetails();
            } else {
                toastError("Something went wrong");
            }
            resetForm()
        }
    };

    const deleteTask = async (id) => {
        if (window.confirm("Are you want to delete this task ?")) {
            const res = await deletePredefinedTask(id);
            if (res && res.success) {
                toastSuccess("Successfully disActive task");
                await predefinedTaskDetails();
            } else {
                toastError("Something went wrong");
            }
        }
    };
    const activeTask = async (id) => {
        if (window.confirm("Are you want to active this task ?")) {
            const res = await activePredefinedTask(id);
            if (res && res.success) {
                toastSuccess("Successfully Active task");
                await predefinedTaskDetails();
            } else {
                toastError("Something went wrong");
            }
        }
    };

    const addMentor = (id) => {
      const taskdata= predefinedTaskRecords.filter(item=>item._id===id);
        setTaskRequire(taskdata[0]?.review || [predefinedTaskList]);
        setReview({...review,TaskID: id});
        setVisible(true)
    };

    const handleChanges = (e) => {
        const {name, value, index} = e.target;
        let updatedTask = cloneDeep(taskRequire);
        if (name === 'title') {
            updatedTask[index][name] = value.target.value;
        } else {
            updatedTask[index][name] = value;
        }
        setTaskRequire([...updatedTask])
    };

    const handleEditors = (e) => {
        const {name, value, index} = e.editor;
        let updatedTask = cloneDeep(taskRequire);
        if (name === 'description') {
            updatedTask[index][name] = value.editor.getData();
        } else {
            updatedTask[index][name] = value.editor.getData();
        }
        setTaskRequire([...updatedTask])
    };

    const onAdd = () => {
        const task = taskRequire[taskRequire.length - 1];
        if (task.title && task.description) {
            taskRequire[taskRequire.length] = predefinedTaskList;
            setTaskRequire([...taskRequire])
        }
    };

    return (
        <div className="row add-task">
            {
                predefinedTaskRecords && predefinedTaskRecords.length ? predefinedTaskRecords.map((item, i) => (
                    <div className="col-sm-12 col-md-12 task-description" key={i}>
                        <div
                            className={((flag === "ADD") && (selectTask.includes(item._id))) ? 'selected-task row' : 'row'}>
                            <div className={`${flag === "ADD" ? 'col-md-3' : 'col-md-2'}  col-sm-2 col-xs-12`}>
                                {flag === "ADD" &&
                                <React.Fragment>
                                    <input type="checkbox" checked={selectTask.includes(item._id)}
                                           onChange={() => onSelectChange(item._id)}/>&nbsp; &nbsp;
                                </React.Fragment>}
                                <img className="taskIcon" src={item.imageUrl} height={150} width={150}/>
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12 no-left-padding-div">
                                <div className="col-md-12 col-xs-12 col-sm-12 no-padding-div">
                                    <div className="divider"></div>
                                    <h3 className="task_category mb-3">{item.name}</h3>
                                    {flag === "ADD" && <h5 className="task_category mb-3">Task Id : {item._id}</h5>}
                                    <span className="task_category"
                                          dangerouslySetInnerHTML={{__html: item.description || "-"}}/> &nbsp;&nbsp;
                                    {flag !== "ADD" && <span className="bulletin">&bull;</span>}
                                    {flag !== "ADD" && <span className="text-success">{item.difficultyLevel}</span>}
                                    {flag !== "ADD" && <span className="bulletin">&bull;</span>}
                                </div>
                                {flag !== "ADD" && <div className="col-md-12 col-xs-12 col-sm-12 no-padding-div">
                                    <p className="task_desc"
                                       dangerouslySetInnerHTML={{__html: item.tinyDescription || "-"}}/>
                                </div>}

                                {flag !== "ADD" && item.mediaLink &&
                                <div className="col-md-12 col-xs-12 col-sm-12 no-padding-div">
                                    <iframe width="420" height="315" src={item && item.mediaLink} title="Media Link"/>
                                </div>
                                }
                            </div>
                            {flag !== "ADD" && <div className="col-md-1 col-sm-12 col-xs-12 float-right">
                                <p className="task_priceText">Fee Earned</p>
                                <p className="task_rate">{`${item.credits || ''} ${item.currencyCode || ''}`}</p>
                            </div>}
                            {flag !== "ADD" && (<div className="edit-icon col-md-1 col-sm-12 col-xs-12 float-right">
                                <EditOutlined onClick={() => {
                                    handleEditModal(item._id)
                                }}/>
                            </div>)}
                            {flag !== "ADD" && (<div className="delete-icon col-md-1 col-sm-12 col-xs-12 float-right">
                                <Button type="primary" danger onClick={() => activeTask(item._id)}>Active</Button>
                            </div>)}
                            {flag !== "ADD" && (<div className="delete-icon col-md-1 col-sm-12 col-xs-12 float-right">
                                <Button type="primary" danger onClick={() => deleteTask(item._id)}>DeActive</Button>
                            </div>)}
                            {flag !== "ADD" && <Button type="primary" onClick={() => addMentor(item._id)}>
                                View and Add mentor task review
                            </Button>}
                        </div>
                    </div>
                )) : <div className=" col-sm-12 col-md-12"><h4 className="text-center">Records not found</h4></div>
            }
            <Modal
                title="Add Mentor Review Items"
                centered
                visible={visible}
                onOk={() => {
                    onSaveReview()
                }}
                onCancel={() => {
                    setVisible(false);
                    resetForm()
                }}
                width={1000}
            >
                <div className="delete-icon  float-right">
                    <div style={{marginBottom: '10px'}}>
                        <Button style={{
                            height: 'fit-content',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            padding: '0 7px'
                        }} className="d-flex" onClick={() => onAdd()}><span style={{fontSize: '30px'}}>+</span>Add mentor task review</Button>
                    </div>
                </div>
                <div>
                    {
                        taskRequire && taskRequire.map((item, index) => (
                            <>
                                <p className="mt-3 font-weight-bold">Title</p>
                                <Input name="title" value={(item && item.title) || ''}
                                       onChange={(value) => handleChanges({target: {name: "title", value, index}})}/>
                                <p className="text-danger">{jobPostErrors.title || ""}</p>
                                <p className="mt-3 font-weight-bold">Job Description</p>
                                <CKEditor name="description" data={(item && item.description) || ''}
                                          onChange={(value) => handleEditors({
                                              editor: {
                                                  name: "description",
                                                  value,
                                                  index
                                              }
                                          })}/>
                                <p className="text-danger">{jobPostErrors.description || ""}</p>
                            </>
                        ))
                    }
                </div>
            </Modal>
        </div>
    )
};
export default PredefinedTask;
