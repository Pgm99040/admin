import React from 'react';
import {Modal, Select} from "antd";

const CreateTestModal = props => {
    const {isModal, handleModal, state, onChange, onSave,predefinedTaskList,handleChangeTask,subcategory} = props;
    return (
        <Modal visible={isModal} onCancel={handleModal} onOk={onSave}>
            <div className="modal-header">
                <h5 className="modal-title">Create Custom Test</h5>
                <button type="button" className="close" onClick={handleModal}>&times;</button>
            </div>
            <div className="modal-body">
                <p className="text-muted">This will save your new test. You can then create MCQ and Coding Test
                    components as part of the test</p>
                <div className="form">
                    <div className="form-group">
                        <label className="col-form-label"><b>Test Name</b></label>
                        <input type="text" name="TestName" value={state.fields.TestName} onChange={onChange}
                               className="form-control"/>
                        <p className="text-danger">{state.errors.TestName}</p>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label"><b>Description</b></label>
                        <textarea name="TestDescription" value={state.fields.TestDescription} onChange={onChange}
                                  className="form-control"/>
                        <p className="text-danger">{state.errors.TestDescription}</p>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label"><b>Test Images</b></label>
                        <input type="text" name="TestImg" value={state.fields.TestImg} onChange={onChange}
                                  className="form-control"/>
                        <p className="text-danger">{state.errors.TestImg}</p>
                    </div>
                    <p className="mt-3 font-weight-bold">Task Category</p>
                    <Select name="selectCetegory" value={(state.fields.selectCetegory)} placeholder="Select"
                            onChange={(value) =>handleChangeTask({target: {name: "selectCetegory", value}})}>
                        <Select.Option value="">Select</Select.Option>
                        {predefinedTaskList && predefinedTaskList.map((eachItem, i) =>(
                            <Select.Option value={eachItem._id} key={i}>{eachItem.name}</Select.Option>
                        ))}
                    </Select>
                    <p className="text-danger">{state.errors.selectCetegory}</p>
                    <p className="mt-3 font-weight-bold">Task subcategory</p>
                    <Select name="subcategory" value={(state.fields.subcategory)} placeholder="Select"
                            onChange={(value) =>handleChangeTask({target: {name: "subcategory", value}})}>
                        <Select.Option value="">Select</Select.Option>
                        {subcategory && subcategory.map((eachItem, i) =>(
                            <Select.Option value={eachItem._id} key={i}>{eachItem.name}</Select.Option>
                        ))}
                    </Select>
                    <p className="text-danger">{state.errors.subcategory}</p>

                </div>
            </div>
        </Modal>
    )
};
export default CreateTestModal
