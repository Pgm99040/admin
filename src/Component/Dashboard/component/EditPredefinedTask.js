import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap4-modal";
import PredefinedTaskModal from "./PredefinedTaskModal";
import Loader from "../../Common/Loader";

const EditPredefinedTask = (props) =>{
    const {predefinedTask, handleTask, showModal, onCancel, addPredefinedTask, predefinedTaskList, subcategory, errors, loading, editorChange} = props;
    return(
        <div>
            { loading ? <Loader/> : <PredefinedTaskModal predefinedTask={predefinedTask}
                                handleTask={handleTask}
                                showModal={showModal}
                                onCancel={onCancel}
                                addPredefinedTask={addPredefinedTask}
                                predefinedTaskList={predefinedTaskList}
                                subcategory={subcategory}
                                editorChange={editorChange}
                                errors={errors}/>}
        </div>
    )
};
export default EditPredefinedTask;