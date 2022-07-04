import React, {useState, useEffect} from 'react';
import {Button, Input, Modal, Card} from "antd";
import CKEditor from "../../Common/CKEditor";
import {createExportGuidance, getAllExportGuidance, updateExportGuidance} from "../../../utils/_data";
import {EditOutlined} from "@ant-design/icons";
import Loader from "../../Common/Loader";

const ExportGuidance = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditable, setIsEditable] = useState(false)
    const [exportGuidance, setExportGuidance] = useState([]);
    const [exportGuidanceDetail, setExportGuidanceDetail] = useState({
        exportGuidanceTitle: '',
        exportGuidanceDescription: '',
        exportGuidanceImageUrl: ''
    });
    const [exportGuidanceErrors, setValidation] = useState({});
    const [loading, setLoading] = useState(false);


    const getExportGuidance = async () => {
        setLoading(true)
        const response = await getAllExportGuidance();
        if (response && response.data) {
            setExportGuidance(response.data.data || []);
            setLoading(false)
        } else {
            console.log(response.msg);
            setLoading(false)
        }
    };

    useEffect(()=>{
        getExportGuidance()
    },[])
    const showModal = () => {
        setIsModalVisible(true);
    };

    const resetForm = () => {
        setExportGuidanceDetail({});
        setValidation({})
    };

    const handleCancel = () => {
        resetForm();
        setIsModalVisible(false);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setExportGuidanceDetail({...exportGuidanceDetail, [name]: value})
    };

    const blogHandleChangeEditor = (evt) => {
        setExportGuidanceDetail({...exportGuidanceDetail, [evt.editor.name]: evt.editor.getData()})
    };

    const validation = (name, value) => {
        switch (name) {
            case 'exportGuidanceTitle':
                if (!value) {
                    return "'Please input exportGuidanceTitle!'"
                } else {
                    return '';
                }
            case 'exportGuidanceDescription':
                if (!value) {
                    return "'Please input exportGuidanceDescription!'"
                } else {
                    return '';
                }
            case 'exportGuidanceImageUrl':
                if (!value) {
                    return "'Please input exportGuidanceImageUrl!'"
                } else {
                    return '';
                }
            default: {
                return null;
            }
        }
    };

    const handleOk = async () => {
        let allErrors = {};

        const userData = {
            exportGuidanceTitle: exportGuidanceDetail.exportGuidanceTitle,
            exportGuidanceDescription: exportGuidanceDetail.exportGuidanceDescription,
            exportGuidanceImageUrl: exportGuidanceDetail.exportGuidanceImageUrl
        };
        Object.keys(exportGuidanceDetail).forEach(key => {
            const error = validation(key, userData[key])
            if (error && error.length) {
                allErrors[key] = error
            }
        });
        if (Object.keys(allErrors).length) {
            return setValidation(allErrors)
        } else {
            if(exportGuidanceDetail._id){
                const res = await updateExportGuidance(exportGuidanceDetail);
                if (res?.success) {
                    console.log("success------>>>");
                } else {
                    console.log("error------>>>");
                }
            }else {
                const res = await createExportGuidance(exportGuidanceDetail);
                if (res?.data?.success) {
                    console.log("success------>>>");
                } else {
                    console.log("error------>>>");
                }
            }
            await getExportGuidance();
            setIsModalVisible(false);
            resetForm()
        }
    };

    const onEdit = async (item) => {
        setIsEditable(true);
        setIsModalVisible(true);
        setExportGuidanceDetail(item);
    };
    if (loading) return <Loader/>;

    return (
        <>
            <div className="row taskEngagement mt-2">
                <Button type="primary" onClick={showModal} className="ml-auto mr-5 mb-3">Create Export Guidance</Button>
            </div>
            <div className="container">
                {
                    exportGuidance && exportGuidance.map((item, index) => (
                        <div>
                            <div key={index}>
                                <div key={index}>
                                    <Card
                                        title={item?.exportGuidanceTitle}
                                        extra={<div>
                                            <EditOutlined key="edit" style={{marginRight: "40px"}}
                                                          onClick={() => onEdit(item)}/>
                                        </div>}
                                        style={{marginTop: "15px", marginBottom: "15px"}}>
                                        <div className="d-flex" style={{justifyContent: "center"}}>
                                            <div style={{width: "400px", height: "250px"}}>
                                                <img src={item?.exportGuidanceImageUrl} width={'100%'} height={"100%"}
                                                     alt={'image_logo'}/>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="d-flex" style={{justifyContent: "center"}}>
                                            <p><h2>{item?.exportGuidanceTitle}</h2></p>
                                        </div>
                                        <div className="d-flex" style={{justifyContent: "center"}}>
                                            <p>
                                                <div
                                                    dangerouslySetInnerHTML={{__html: item?.exportGuidanceDescription}}/>
                                            </p>
                                        </div>
                                        <div className="d-flex w-100"
                                             style={{direction: "row", gap: "10px", justifyContent: "center"}}>
                                            <div >
                                                <Button onClick={showModal}>Get Free Guidance</Button>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Modal title={`${isEditable ? 'edit Export Guidance' : "add Export Guidance"}`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                   maskClosable={false}>

                <p className="font-weight-bold">Export Guidance Title</p>
                <Input name="exportGuidanceTitle" value={exportGuidanceDetail?.exportGuidanceTitle}
                       onChange={handleChange}/>
                <p className="text-danger">{exportGuidanceErrors.exportGuidanceTitle || ""}</p>

                <p className="font-weight-bold">Export Guidance Image Url</p>
                <Input name="exportGuidanceImageUrl" value={exportGuidanceDetail?.exportGuidanceImageUrl}
                       onChange={handleChange}/>
                <p className="text-danger">{exportGuidanceErrors.exportGuidanceImageUrl || ""}</p>

                <p className="mt-3 font-weight-bold">Export Guidance Description</p>
                <CKEditor name="exportGuidanceDescription" data={exportGuidanceDetail?.exportGuidanceDescription}
                          onChange={blogHandleChangeEditor}/>
                <p className="text-danger">{exportGuidanceErrors.exportGuidanceDescription || ""}</p>
            </Modal>
        </>
    )
};

export default ExportGuidance;
