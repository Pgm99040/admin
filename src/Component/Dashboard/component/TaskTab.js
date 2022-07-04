import React, {useEffect, useState} from 'react';
import PredefinedTask from "./PredefinedTaskList";
import AddPredefinedTask from "./AddPredefinedTask";
import cloneDeep from "lodash.clonedeep";
import {
    getAllCategoryList,
    getCategoryIdBySubcategory,
    addPredefinedTaskList,
    getPredefinedAllTask,
    updatePredefinedAllTask,
    addCategory, addSubCategory, predefinedAllTaskList
} from "../../../utils/_data";
import {toastError, toastSuccess} from "../../../utils/common";
import EditPredefinedTask from "./EditPredefinedTask";
import CategoryModal from "./Category/CategoryModal";
import SubCategoryModal from "./Category/SubCategoryModal";
import Loader from "../../Common/Loader";

const initialState = {
    name: "",
    relatedKnowledgeBlock: "",
    // taskMentor: "",
    resources: "",
    imageUrl: "",
    category: "",
    subcategory: "",
    difficultyLevel: "",
    relatedCareerPath: "",
    taskType: "",
    price: [{currency: "", value: null}],
    credits: '',
    description: "",
    tinyDescription: ""
};
const categoryInit = {
    categoryId: "",
    name: "",
    description: ""
};

const TaskTab = () =>{
    const [showModal, setShowModal] = useState(false);
    const [predefinedTaskRecords, setPredefinedTaskRecords] = useState([]);
    const [editShowModal, setEditShowModal] = useState(false);
    const [predefinedTaskList, setPredefinedTaskList] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [predefinedTask, setPredefinedTask] = useState(initialState);
    const [categoryModal, setCategoryModal] = useState(false);
    const [category, setCategory] = useState(categoryInit);
    const [categoryError, setCategoryError] = useState({});
    const [subcategoryModal, setSubCategoryModal] = useState(false);

    const getAllCategorysList = async () =>{
      const response = await getAllCategoryList();
      if (response && response.data && response.data.success) {
          setPredefinedTaskList(response.data.result || []);
      } else {
          console.log(response.msg);
      }
    };

    const predefinedTaskDetails = async () => {
        setLoading(true)
        const response = await predefinedAllTaskList();
        if (response && response.data && response.data.success) {
            setPredefinedTaskRecords(response.data.result || []);
            setLoading(false)

        } else {
            console.log(response.msg);
            setLoading(false)

        }
    };

    useEffect(()=>{
        predefinedTaskDetails()
    },[])
    const getCategoryWithSubcategory = async (id) =>{
      const response = await getCategoryIdBySubcategory(id);
      if (response && response.data && response.data.success) {
          setSubcategory(response && response.data && response.data.result || [])
      } else {
          console.log(response.msg);
      }
    };

    const getpredefinedTask = async (id) =>{
        setLoading(true);
        const response = await getPredefinedAllTask(id);
        if (response && response.data && response.data.success) {
            const data = response && response.data && response.data.result;
            const record = {
                predefinedTaskId: data._id,
                name: data.name,
                relatedKnowledgeBlock: data.relatedKnowledgeBlock,
                // taskMentor: data.taskMentor,
                resources: data.resources,
                imageUrl: data.imageUrl,
                category: data.category,
                subcategory: data.subcategory._id,
                difficultyLevel:  data.difficultyLevel,
                relatedCareerPath:  data.relatedCareerPath,
                taskType:  data.taskType,
                price: [{currency: data.price[0].currency, value: data.price[0].value}],
                credits:  data.credits,
                description:  data.description,
                tinyDescription:  data.tinyDescription,
                taskDetailedDescriptionForMentee : data.taskDetailedDescriptionForMentee,
                mediaLink : data.mediaLink
            };
            setPredefinedTask(record);
            setLoading(false);
        } else {
            setLoading(false);
            toastError("Something went wrong");
        }
    };
    const handleModal = async () =>{
        await getAllCategorysList();
        setShowModal(!showModal);
    };

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value
        })
    };

    const categoryValidation = (name, value) =>{
          switch (name) {
              case 'name':
                  if (!value){
                      return 'Name is required';
                  } else {
                      return '';
                  }
              case 'description':
                  if (!value){
                      return 'Description is required';
                  } else {
                      return '';
                  }
              case 'categoryId':
                  if (!value){
                      return 'Category id is required';
                  } else {
                      return '';
                  }
              default: {
                      return '';
               }
          }
    };

    const onAddCategory = async (tag) =>{
        console.log("tag----->", tag);
        let validation = {};
        Object.keys(category).forEach(name =>{
            const error = categoryValidation(name, category[name]);
            if (error && error.length){
                validation[name] = error
            }
        });
        if (tag === "category"){
            delete validation.categoryId;
        }
        if (Object.keys(validation).length > 0) {
            setCategoryError(validation);
            return true;
        }

        if (tag === "category") {
            delete category.categoryId;
            setLoader(true);
            const res = await addCategory(category);
            console.log("category------>", res);
            if (res?.data?.success){
                toastSuccess("Category added successfully");
                setLoader(false);
            }else {
                toastError("Something went wrong");
                setLoader(false);
            }
            setCategoryModal(false);
            setCategoryError({});
            setPredefinedTask(initialState);
        } else {
            setLoader(true);
            const res = await addSubCategory(category);
            if (res?.data?.success){
                setLoader(false);
                toastSuccess("Sub category added successfully");
            }else {
                setLoader(false);
                toastError("Something went wrong");
            }
            setSubCategoryModal(false);
            setCategoryError({});
            setPredefinedTask(initialState);
        }
    };

    const handleCategoryModal = async (flag) =>{
        if (flag === 'category'){
            setCategoryModal(!categoryModal);
        } else {
            setSubCategoryModal(!subcategoryModal);
            await getAllCategorysList();
        }
    };

    const closeModal = (flag) =>{
        if (flag === 'category'){
            setCategoryModal(!categoryModal);
            setCategory(categoryInit);
            setCategoryError({});
        } else {
            setSubCategoryModal(!subcategoryModal);
            setCategory(categoryInit);
            setCategoryError({});
        }
    };

    const handleEditModal = (id) =>{
            getAllCategorysList();
            getpredefinedTask(id);
            setEditShowModal(!editShowModal);
    };
    const onCancel = () =>{
        setShowModal(false);
        setErrors({});
        setPredefinedTask(initialState)
    };
    const onEditCancel = () =>{
        setEditShowModal(false);
        setErrors({});
        setPredefinedTask({})
    };
    const validation = (name, value) =>{
        switch (name) {
            case "name":
                if (!value) {
                    return "Name is required";
                } else {
                    return "";
                }
            // case "relatedKnowledgeBlock":
            //     if (!value) {
            //         return "Knowledge block is required";
            //     } else {
            //         return "";
            //     }
            // case "taskMentor":
            //     if (!value) {
            //         return "Task mentor is required";
            //     } else {
            //         return "";
            //     }
            // case "resources":
            //     if (!value) {
            //         return "Resources is required";
            //     } else {
            //         return "";
            //     }
            case "imageUrl":
                if (!value) {
                    return "Image Url is required";
                } else {
                    return "";
                }
            case "category":
                if (!value) {
                    return "Category Id is required";
                } else {
                    return "";
                }
            case "subcategory":
                if (!value) {
                    return "Subcategory Id is required";
                } else {
                    return "";
                }
            case "difficultyLevel":
                if (!value) {
                    return "Difficulty level is required";
                } else {
                    return "";
                }
            case "relatedCareerPath":
                if (!value) {
                    return "Career path is required";
                } else {
                    return "";
                }
            case "taskType":
                if (!value) {
                    return "Task type is required";
                } else {
                    return "";
                }
            case "credits":
                if (!value) {
                    return "Credits is required";
                } else {
                    return "";
                }
            case "description":
                if (!value) {
                    return "Description is required";
                } else {
                    return "";
                }
            case "tinyDescription":
                if (!value) {
                    return "Description is required";
                } else {
                    return "";
                }
            case "taskDetailedDescriptionForMentee":
                if (!value) {
                    return "Description is required";
                } else {
                    return "";
                }
            default: {
                return "";
            }
        }
    };
    const addPredefinedTask = async (status) =>{
        let validations = {};
        Object.keys(predefinedTask).forEach(name =>{
           const error = validation(name, predefinedTask[name]);
           if (error && error.length) {
               validations[name] = error;
           }
        });
        if (predefinedTask.price[0].value === null || predefinedTask.price[0].value === undefined) {
            validations["value"] = "Price is required";
        } else {
            delete validations.value;
        }
        if (predefinedTask.price[0].currency === "" || predefinedTask.price[0].currency === undefined) {
            validations["currency"] = "Currency code is required";
        } else {
            delete validations.currency;
        }
        if (Object.keys(validations).length > 0) {
            setErrors(validations);
            return true;
        }
        if (status === "Add"){
            const response = await addPredefinedTaskList(predefinedTask);
            if (response && response.data && response.data.success) {
                toastSuccess("Successfully added task");
                setShowModal(false);
                setErrors({});
                setPredefinedTask(initialState);
                await predefinedTaskDetails();
            } else {
                toastError("Something went wrong");
                setShowModal(false);
                setErrors({});
                setPredefinedTask(initialState);
            }
        } else {
            const response = await updatePredefinedAllTask(predefinedTask);
            if (response && response.data && response.data.success) {
                toastSuccess("Successfully update task");
                setEditShowModal(false);
                setErrors({});
                setPredefinedTask(initialState);
                await predefinedTaskDetails();
            } else {
                toastError("Something went wrong");
                setEditShowModal(false);
                setErrors({});
                setPredefinedTask(initialState);
            }
        }

    };

    const handleTask = async (e, subName) =>{
        const { name, value } = e.target;
        let updatedTask = cloneDeep(predefinedTask);
        if (name === "category") {
            await getCategoryWithSubcategory(value);
        }
        if (name === "price") {
            if (subName === "value") {
                updatedTask = {
                    ...updatedTask,
                    price:[{[subName]: value, currency: predefinedTask && predefinedTask.price && predefinedTask.price[0] && predefinedTask.price[0].currency}]
                };
            } else {
                updatedTask = {
                    ...updatedTask,
                    price:[{[subName]: value, value: predefinedTask && predefinedTask.price[0] && predefinedTask.price[0].value}]
                };
            }
        } else {
            updatedTask[name] = value
        }
        setPredefinedTask(updatedTask);
    };
    const editorChange = (evt) =>{
        setPredefinedTask({
            ...predefinedTask,
            [evt.editor.name]: evt.editor.getData()
        })
    };
    if (loader) return <Loader/>;
    return (
        <div className="task-tab">
            <div className="task-button">
                <button className="btn btn-primary add-Category mb-3" onClick={() =>handleCategoryModal('category')}>Add Category</button>&nbsp;&nbsp;
                <button className="btn btn-primary add-SubCategory mb-3" onClick={() =>handleCategoryModal('subcategory')}>Add SubCategory</button>&nbsp;&nbsp;
                <button className="btn btn-primary add-Predefined mb-3" onClick={handleModal}>Add Predefined Task</button>
            </div>
          <CategoryModal categoryModal={categoryModal}
                         categoryError={categoryError}
                         handleChange={handleChange}
                         onAddCategory={onAddCategory}
                         closeModal={closeModal}
                         category={category}
                         flag={true}/>
          <SubCategoryModal categoryModal={subcategoryModal}
                          predefinedTaskList={predefinedTaskList}
                          categoryError={categoryError}
                          closeModal={closeModal}
                          handleChange={handleChange}
                          onAddCategory={onAddCategory}
                          category={category}
                          flag={false}/>
          <AddPredefinedTask addPredefinedTask={addPredefinedTask}
                             editorChange={editorChange}
                             showModal={showModal}
                             predefinedTask={predefinedTask}
                             setPredefinedTask={setPredefinedTask}
                             handleTask={handleTask}
                             predefinedTaskList={predefinedTaskList}
                             subcategory={subcategory}
                             errors={errors}
                             onCancel={onCancel}/>
          <EditPredefinedTask addPredefinedTask={addPredefinedTask}
                              loading={loading}
                              editorChange={editorChange}
                              showModal={editShowModal}
                              predefinedTask={predefinedTask || {}}
                              setPredefinedTask={setPredefinedTask}
                              handleTask={handleTask}
                              predefinedTaskList={predefinedTaskList}
                              subcategory={subcategory}
                              errors={errors}
                              onCancel={onEditCancel}/>
          <PredefinedTask predefinedTaskRecords={predefinedTaskRecords}
                          predefinedTaskDetails={predefinedTaskDetails}
                          handleEditModal={handleEditModal}/>
        </div>
    )
};
export default TaskTab;
