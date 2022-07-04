import React from "react";
import CommonCategoryModal from "../CommonCategoryModal";

const CategoryModal = (props) =>{
    const { categoryModal, handleChange, category, onAddCategory, categoryError, flag, closeModal } = props;
    return (
        <CommonCategoryModal
            categoryModal={categoryModal}
            handleChange={handleChange}
            closeModal={closeModal}
            onAddCategory={onAddCategory}
            categoryError={categoryError}
            category={category}
            flag={flag}
        />
    )
};
export default CategoryModal;