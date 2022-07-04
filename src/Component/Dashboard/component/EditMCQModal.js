import React, {useEffect,useState} from "react";
import cloneDeep from "lodash.clonedeep";
import {Modal} from "antd";
import CKEditor from "../../Common/CKEditor";
import {postMcqQuestion} from "../../../utils/_data"
import '../../Common/MCQmodal.scss'
import {toastError, toastSuccess} from "../../../utils/common";
import {useParams} from 'react-router-dom'

const mcqAnswer = {
    "MultipleChoiceAnswerText": "",
    "IsCorrectAnswer": false,
    "AnswerKeyText": null,
    "multiChoiceAnswerId": null
};

const EditMCQModal = props => {
    const {isModal, testDetails, isNew,handleModal,getRendomTest,testId} = props;
    const [questions, setQuestions] = useState((testDetails && testDetails.MultipleChoiceQuestion) || []);
    const [isDisabled, setDisabled] = useState(false);
    const params=useParams()

    useEffect(() =>{

        if(isNew) addMoreMcq();
    }, []);

    const addMoreMcq = () => {
        const updatedQuestions =  cloneDeep(questions);
        const cloneQuestion = {
            Question: "",
            answers: [
                {...mcqAnswer},
                {...mcqAnswer},
                {...mcqAnswer},
                {...mcqAnswer},
                {...mcqAnswer}
            ],
        };
        updatedQuestions.push(cloneQuestion);
        setQuestions(updatedQuestions);
    };


    const handleSave = async () => {
        const updatedQuestions = cloneDeep(questions);
        updatedQuestions.forEach(que => {
            que.error = ""
        });
        let isErr = false;
        updatedQuestions && updatedQuestions.map((item) => {
            if (!item.question) {
                item.error = validate("Question", item.Question);
                return item;
            } else if (!item.answers.some(val => val.IsCorrectAnswer === true)) {
                item.error = "Please choose one correct answer";
            } else {
                item.error = ""
            }
            return (
                item.answers.every((name) => {
                    if (item.error) return false;
                    item.error = validate("MultipleChoiceAnswerText", name.MultipleChoiceAnswerText);
                    return true
                }))
        });
        updatedQuestions.every(item => {
            if (item.error) {
                isErr = true;
                return false
            }
            return true
        });

        if(!isErr){
         const response=  await postMcqQuestion(testId,questions)
            if (response) {
                toastSuccess("sucessfull Mcq question add");
                handleModal()
                getRendomTest()
            } else {
                toastError("something worrong");
            }
        }
    }

    const validate = (name, value) => {
        switch (name) {
            case 'Question':
                if (!value) {
                    return 'Question is required';
                } else {
                    return '';
                }
            case 'MultipleChoiceAnswerText':
                if (!value) {
                    return 'Please choose one answer text';
                } else {
                    return '';
                }
            case 'IsCorrectAnswer':
                if (!value) {
                    return 'Please choose one correct answer';
                } else {
                    return '';
                }
            default: {
                return ''
            }
        }
    };

    const onChange = (e, queIndex, name, index) => {
        try {
            const updatedQuestions =  cloneDeep(questions);
            if (name === "Question") {
                updatedQuestions[queIndex].Question = e;
            } else {
                const {name, type, value, checked} = e.target;
                // if (name === "correct_answer") {
                //     updatedQuestions[queIndex].answers.forEach((ele) => (
                //         ele.correct_answer = false
                //     ));
                // }
                updatedQuestions[queIndex].answers[index] = {
                    ...updatedQuestions[queIndex].answers[index],
                    [name]: type === "checkbox" ? checked : value
                }
            }
            setQuestions(updatedQuestions);
        } catch (e) {
            console.log(e);
        }
    };


    const onRemove = (index) => {
        if (questions.length === 1) {
            alert("At least one question is required...!");
            return true;
        }
        if (window.confirm("Are you sure? You want to delete this question.?")) {
            const updatedQuestions =  cloneDeep(questions);
            updatedQuestions.splice(index, 1);
            setQuestions(updatedQuestions);
        }
    };

    const renderAddMCQBtn = () => (
    <div className="text-right">
        <button className="btn btn-success btn-rounded btn-sm mb-2" onClick={addMoreMcq}>Add new MCQ</button>
        <button className="btn btn-success btn-rounded btn-sm mb-2 ml-1" disabled={isDisabled} onClick={handleSave}>Save & Close</button>
    </div>
    );

    const options = ['A', 'B', 'C', 'D', 'E'];
    return (
    <Modal visible={isModal} onCancel={handleModal} onOk={handleSave}>
        <div className="modal-body create-test-modal">

            <div className="form mt-4 question-content">

                    {
                    questions.map((item, queIndex) => (
                        <div key={queIndex}>
                            <div className="form-group">
                                <div className="trash_div" style={{display:'flex',justifyContent:'space-between'}}>

                                        <label className="h4"><b>{queIndex + 1}. Question</b></label>&nbsp;&nbsp;

                                    <a onClick={() => onRemove(queIndex)}>
                                        <i className="fa fa-trash-o text-danger mr-3" style={{fontSize: 20}}/>
                                    </a>
                                </div>
                                <div className="inActive">
                                    <CKEditor data={item.Question}
                                              onChange={(e) => onChange(e.editor.getData(), queIndex, "Question")}/>
                                </div>
                            </div>
                            {
                                item.answers && item.answers.map((option, index) => (
                                    <div key={index} style={{position: "relative"}}
                                         className={`form-group ${option.IsCorrectAnswer && 'text-success'}`} style={{marginTop:'10px'}}>
                                        <div className="d-flex justify-content-between">
                                            <label className="col-form-label" style={{width:'100px'}}><b>Option {options[index]}</b></label>
                                            <label className="container m-0">
                                                <input type="checkbox"
                                                       style={{position: "absolute", right: 13,marginTop:'10px',fontSize: 15}}
                                                       name="IsCorrectAnswer"
                                                       disabled={item.isPartOfMCQBank}
                                                       onChange={(e) => onChange(e, queIndex, null, index)}
                                                       checked={option.IsCorrectAnswer}/>
                                                <span className="checkmark text-success"/>
                                            </label>
                                        </div>
                                        <textarea name="MultipleChoiceAnswerText"
                                                  disabled={item.isPartOfMCQBank}
                                                  value={option.MultipleChoiceAnswerText || ""}
                                                  onChange={(e) => onChange(e, queIndex, null, index)}
                                                  className={`form-control ${option.IsCorrectAnswer && 'text-success border border-success'}`} style={{marginTop:'10px',fontSize: 15}}/>
                                        <small className="text-danger">{option.IsCorrectAnswer || ""}</small>
                                        <div className="form-group" style={{marginTop: 0}}>
                                            <label className="col-form-label"><b>Reason(optional)</b></label>
                                            <textarea name="AnswerKeyText"
                                                      disabled={item.isPartOfMCQBank}
                                                      onChange={(e) => onChange(e, queIndex, null, index)}
                                                      value={option.AnswerKeyText || ""} className={`form-control ${option.IsCorrectAnswer && 'text-success border border-success'}`}
                                                      style={{width: "100%",marginTop:'10px',fontSize: 15}}/>
                                        </div>
                                    </div>
                                ))
                            }
                            <button className="btn btn-success btn-rounded btn-sm mb-2" onClick={addMoreMcq} style={{padding:'5px'}}>Add new MCQ</button>
                            <p className="text-danger">{item.error || ""}</p>
                            <hr className="my-3"/>
                        </div>
                    ))
                }
            </div>
        </div>
        {/*<div className="modal-footer">*/}
        {/*    <button className="btn btn-success btn-sm mb-2" disabled={isDisabled} onClick={handleSave}>Save</button>*/}
        {/*</div>*/}
    </Modal>
    )

}

export default EditMCQModal