import React, {useEffect, useState} from "react";
import moment from "moment";
import {mentorApprove, getUserSearchByEmail, activeOrNot, adminGrantCredits} from "../../../utils/_data";
import {toastError, toastSuccess} from "../../../utils/common";
import Loader from "../../Common/Loader";
import {Table, Input, Switch, Tag, Modal} from "antd";
const { Search } = Input;
const UsersTab = (props) =>{
    const { userActive, getAllActiveDetails } = props;
    const [activeUserTab, setActiveUserTab] = useState([]);
    const [searchEmail, setSearchEmail] = useState("");
    const [userRecord, setRecord] = useState({});
    const [showModel, setShowModel] = useState(false);
    const [credits, setCredits] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() =>{
        setActiveUserTab(userActive);
    },[userActive]);
    const onApprove = async (data) =>{
        setLoading(true);
        const response = await mentorApprove(data.id);
        if (response && response.data && response.data.success) {
            setLoading(false);
            toastSuccess("Mentor approve successfully");
            getAllActiveDetails();
        } else {
            setLoading(false);
            toastError("You have already requested.");
        }
        console.log("userMentor", response);
    };

    const onSearchByEmail = async (email) =>{
        if (searchEmail !== "") {
            const res = await getUserSearchByEmail(email);
            if (res.success) {
                setActiveUserTab(res.data || []);
            } else {
                toastError("Something Went Wrong")
            }
        } else {
            setActiveUserTab(userActive);
        }

    };
    const onSwitch = async (check, record) =>{
        const res = await activeOrNot(record.id, check);
        if (res && res.success){
            window.location.reload();
            if (res && res.data && res.data.status){
                toastSuccess("User Active successfully");
            } else {
                toastSuccess("User Inactive successfully");
            }
        } else {
            toastError("Something went wrong")
        }
    };

    const onAddGrant = (record) =>{
        setRecord(record);
        setShowModel(true);
    };
    const handleOk = async () =>{
        const payload = {
            user: userRecord.id,
            paymentMode: "ADMIN_FREE_GRANT",
            email: userRecord.email,
            credits
        };
        const res = await adminGrantCredits(payload);
        if ((res && res.data && res.data.status_code) === 200){
            toastSuccess('Successfully add credits');
            getAllActiveDetails();
        } else {
            toastError('Something went wrong');
        }
        setCredits("");
    };
    const handleCancel = () =>{
        setShowModel(!showModel);
        setCredits("");
    };

    const columns = [
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'Email', dataIndex: 'email', key: 'email'},
        {title: 'Registered On', dataIndex: 'registeredOn', key: 'registeredOn'},
        {title: 'Status', dataIndex: 'status', key: 'status',
            render: (record, index) =>{
                return (
                    <>
                        <Switch defaultChecked={index.status} onChange={(e) =>onSwitch(e, index)} />&nbsp;<span className={record ? 'text-success' : 'text-primary'}>{record ? "Active": "Inactive"}</span>
                    </>
                )
            }
        },
        {title: 'Credits', dataIndex: 'credits', key: 'credits', render: (record, index) =>{
            return (
                <div className='d-flex justify-content-between align-items-center'>
                    <p>{record}</p>
                    <button className="btn btn-primary add-task-btn" onClick={() => onAddGrant(index)}>Grant Credits</button>
                </div>
            )
        }},
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record) => {
                return (
                    <>
                        {record.isMentor ?  <Tag color="green">Approved</Tag> :
                            <button className="btn btn-primary add-task-btn" onClick={() => onApprove(record)}>Approve as Mentor</button> }
                    </>
                )
            },
        },
    ];

    const data = [];
    activeUserTab && activeUserTab.length && activeUserTab.forEach((item, i) => {
        data.push({
            key: i + 1,
            id: item._id,
            name: `${item.firstName} ${item.lastName}`,
            email: item.email,
            registeredOn: moment(item.registeredOn).format("DD/MM/YYYY"),
            status: item.status,
            credits: item.credits || 0,
            isMentor:  item.isMentor
        })
    });
    if (loading) return <Loader/>;
  return(
      <div className="users">
          <div className="row d-flex mb-3 justify-content-end">
              <div className="col-md-3">
                  <Search name="emailSearch"
                          value={searchEmail}
                          onChange={(e) =>setSearchEmail(e.target.value)}
                          onSearch={onSearchByEmail}
                          placeholder="Email search here..."
                          enterButton
                  />
              </div>
          </div>
          <div className="row mentors-list mt-2">
              <div className="col-sm-12 col-md-12">
                  <Table
                      columns={columns}
                      dataSource={data}
                      pagination={{pageSize: 25}}
                  />
              </div>
          </div>
          <Modal title="Add Grant Credits" visible={showModel} onOk={handleOk} onCancel={handleCancel} maskClosable={false}>
              <div className="row">
                  <div className="col-sm-12 col-md-12">
                      <div>Grant Credits</div>
                      <Input type="number" name="credits"  onChange={(e)=> setCredits(e.target.value)}  value={credits}   />
                      {/*<p className="text-danger">{errors.name || ""}</p>*/}
                  </div>
              </div>
          </Modal>
      </div>
  )
};
export default UsersTab;
