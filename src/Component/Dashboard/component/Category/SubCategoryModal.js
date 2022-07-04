import React from "react";
import CommonCategoryModal from "../CommonCategoryModal";

const SubCategoryModal = (props) =>{
    const { categoryModal, handleChange, category, onAddCategory, categoryError, predefinedTaskList, flag, closeModal } = props;
    return (
        <CommonCategoryModal
            categoryModal={categoryModal}
            predefinedTaskList={predefinedTaskList}
            handleChange={handleChange}
            onAddCategory={onAddCategory}
            categoryError={categoryError}
            closeModal={closeModal}
            category={category}
            flag={flag}
        />
    )
};
export default SubCategoryModal;