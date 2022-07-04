import React from "react";
import { Modal, Button } from 'antd';
import PredefinedTask from "./PredefinedTaskList";

const AddTaskModal = (props) =>{
    const {addTask, showModal,setModal, predefinedTaskRecords,selectTask, onSelectChange} = props;
    console.log("showModal----->>>", showModal);
  return(
      <Modal wrapClassName="task" title="Add Approved Tasks for Mentor"
             visible={showModal}
             onCancel={() =>setModal(false)} footer={[<Button key="back" className="btn btn-primary" onClick={addTask}>Add task</Button>]}
      >
         <PredefinedTask predefinedTaskRecords={predefinedTaskRecords} selectTask={selectTask} onSelectChange={onSelectChange} flag="ADD"/>
      </Modal>
  )
};
export default AddTaskModal;