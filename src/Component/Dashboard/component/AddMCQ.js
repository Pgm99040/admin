import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {getRendomTest} from "../../../utils/_data"
import {toastError} from "../../../utils/common";
import cloneDeep from "lodash.clonedeep";
import EditMCQModal from "./EditMCQModal";
import Dashboard from "../index";
import {Tooltip} from "antd";


const initialState = {
    fields: {
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: '',
    },
    errors: {
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: '',
    },
};

class AddMCQ extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ...initialState,
            addTest: {
                testName: "",
                testId: "",
                MCQQuestions: [],
            },
            testDetails:{},
            isLoading:true,
            editMCQModal:false,
            startIndex: 0,
            pages:0,
            currentPage: 1,
            endIndex: 3,
        }
    }

    getRendomTest=async ()=>{
        // const testId = (this.props.history.location && this.props.history.location.pathname.split('/')[2]) || '';
        const response= await getRendomTest(this.props.testId)
        console.log("respons",response)
        if (response) {
            this.setState({isLoading: false});
            this.setState({testDetails: response.data[0],pages: (response.data[0].MultipleChoiceQuestion && Math.ceil(response.data[0].MultipleChoiceQuestion.length / 3)) || 0,})
        } else {
            this.setState({isLoading: false});
        }
    }

    componentDidMount= ()=> {
       // console.log("props",this.props.history)
       //  const testId = (this.props.history.location && this.props.history.location.pathname.split('/')[2]) || '';
       //  console.log("testId",testId)
        if(this.props.testId) {
            this.getRendomTest()
        }
    }

    handleEditMCQModal = () => {
        if (!this.state.editMCQModal) {
            this.setState({
                editMCQModal: !this.state.editMCQModal,
                addTest: {
                    ...this.state.addTest,
                    MCQQuestions: [],
                },
                ...initialState,
            })
        } else {
            this.setState({
                editMCQModal: !this.state.editMCQModal,
                ...initialState,
            })
        }
    };

    pagination = (currentPage) => {
        const startIndex = currentPage * 3 - 3;
        const endIndex = currentPage * 3;
        this.setState({
            startIndex,
            currentPage,
            endIndex,
        })
    };

    handleEditMCQModal = () => {
        if (!this.state.editMCQModal) {
            this.setState({
                editMCQModal: !this.state.editMCQModal,
                addTest: {
                    ...this.state.addTest,
                    MCQCount: "",
                    MCQQuestions: [],
                },
                ...initialState,
            })
        } else {
            this.setState({
                editMCQModal: !this.state.editMCQModal,
                ...initialState,
            })
        }
    };


    handleDataModal = () => {
        this.setState({ editMCQModal: false})
    };

    render(){
        const queCount = ['A', 'B', 'C', 'D', 'E', 'F'];
        const pageContents = [];
        for (let i = 0; i < this.state.pages; i++) {
            pageContents.push(<li key={i} className={i === this.state.currentPage - 1 ? 'active' : ''}
                                  onClick={() => this.pagination(i + 1)}>{i + 1}</li>)
        }
        return <>
            {/*<Dashboard/>*/}
            {this.state.editMCQModal && (
                <EditMCQModal
                    isModal={this.state.editMCQModal}
                    testDetails={cloneDeep(this.state.testDetails)}
                    isNew={!((this.state.testDetails && this.state.testDetails.MultipleChoiceQuestion) || []).length}
                    handleModal={this.handleDataModal}
                    getRendomTest={this.getRendomTest}
                    testId={this.props.testId}
                />
            )}
            <div className="test-details mb-5 mt-4">
                <div className="all-test-content">
                    <div className='row test-details-content'>
                        <div className='col-sm-12 col-md-12 col-xs-12 mb-3' style={{fontSize:"20px"}} onClick={this.props.onHanderTestId}>
                            <Link className="mr-3 text-secondary" title="View Details"><i
                                className="fa fa-angle-left"/> Back</Link>
                        </div>
                        <div className="col-sm-7 col-md-8 col-xs-12">
                            <div className='row' style={{justifyContent:"center"}} >
                                <div className="col-sm-10 col-md-8 col-xs-12">
                                    <div className="test-title"><h2 className='text-dark'>{this.state.testDetails.TestName}</h2></div>
                                    <div className="test-description text-muted" style={{fontSize:"15px"}}>{this.state.testDetails.TestName} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-sm-12 col-md-12 col-xs-12 mt-3'>
                <div className="card">
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-md-8 col-sm-12 col-xs-12'>
                                <div className="mb-1 text-muted"><small style={{fontSize:"15px"}}>#MCQTEST</small></div>
                            </div>
                            <div className='col-md-4 col-sm-12 col-xs-12 text-right d-flex justify-content-end'>
                                {/*<a className="mr-3 text-secondary">Change MCQ</a>*/}

                                        <a className="mr-3 text-primary" style={{fontSize:"15px"}} onClick={this.handleEditMCQModal}>Add questions to
                                            test</a>

                                <Tooltip placement="topRight" color="#fff" title={<p className="text-dark">You can add or edit the MCQ questions list</p>}>
                                    <h6 className="ml-2"style={{fontSize:"15px"}}><i className="fa fa-question-circle-o text-secondary font-weight-bold fs-2" aria-hidden="true"/></h6>
                                </Tooltip>
                            </div>
                            {console.log(this.state.testDetails)}
                            <div className="card-text text-muted" style={{width:"50%",paddingLeft:'30px',marginTop:'10px'}}>
                                {this.state?.testDetails? this.state?.testDetails?.MultipleChoiceQuestion?.map((que, i) => (
                                    <div key={i} className="question-container">

                                            <span
                                                className="questionIndex rounded-circle" style={{fontSize:"15px",border:'2px solid black',padding:"4px"}}><b>{this.state.startIndex + i + 1}</b></span>

                                        <div>
                                            <p style={{fontSize:"15px"}} dangerouslySetInnerHTML={{__html: que.Question}}
                                               className="question-pragraph"/>
                                            <ul>
                                                {que.answers.map((ans, j) => (
                                                    <li key={j}
                                                        className={ans["IsCorrectAnswer"] ? 'text-success font-weight-bold' : ''} style={{fontSize:"15px"}}>
                                                        <span>{queCount[j]}.</span> {ans.MultipleChoiceAnswerText} {ans.AnswerKeyText && <span>(Reason : {ans.AnswerKeyText})</span>}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )):<span style={{fontSize:"15px"}}>No Question Found</span>}
                                <ul className='text-right pages' style={{fontSize:"15px"}}>{pageContents.map(x => x)}</ul>
                                {this.state?.testDetails?.MultipleChoiceQuestion?.length>=1?'' :<span style={{fontSize:"15px"}}>No Question Found</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    }
}

export default AddMCQ