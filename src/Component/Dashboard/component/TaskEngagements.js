import React, {useEffect, useState} from 'react';
import {Table} from "antd";
import moment from "moment";
import {getAllTaskEngagement} from "../../../utils/_data";
import {toastError} from "../../../utils/common";
import Loader from "../../Common/Loader";

const TaskEngagements = (props) =>{
    const [taskEngagement, setTaskEngagement] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllTaskEngage = async () =>{
        setLoading(true)
        const res = await getAllTaskEngagement();
        if (res && res.data && res.data.success){
            setTaskEngagement(res && res.data && res.data.result);
            setLoading(false)

        } else {
            toastError("Something went wrong");
            setLoading(false)

        }
    };
    useEffect(()=>{
        getAllTaskEngage()
    },[])
    const columns = [
        {title: 'TaskEngagement Id', dataIndex: 'id', key: 'id'},
        {
            title: 'Image',
            dataIndex: '',
            key: '',
            render: (record, i) => {
                return (
                    <img alt="" className="taskIcon" src={record.image} />
                )
            },
        },
        {title: 'Task Title', dataIndex: 'title', key: 'title'},
        {title: 'MentorEmail', dataIndex: 'mentorEmail', key: 'mentorEmail'},
        {title: 'MenteeEmail', dataIndex: 'menteeEmail', key: 'menteeEmail'},
        {title: 'Date Engaged', dataIndex: 'date', key: 'date',
            render: (record) =>(
                <p>{moment(record.date).format("DD/MM/YYYY")}</p>
            )
        },
        {title: 'Status', dataIndex: 'status', key: 'status',
            sorter: (a, b) => {return a.status.localeCompare(b.status)},
            render: (record) =>(
                <p className={`${(record === "completed")? 'text-success' : 'text-primary'} ${record === "started" && 'text-dark'}`}>{record}</p>
            )
        }
    ];
    const data = [];
    taskEngagement && taskEngagement.length && taskEngagement.forEach((item, i) => {
        data.push({
            key: i + 1,
            id: item._id,
            image: item && item.task && item.task.imageUrl,
            title: item && item.task && item.task.name,
            status: item && item.status,
            date: item.startDate,
            menteeEmail: item && item.user && item.user.email,
            mentorEmail: item && item.mentor && item.mentor.user && item.mentor.user.email
        })
    });
    if (loading) return <Loader/>;

    return (
        <div className="row taskEngagement mt-2">
            <div className="col-sm-12 col-md-12">
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{pageSize: 25}}
                />
            </div>
        </div>
    )
};
export default TaskEngagements;
