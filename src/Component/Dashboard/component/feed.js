import React, {useEffect, useState} from 'react';
import {Button, Input, Modal, Table, Card} from "antd";
import moment from "moment";
import { EditOutlined } from '@ant-design/icons';
import Loader from "../../Common/Loader";
import {activeFeed, createFeed, deleteFeed, getAllFeed, updateFeed} from "../../../utils/_data";
import {toastError, toastSuccess} from "../../../utils/common";
const {TextArea} = Input;

const Feed = (props) => {

    const [feedDetail, setFeedDetail] = useState({
        feedTitle : '',
        feedContentSummary : '',
        feedImageUrl : '',
        feedLinkUrl : ''
    });
    const [feed, setFeed] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditable, setIsEditable] = useState(false)
    const [feedErrors, setValidation] = useState({});
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsEditable(false);
    };

    const resetForm = () => {
        setFeedDetail({});
        setValidation({});
    };

    const validation = (name, value) => {
        switch (name) {
            case 'feedTitle':
                if (!value) {
                    return "'Please input feedTitle!'"
                } else {
                    return '';
                }
            case 'feedContentSummary':
                if (!value) {
                    return "'Please input feedContentSummary!'"
                } else {
                    return '';
                }
            case 'feedImageUrl':
                if (!value) {
                    return "'Please input feedImageUrl!'"
                } else {
                    return '';
                }
            case 'feedLinkUrl':
                if (!value) {
                    return "'Please input feedLinkUrl!'"
                } else {
                    return '';
                }
            default: {
                return null;
            }
        }
    };

    const getFeed = async () => {
        setLoading(true)
        const response = await getAllFeed();
        if(response && response.data){
            setFeed(response.data.data);
            setLoading(false)
        }else{
            toastError("Something went wrong");
            setLoading(false)

        }
    };
    useEffect(()=>{
        getFeed()
    },[])

    const handleOk = async () => {
        let allErrors = {};

        const userData = {
            feedTitle: feedDetail.feedTitle,
            feedContentSummary: feedDetail.feedContentSummary,
            feedImageUrl: feedDetail.feedImageUrl,
            feedLinkUrl: feedDetail.feedLinkUrl,
        };

        Object.keys(feedDetail).forEach(key => {
            const error = validation(key, userData[key])
            if (error && error.length) {
                allErrors[key] = error
            }
        });
        if (Object.keys(allErrors).length) {
            return setValidation(allErrors)
        } else {
            if(feedDetail._id){
                const res = await updateFeed(feedDetail);
                if (res?.success) {
                    console.log("success------>>>");
                } else {
                    console.log("error------>>>");
                }
            }else {
                const res = await createFeed(feedDetail);
                if (res?.data?.success) {
                    console.log("success------>>>");
                } else {
                    console.log("error------>>>");
                }
            }
            await getFeed();
            setIsModalVisible(false);
            resetForm()
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFeedDetail({...feedDetail, [name]: value})
    };

    const onEdit = (item) => {
        setIsEditable(true);
        setIsModalVisible(true);
        setFeedDetail(item)
    };

    const activeTask = async (record) => {
        if (window.confirm("Are you want to active this session ?")){
            const res = await activeFeed(record._id);
            if (res && res.success){
                await getFeed();
                toastSuccess("Successfully Active session");
            } else {
                toastError("Something went wrong");
            }
        }
    };

    const deActiveTask = async (record) => {
        if (window.confirm("Are you want to delete this session ?")){
            const res = await deleteFeed(record._id);
            if (res && res.success){
                await getFeed();
                toastSuccess("Successfully disActive session");
            } else {
                toastError("Something went wrong");
            }
        }
    };
    if (loading) return <Loader/>;

    return (
        <>
            <div className="row taskEngagement mt-2">
                <Button type="primary" onClick={showModal} className="ml-auto mr-5 mb-3">New Feed</Button>
                <div className="col-sm-12 col-md-12">
                <div className="row add-task" style={{flexDirection: "column", gap: '30px', alignItems: "center"}}>
                    {
                        feed && feed.length ? feed.map((item, i) =>(
                            <div className="col-sm-12 col-xs-12 col-md-5" key={i}>
                            <Card
                                title={item?.feedContentSummary}
                                extra={<div>
                                    <EditOutlined key="edit" style={{marginRight: "40px"}} onClick={()=>onEdit(item)}/>
                                    <button disabled={item.isActive} className="btn btn-success add-task-btn mr-5" onClick={() => activeTask(item)}>
                                        Active
                                    </button>
                                    <button disabled={!item.isActive} className="btn btn-danger add-task-btn mr-5" onClick={() => deActiveTask(item)}>
                                        DeActive
                                    </button>
                                </div>}
                                cover={
                                    <img
                                        style={{height: 300}}
                                        alt="example"
                                        src={item?.feedImageUrl}
                                        // src='https://s3.amazonaws.com/klockerimg/KB/Joins+in+SQL.jpg'
                                    />
                                }
                            >
                                <div>
                                    <h2>{item?.feedTitle}</h2>
                                    <span>Created At : {moment(item?.createdAt).format("MMMM DD YYYY")}</span><br/>
                                    <span>Link Url : {item?.feedLinkUrl}</span>
                                </div>
                            </Card>
                            </div>
                        )) : <div className=" col-sm-12 col-md-12"><h4 className="text-center">Records not found</h4></div>
                    }
                </div>
                </div>
            </div>
            <Modal title={`${isEditable ? 'Edit Feed' : "Add Feed"}`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                   maskClosable={false}>
                <p className="font-weight-bold">Feed Title</p>
                <Input name="feedTitle" value={feedDetail?.feedTitle} onChange={handleChange}/>
                <p className="text-danger">{feedErrors.feedTitle || ""}</p>
                <p className="mt-3 font-weight-bold">Feed Content Summary</p>
                <TextArea rows={4} name="feedContentSummary" value={feedDetail?.feedContentSummary} onChange={handleChange}/>
                <p className="text-danger">{feedErrors.feedContentSummary || ""}</p>
                <p className="font-weight-bold">Feed Image URL</p>
                <Input name="feedImageUrl" value={feedDetail?.feedImageUrl} onChange={handleChange}/>
                <p className="text-danger">{feedErrors.feedImageUrl || ""}</p>
                <p className="font-weight-bold">Feed Link URL</p>
                <Input name="feedLinkUrl" value={feedDetail?.feedLinkUrl} onChange={handleChange}/>
                <p className="text-danger">{feedErrors.feedLinkUrl || ""}</p>
            </Modal>
        </>
    )
};

export default Feed;
