import React, {useEffect, useState} from "react";
import {Button, Modal, Input, Select, InputNumber} from "antd";
import PredefinedTaskModal from "./PredefinedTaskModal";

const AddPredefinedTask = (props) =>{
    const {predefinedTask, handleTask, showModal, onCancel, addPredefinedTask, predefinedTaskList, subcategory, errors, editorChange} = props;
  return(
      <div>
      <PredefinedTaskModal predefinedTask={predefinedTask}
                           handleTask={handleTask}
                           showModal={showModal}
                           onCancel={onCancel}
                           addPredefinedTask={addPredefinedTask}
                           predefinedTaskList={predefinedTaskList}
                           subcategory={subcategory}
                           editorChange={editorChange}
                           submitStatus={"Add"}
                           errors={errors}
      />
      </div>
  )
};
export default AddPredefinedTask;