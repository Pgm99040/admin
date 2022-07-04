import React, {useEffect, useState} from 'react';
import {Table} from "antd";
import {getAllExportGuidanceSubscriber} from "../../../utils/_data";
import Loader from "../../Common/Loader";

const ExportGuidanceSubscriber = (props) => {

    const [exportguidancesubscriber,setexportguidancesubscriber]=useState([])
    const [exportGuidanceSubscriber, setExportGuidanceSubscriber] = useState([]);
    const [expandedIteratorRowKey, setIteratorKey] = useState([]);
    const [jobpromotion,setjobpromotion]=useState([])
    const [loading, setLoading] = useState(false);

    const batchFetchData = async (expanded, record) => {
        if(expandedIteratorRowKey[0]===record._id){
            setIteratorKey([])
        }else {
            setjobpromotion([record.exportGuidanceId]);
            setIteratorKey([record._id])
        }
    };

    const getExportGuidanceSubscriber = async () => {
        setLoading(true)

        const response = await getAllExportGuidanceSubscriber();
        if (response && response.data) {
            setExportGuidanceSubscriber(response.data.data || []);
            setLoading(false)

        } else {
            console.log(response.msg);
            setLoading(false)

        }
    };
    useEffect(()=>{
        getExportGuidanceSubscriber()
    },[])

    useEffect(() => {
        const array=[]
        exportGuidanceSubscriber.map((item)=>(array.push({...item,key:item._id})))
        setexportguidancesubscriber(array)
    }, [exportGuidanceSubscriber]);

    if (loading) return <Loader/>;

    const expandedRowRender = () => {
        const batchColumns = [
            {title: 'Id', dataIndex: '_id', key: '_id'},
            {title: 'exportGuidanceTitle', dataIndex: 'exportGuidanceTitle', key: ''},
            {title: 'exportGuidanceDescription', dataIndex: 'exportGuidanceDescription', key: '',
                render: (record) => {
                    return (
                        <p dangerouslySetInnerHTML={{__html: record || "-"}}></p>
                    )
                }},

        ];

        return <div className="col-sm-12 col-md-12">
            <Table
                columns={batchColumns}
                dataSource={jobpromotion}
                pagination={jobpromotion.length > 10 ? true : false}
                showHeader={true}/>
        </div>;
    };
    const columns = [
        {title: 'User Id', dataIndex: 'userId', key: 'userId'},
        {title: 'User Email', dataIndex: 'userEmail', key: 'userEmail'},
        {
            title: 'Export Guidance Id',
            dataIndex: 'exportGuidanceId',
            key: '',
            ellipsis: {showTitle: false},
            render: (record, i) => {
                return (
                    <div>{record?._id || ''}</div>
                )
            },
        },
        {
            title: 'Export Guidance Title',
            dataIndex: 'exportGuidanceId',
            key: '',
            ellipsis: {showTitle: false},
            render: (record, i) => {
                return (
                    <div>{record?.exportGuidanceTitle || ''}</div>
                )
            },
        },
        {title: 'Register Date', dataIndex: 'registerDate', key: 'registerDate'}
    ];

    return (
        <>
            <div className="row taskEngagement mt-2">
                <Table
                    columns={columns}
                    dataSource={exportguidancesubscriber}
                    pagination={exportguidancesubscriber.length > 10 ? true : false}
                    expandable={{
                        expandedRowRender,
                        onExpand: batchFetchData,
                        expandedRowKeys: expandedIteratorRowKey
                    }}
                />
            </div>
        </>
    )
};

export default ExportGuidanceSubscriber;
