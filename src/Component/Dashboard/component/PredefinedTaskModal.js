import React, {useEffect, useState} from "react";
import {Button, Input, InputNumber, Modal, Select} from "antd";
import CKEditor from '../../Common/CKEditor/index';
import Loader from "../../Common/Loader";

const difficultlyLevel = [
    {value: "beginner", label: "Beginner"},
    {value: "intermediate", label: "Intermediate"},
    {value: "expert", label: "Expert"}
];
const careerPath = [
    {value: "Software Development Engineering", label: "Software Development Engineering"},
    {value: "Hardware Engineering", label: "Hardware Engineering"}
];

const PredefinedTaskModal = (props) =>{
    const {showModal, onCancel, addPredefinedTask, handleTask, predefinedTask, errors, predefinedTaskList, subcategory, submitStatus, editorChange} = props;

    return(
        <Modal wrapClassName="pre-task" title={submitStatus ? "Add Predefined Tasks" : "Edit Predefined Tasks"}
               visible={showModal} maskClosable={false}
               onCancel={onCancel} footer={[<Button key="back" className="btn btn-primary" onClick={() => addPredefinedTask(submitStatus)}>{submitStatus ? "Add Task" : "Edit Task"}</Button>]}>
            <div className="pre-task-list row">
                <div className="col-sm-12 col-md-12">
                    <label>Name</label>
                    <Input name="name" value={predefinedTask && predefinedTask.name || ''}  onChange={handleTask} />
                    <p className="text-danger">{errors.name}</p>
                </div>
                <div className="col-sm-12 col-md-12">
                    <label>Related Knowledge Block</label>
                    <Input name="relatedKnowledgeBlock" value={predefinedTask && predefinedTask.relatedKnowledgeBlock || ''} onChange={handleTask}/>
                    {/*<p className="text-danger">{errors.relatedKnowledgeBlock}</p>*/}
                </div>
                {/*<div className="col-sm-12 col-md-12">*/}
                {/*    <label>Task Mentor</label>*/}
                {/*    <Input name="taskMentor" value={predefinedTask && predefinedTask.taskMentor || ''} onChange={handleTask}/>*/}
                {/*    <p className="text-danger">{errors.taskMentor}</p>*/}
                {/*</div>*/}
                <div className="col-sm-12 col-md-12">
                    <label>Resources</label>
                    <Input name="resources" value={predefinedTask && predefinedTask.resources || ''} onChange={handleTask}/>
                    {/*<p className="text-danger">{errors.resources}</p>*/}
                </div>
                <div className="col-sm-12 col-md-12">
                    <label>ImageUrl</label>
                    <Input name="imageUrl" value={predefinedTask && predefinedTask.imageUrl || ''} onChange={handleTask}/>
                    <p className="text-danger">{errors.imageUrl}</p>
                </div>
                <div className="col-sm-12 col-md-12">
                    <label>Category</label>
                    <Select name="category" value={predefinedTask && predefinedTask.category || ''} placeholder="Select"
                            onChange={(value) =>handleTask({target: {name: "category", value}})}>
                        <Select.Option value="">Select</Select.Option>
                        {predefinedTaskList && predefinedTaskList.map((item, i) =>(
                            <Select.Option value={item._id} key={i}>{item.name}</Select.Option>
                        ))}
                    </Select>
                    <p className="text-danger">{errors.category}</p>
                </div>
                <div className="col-sm-12 col-md-12">
                    <label>Subcategory</label>
                    <Select name="subcategory" value={predefinedTask && predefinedTask.subcategory || ''} placeholder="Select"
                            onChange={(value) =>handleTask({target: {name: "subcategory", value}})}>
                        <Select.Option value="">Select</Select.Option>
                        {subcategory && subcategory.map((item, i) =>(
                            <Select.Option value={item._id} key={i}>{item.name}</Select.Option>
                        ))}
                    </Select>
                    <p className="text-danger">{errors.subcategory}</p>
                </div>
                <div className="col-sm-12 col-md-12">
                    <label>Difficulty Level</label>
                    <Select name="difficultyLevel" value={predefinedTask && predefinedTask.difficultyLevel || ''} placeholder="Select"
                            onChange={(value) =>handleTask({target: {name: "difficultyLevel", value}})}>
                        <Select.Option value="">Select</Select.Option>
                        {difficultlyLevel && difficultlyLevel.map((item, i) =>(
                            <Select.Option value={item.value} key={i}>{item.label}</Select.Option>
                        ))}
                    </Select>
                    <p className="text-danger">{errors.difficultyLevel}</p>
                </div>
                <div className="col-sm-12 col-md-12">
                    <label>Related Career Path</label>
                    <Select name="relatedCareerPath" value={predefinedTask && predefinedTask.relatedCareerPath || ''} placeholder="Select"
                            onChange={(value) =>handleTask({target: {name: "relatedCareerPath", value}})}>
                        <Select.Option value="">Select</Select.Option>
                        {careerPath && careerPath.map((item, i) =>(
                            <Select.Option value={item.value} key={i}>{item.label}</Select.Option>
                        ))}
                    </Select>
                    <p className="text-danger">{errors.relatedCareerPath}</p>
                </div>
                <div className="col-sm-12 col-md-12">
                    <label>Task Type</label>
                    <Select name="taskType" value={predefinedTask && predefinedTask.taskType || ''} placeholder="Select"
                            onChange={(value) =>handleTask({target: {name: "taskType", value}})}>
                        <Select.Option value="">Select</Select.Option>
                        <Select.Option value="paid">Paid</Select.Option>
                    </Select>
                    <p className="text-danger">{errors.taskType}</p>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="row">
                        <div className="col-sm-6">
                            <label>Price</label>
                            <InputNumber name="price" value={predefinedTask && predefinedTask.price && predefinedTask.price[0] && predefinedTask.price[0].value || null}
                                         onChange={(value) =>handleTask({target: {name: "price", value}}, "value")}/>
                            <p className="text-danger">{errors.value}</p>
                        </div>
                        <div className="col-sm-6">
                            <label>Currency Code</label>
                            <Select name="price" value={predefinedTask && predefinedTask.price && predefinedTask.price[0] && predefinedTask.price[0].currency || ''} placeholder="Select"
                                    onChange={(value) =>handleTask({target: {name: "price", value}}, "currency")}>
                                <Select.Option value="">Select</Select.Option>
                                <Select.Option value="USD">USD</Select.Option>
                                <Select.Option value="INR">INR</Select.Option>
                            </Select>
                            <p className="text-danger">{errors.currency}</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <label>Credits</label>
                    <InputNumber name="credits" value={predefinedTask && predefinedTask.credits}
                                 onChange={(value) =>handleTask({target: {name: "credits", value}})}/>
                    <p className="text-danger">{errors.credits}</p>
                </div>
                <div className="col-sm-12 col-md-12">
                    <label>Media Link</label>
                    <Input name="mediaLink" value={predefinedTask && predefinedTask.mediaLink} onChange={handleTask} />
                    <p className="text-danger">{errors.mediaLink}</p>
                </div>
                <div className="col-sm-12 col-md-12">
                    <label>Description</label>
                    <CKEditor name="description" data={predefinedTask && predefinedTask.description || ""} onChange={editorChange}/>
                    {/*<Input.TextArea name="description" value={predefinedTask && predefinedTask.description || ''} onChange={handleTask}/>*/}
                    <p className="text-danger">{errors.description}</p>
                </div>
                <div className="col-sm-12 col-md-12">
                    <label>Tiny Description</label>
                    <CKEditor name="tinyDescription" data={predefinedTask && predefinedTask.tinyDescription || ""} onChange={editorChange}/>
                    {/*<Input.TextArea name="tinyDescription" value={predefinedTask && predefinedTask.tinyDescription || ''} onChange={handleTask}/>*/}
                    <p className="text-danger">{errors.tinyDescription}</p>
                </div>
                <div className="col-sm-12 col-md-12">
                    <label>taskDetailed Description For Mentee</label>
                    <CKEditor name="taskDetailedDescriptionForMentee" data={predefinedTask && predefinedTask.taskDetailedDescriptionForMentee || ""} onChange={editorChange}/>
                    {/*<Input.TextArea name="tinyDescription" value={predefinedTask && predefinedTask.tinyDescription || ''} onChange={handleTask}/>*/}
                    <p className="text-danger">{errors.taskDetailedDescriptionForMentee}</p>
                </div>
            </div>
        </Modal>
    )
};
export default PredefinedTaskModal;
