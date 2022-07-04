import React, {useEffect, useState} from "react";
import { Tabs } from 'antd';
import UsersTab from "./component/UsesTab";
import MentorTab from "./component/MentorTab";
import {
    getAllActiveUsers,
} from "../../utils/_data";
import "./Dashboard.scss";
import {toastError} from "../../utils/common";
import Loader from "../Common/Loader";
import TaskTab from "./component/TaskTab";
import TaskEngagements from "./component/TaskEngagements";
import Sessions from "./component/Sessions";
import Instructors from "./component/Instructors";
import Feed from "./component/feed";
import MicroCourse from "./component/Micro_Course";
import Blog from "./component/Blog";
import JobPosting from "./component/jobPosting";
import ManageCategory from "./component/ManageCategory";
import CodeCast from "./component/codeCast";
import ExportGuidance from "./component/exportGuidance";
import ExportGuidanceSubscriber from "./component/exportGuidanceSubscribers";
import JobPostingPromotions from "./component/JobPostingPromotions";
import Test from "./component/Test";

const { TabPane } = Tabs;

const Dashboard = (props) =>{
    const [userActive, setUserActive] = useState([]);
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState([])
    const [jobPost, setJobPost] = useState([])
    useEffect(() =>{
        console.log('props',props)

        getAllActiveDetails();
    },[]);


    const getAllActiveDetails = async () =>{
        setLoading(true);
        const response = await  getAllActiveUsers();
        if (response && response.success) {
            setUserActive(response.data);
            setLoading(false);
        } else {
            toastError("Something went wrong");
            setLoading(false);
        }
    };
    const handleChange = (key) =>{
        console.log('props',props)
        props.history.push(`/${key}`)   // < == router router v4
        // getAllActiveDetails();
    };
    return(
        <div className={`${process.env.REACT_APP_ENV === ('development') && 'main_div'} dashboard container-fluid`}>
            <Tabs defaultActiveKey={props?.history?.location?.pathname.split('/')[1]} onChange={key =>handleChange(key)}>
                <TabPane tab="Users" key="Users">
                    { loading ? <Loader/> : <UsersTab userActive={userActive} getAllActiveDetails={getAllActiveDetails}/>}
                </TabPane>
                <TabPane tab="Mentors" key="Mentors">
                     <MentorTab/>
                </TabPane>
                <TabPane tab="Tasks" key="Tasks"><TaskTab  />
                </TabPane>
                <TabPane tab="Task Engagements" key="TaskEngagements">
                    <TaskEngagements />
                </TabPane>

                <TabPane tab="Sessions" key="Sessions">
                     <Sessions />
                </TabPane>

                <TabPane tab="Feed" key="Feed">
                     <Feed />
                </TabPane>

                <TabPane tab="Instructors" key="Instructors">
                     <Instructors/>
                </TabPane>

                <TabPane tab="Blogs" key="Blogs">
                     <Blog />
                </TabPane>
                <TabPane tab="Job Posting" key="JobPosting">
                     <JobPosting />
                </TabPane>
                <TabPane tab="Manage Category" key="ManageCategory">
                     <ManageCategory />
                </TabPane>
                <TabPane tab="Code Cast" key="CodeCast">
                     <CodeCast />
                </TabPane>

                <TabPane tab="Expert Guidance" key="ExpertGuidance">
                     <ExportGuidance />
                </TabPane>

                <TabPane tab="ExpertGuidance Subscribers" key="ExpertGuidanceSubscribers">
                     <ExportGuidanceSubscriber />
                </TabPane>

                <TabPane tab="MCQTests" key="MCQTests">
                <Test />
                </TabPane>

                <TabPane tab="MicroCourse" key="MicroCourse">
                    <MicroCourse />
                </TabPane>

                <TabPane tab='Job Posting Promotions users' key="JobPostingPromotions">
                    <JobPostingPromotions  />
                </TabPane>
            </Tabs>
        </div>
    )
};
export default Dashboard;
