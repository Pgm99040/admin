import React from "react";
import {Button, Input, Modal, Select} from "antd";

const CommonCategoryModal = (props) =>{
    const { categoryModal, handleChange, category, onAddCategory, categoryError, flag, predefinedTaskList, closeModal } = props;
    return (
        <Modal wrapClassName="category" title={flag ? 'Add Category' : 'Add Sub Category'}
               visible={categoryModal}
               onCancel={() =>closeModal(flag ? 'category' : 'subcategory')} footer={[<Button key="back" className="btn btn-primary" onClick={() =>{flag ? onAddCategory('category') : onAddCategory('subcategory')}}>{flag ? 'Add Category' : 'Add Sub Category'}</Button>]}
        >
            <div className="row category-details">
                <div className="col-sm-12 col-md-12">
                    <label>Name :</label>
                    <Input name="name" value={category.name || "" } onChange={handleChange}/>
                    <p className="text-danger">{categoryError.name}</p>
                </div>
               {!flag && <div className="col-sm-12 col-md-12">
                    <label>Category :</label>
                    <Select name="categoryId" value={category && category.categoryId || ''} placeholder="Select"
                            onChange={(value) =>handleChange({target: {name: "categoryId", value}})}>
                        <Select.Option value="">Select</Select.Option>
                        {predefinedTaskList && predefinedTaskList.map((item, i) =>(
                            <Select.Option value={item._id} key={i}>{item.name}</Select.Option>
                        ))}
                    </Select>
                    <p className="text-danger">{categoryError.categoryId}</p>
                </div>}
                <div className=" mt-2 col-sm-12 col-md-12 description">
                    <label>Description :</label>
                    <Input.TextArea name="description" value={category.description || "" } onChange={handleChange}/>
                    <p className="text-danger">{categoryError.description}</p>
                </div>
            </div>
        </Modal>
    )
};
export default CommonCategoryModal;