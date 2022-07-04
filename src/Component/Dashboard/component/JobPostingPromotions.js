import React, {useState, useEffect} from 'react';
import {Button, Popconfirm, Table} from "antd";
import moment from "moment";
import {getJobpostpromotion, getJobpostpromotionUser} from '../../../utils/_data'

const JobPostingPromotions=(props)=>{

    const [jobpostuser,setJobpostuser]=useState([])
    const [expandedIteratorRowKey, setIteratorKey] = useState([]);
const [jobpromotion,setjobpromotion]=useState([])
    const [promotionUser,setpromotion]=useState([])
    const [jobpostpromotion,setJobpostpromotion]=useState([])

    const batchFetchData = async (expanded, record) => {
        if(expandedIteratorRowKey[0]===record._id){
            setIteratorKey([])
        }else {
            setJobpostuser(record.JobPostingId.taskRequire);
            setIteratorKey([record._id])
            const resultUser = await getJobpostpromotionUser({email: record.Useremail})
            if (resultUser.success) {
                setpromotion(resultUser.data.data)
            }
        }
    };


    const getJobpostpromotions = async () => {
        const response = await getJobpostpromotion();
        if (response && response.data) {
            setJobpostpromotion(response.data.data || []);
        } else {
            console.log(response.msg);
        }
    };
    useEffect(()=>{
        getJobpostpromotions()
    },[])

useEffect(()=>{
    const array=[]
    jobpostpromotion.map((item)=>(array.push({...item,key:item._id})))
    setjobpromotion(array)
},[jobpostpromotion])
    const expandedRowRender = () => {
        const batchColumns = [
            {title: 'numOfTask', dataIndex: 'numOfTask', key: 'numOfTask'},
            {title: 'taskCategory', dataIndex: 'taskCategory', key: '',
                render: (record, i) => {
                    return (
                        <div>{record.name}</div>
                    )
                }},
            {title: 'taskSubCategory', dataIndex: 'taskSubCategory', key: '',
                render: (record, i) => {
                    return (
                        <div>{record.name}</div>
                    )
                }},

        ];

        const UserColumns = [
            {title: 'Promotin User id', dataIndex: '_id', key: '_id'},
            {title: 'first Name', dataIndex: 'firstName', key: 'firstName'},
            {title: 'last Name', dataIndex: 'lastName', key: 'lastName'},
            {title: 'Email', dataIndex: 'email', key: 'email'}

        ];

        return <div className="col-sm-12 col-md-12">
            <Table
                columns={batchColumns}
                dataSource={jobpostuser}
                pagination={jobpostuser.length > 10 ? true : false}
                showHeader={true}/>
            <h2 className={'mt-4'}>User Promotion List</h2>
            <Table
                columns={UserColumns}
                dataSource={promotionUser}
                pagination={promotionUser.length > 10 ? true : false}
                showHeader={true}/>
        </div>;
    };

    const columns = [
        {title: 'job ID', dataIndex: 'JobPostingId', key: 'JobPostingId',
            render: (record, i) => {
                return (
                    <div>{record._id}</div>
                )
            }}, ,
        {title: 'job Title', dataIndex: 'JobPostingId', key: 'JobPostingId',
            render: (record, i) => {
                return (
                    <div>{record.jobTitle}</div>
                )
            }},
        {title: 'job Created Date', dataIndex: 'JobPostingId', key: 'JobPostingId',
            render: (record) =>(
                <p>{moment(record.createdAt).format("DD/MM/YYYY")}</p>
            )
        }]
    return(<>
        <div className="row taskEngagement mt-2">
            <div className="col-sm-12 col-md-12">
                <Table
                    columns={columns}
                    dataSource={jobpromotion}
                    pagination={jobpromotion.length > 10 ? true : false}
                    expandable={{
                        expandedRowRender,
                        onExpand: batchFetchData,
                        expandedRowKeys: expandedIteratorRowKey
                    }}
                />
            </div>
        </div>
    </>)
}

export default JobPostingPromotions;