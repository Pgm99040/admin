import React, {useEffect, useState} from 'react';
import {Table} from "antd";
import moment from "moment";
import { Modal, Button, Input } from 'antd';
import {Form} from "react-bootstrap";
import {addInstructors, getInstructors} from "../../../utils/_data";
import {toastError} from "../../../utils/common";
import Loader from "../../Common/Loader";



const Instructors = (props) =>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [errors, setErrors] = useState({});
    const [instructors, setInstructors] = useState([])
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };



    const getInstructor = async () => {
        setLoading(true)
        const response = await getInstructors();
        console.log("response", response)
        if(response){
            setInstructors(response.data.data.instructor)
            setLoading(false);
        }else{
            toastError("Something went wrong");
            setLoading(false);
        }
    }

    useEffect(()=>{
        getInstructor()
    },[])

    const handleOk = async () => {
        const error = {};
        if (name === "") {
            error.name = "Name is required";
        }
        if (bio === ""){
            error.bio = "Bio is required";
        }
        if (Object.keys(error).length){
            setErrors(error);
            return true;
        }
        const response = await addInstructors({name, bio})
            if(response){
                await getInstructor()
            }
        console.log("responcepost", response)
        setName("");
        setBio("");
        setErrors({});
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setName("")
        setBio("")
        setErrors({});
        setIsModalVisible(false);

    };

    const columns = [
        {title: 'Id', dataIndex: 'id', key: 'id'},
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'Bio', dataIndex: 'bio', key: 'bio'}
    ];
    const data = [];
    instructors &&  instructors.forEach((item, i) => {
        data.push({
            id: i + 1,
            key: item._id,
            name: item && item.name,
            bio: item && item.bio,
        })
    });
    if (loading) return <Loader/>;

    return (<>
        <div className="row taskEngagement mt-2">
            <Button type="primary" onClick={showModal} className="ml-auto mr-5 mb-3">Add Instructor</Button>
            <div className="col-sm-12 col-md-12">
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{pageSize: 25}}
                />
            </div>
        </div>
            <Modal title="Add Instructor" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} maskClosable={false}>
                <div className="row">
                    <div className="col-sm-12 col-md-12">
                        <div>Name</div>
                        <Input type="text" name="name"  onChange={(e)=> setName(e.target.value)}  value={name}   />
                        <p className="text-danger">{errors.name || ""}</p>
                    </div>
                    <div className="col-sm-12 col-md-12">
                        <div>Bio</div>
                        <Input.TextArea rows={3} onChange={(e)=> setBio(e.target.value)} value={bio}/>
                        <p className="text-danger">{errors.bio || ""}</p>
                    </div>
                </div>
                {/*<Form>*/}
                {/*    <Form.Group className="mb-3" controlId="name">*/}
                {/*        <Form.Label>Name</Form.Label>*/}
                {/*        <Input type="text"  onChange={(e)=> setName(e.target.value)}  value={name}   />*/}
                {/*    </Form.Group>*/}

                {/*    <Form.Group className="mb-3" controlId="bio">*/}
                {/*        <Form.Label>Bio</Form.Label>*/}
                {/*        <Input as="textarea" rows={3}   onChange={(e)=> setBio(e.target.value)} value={bio}/>*/}
                {/*    </Form.Group>*/}
                {/*</Form>*/}
            </Modal>
        </>
    )
};
export default Instructors;
