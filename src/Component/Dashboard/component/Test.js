import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getAllTest, addTest, getAllCategoryList, getCategoryIdBySubcategory,getSelectDeleteMCQtest} from "../../../utils/_data"
import CreateTestModal from "./CreateTestModal";
import {getFromStorage, toastError, toastSuccess} from '../../../utils/common';
import Loader from "../../Common/Loader";
import AddMCQ from "./AddMCQ";
import '../../Common/Tests.scss'

class Test extends Component {
    state = {
        fields: {
            TestName: '',
            TestDescription: '',
            selectCetegory:'',
            subcategory:'',
            TestImg:''
        },
        errors: {
            TestName: '',
            TestDescription: '',
            selectCetegory:'',
            subcategory:'',
            TestImg:''
        },
        tests: [],
        isModal: false,
        questions: [],
        user: {},
        isLoading: false,
        testId:'',
        mcqTestId:'',
        subcategory:[],
        predefinedTaskList:[]
    };

    componentDidMount = async () => {
        await this.getTestList();
    };

    getTestList = async () => {
        this.setState({isLoading: true});
        const response = await getAllTest();
        if (response.success) {
            this.setState({isLoading: false});
            this.setState({tests: response.data})
        } else {
            toastError(response.msg);
            this.setState({isLoading: false});
        }
    };
    handleChangeTask=(e)=>{
        const {name,value}= e.target
        console.log(name,value)
        if(name==='selectCetegory'){
            this.getCategoryWithSubcategory(value)
        }
        this.setState({
            errors: {
                ...this.state.errors,
                [name]: this.validate(name, value),
            },
            fields: {
                ...this.state.fields,
                [name]: value,
            }
        });
    }

     getAllCategorysList = async () =>{
        const response = await getAllCategoryList();
        if (response && response.data && response.data.success) {
            this.setState({predefinedTaskList:response.data.result || []});
        } else {
            console.log(response.msg);
        }
    };

     getCategoryWithSubcategory = async (id) =>{
        const response = await getCategoryIdBySubcategory(id);
        if (response && response.data && response.data.success) {
            this.setState({subcategory:(response && response.data && response.data.result) || []})
        } else {
            console.log(response.msg);
        }
    };

    onChange = (e) => {
        this.setState({
            errors: {
                ...this.state.errors,
                [e.target.name]: this.validate(e.target.name, e.target.value),
            },
            fields: {
                ...this.state.fields,
                [e.target.name]: e.target.value,
            }
        });
    };

    validate = (name, value) => {
        switch (name) {
            case 'TestName':
                if (!value) {
                    return 'Test name is required';
                } else {
                    return '';
                }
            case 'TestDescription':
                if (!value) {
                    return 'Description is required';
                } else {
                    return '';
                }
            case 'selectCetegory':
                if (!value) {
                    return 'Description is selectCetegory';
                } else {
                    return '';
                }
            case 'subcategory':
                if (!value) {
                    return 'Description is subcategory';
                } else {
                    return '';
                }
            case 'TestImg':
                if (!value) {
                    return 'Description is test images';
                } else {
                    return '';
                }
            default: {
                return ''
            }
        }
    };

    onSave = async () => {
        const {fields, tests} = this.state;
        let validationErrors = {};
        Object.keys(this.state.fields).forEach(name => {
            const error = this.validate(name, fields[name]);
            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });
        if (Object.keys(validationErrors).length > 0) {
            this.setState({errors: validationErrors});
            return;
        }
        this.setState({isLoading: true});

        fields.TestName_URLEncoded = "MCQTest";
        fields.MCQCount = 0;
        fields.MCQQuestionsTimeLimit_Mins = 60;
        const response = await addTest(fields);
        if (response) {
            tests.push(fields);
            this.setState({
                tests,
                isLoading: false
            });
            this.handleModal();
            toastSuccess("Your test created successfully.");
            this.getTestList();
        } else {
            toastError("Something went wrong.");
            this.setState({isLoading: false});
            this.handleModal();
        }
    };

    handleModal = () => {
        this.getAllCategorysList()
        this.setState({
            isModal: !this.state.isModal,
            fields: {
                TestName: '',
                TestDescription: '',
                selectCetegory:'',
                subcategory:'',
                TestImg:''
            }
        })
    };

    onSettestId=(TestId)=>{
        console.log("TestId----------------------->", TestId)
        this.setState({mcqTestId:TestId})
    }
    onHanderTestId=()=>{
        this.setState({mcqTestId:''})
    }

    onRemove=async (id)=>{
        const data=await getSelectDeleteMCQtest(id);
        console.log(data)
        if(data.success){
            toastSuccess("sucessfull test deleted");
            this.getTestList()
        }else {
            toastError("something worrong");
        }
    }

    render() {
        const {tests, isModal, isLoading, mcqTestId} = this.state;
        const company_name = getFromStorage('company_name');

        if (isLoading) return <Loader/>;
        return (
            <>
           {mcqTestId===''? <div className="tests">
                <CreateTestModal isModal={isModal} state={this.state} onChange={this.onChange} onSave={this.onSave}
                                 handleModal={this.handleModal} predefinedTaskList={this.state.predefinedTaskList} handleChangeTask={this.handleChangeTask}
                                 subcategory={this.state.subcategory}/>
                <div className='row'>
                    <div className="col-md-4 col-sm-12 col-xs-12 mt-4">
                        <h5 className="text-left">Tests({tests.length})</h5>
                    </div>
                    <div className="col-md-8 col-sm-12 col-xs-12 mt-4 text-right">
                        <button type="button" className='btn btn-success btn-sm btn-rounded'
                                onClick={this.handleModal}>Create Test
                        </button>
                    </div>
                    {
                        tests && tests.length && tests.map((test, key) => {
                            return(
                                <div key={key} className="col-md-4 col-sm-12 col-xs-12" style={{cursor: "pointer"}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div>
                                                <h5 className="card-title" style={{display:'flex',justifyContent:'space-between'}}>{test.TestName} <a onClick={() => this.onRemove(test._id)}>
                                                    <i className="fa fa-trash-o text-danger mr-3" style={{fontSize: 20}}/>
                                                </a></h5>

                                                {/*<h6 className="card-subtitle mb-2 text-muted">{test.mQCount || 0} MCQ, {test.cQCount || 0} Tests</h6>*/}
                                                <p className="card-text text-muted">{test.TestDescription} </p>
                                            </div>
                                            {console.log("test?.TestId",test?.TestId)}
                                            <div className="hover-active text-center text-white" onClick={()=>(this.onSettestId(test?.TestId))}>
                                                <Link
                                                    className="mr-3 text-white" title="View Details"><i
                                                    className="fas fa-eye"/></Link>
                                            </div>
                                            <div><p className="job-role">React Developer</p></div>
                                        </div>
                                    </div>
                                </div>)})
                    }
                </div>
            </div>:<AddMCQ testId={this.state.mcqTestId} onHanderTestId={this.onHanderTestId}/>}
            </>
        );
    }
}

export default Test;
