import React from "react";
import MongoDBImage from "../../../assets/images/bitmap.png";
const MyTask = ({activeTaskList, showDeleteModal}) =>{

    return(
        <div className="row">
            <h3>Total task ({activeTaskList && activeTaskList.length || "0"})</h3>
            {activeTaskList && activeTaskList.length ? activeTaskList.map((item, index) =>(
                <div className="col-md-12 col-sm-12 col-xs-12 task-cards" key={index}>
                    <div className="col-md-2 col-sm-3 col-xs-12">
                        <img className="taskIcon" src={MongoDBImage} />
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12 no-left-padding-div">
                        <div className="col-md-12 col-xs-12 col-sm-12 no-padding-div">
                            <div className="divider"></div>
                            <h3 className="task_category mb-3">{item.name}</h3>
                            <h4>Task Id : {item._id}</h4>
                            <span className="task_category" dangerouslySetInnerHTML={{__html: item.description || "-"}} />
                            <span className="bulletin" >&bull;</span>
                            <span className="task_difficulty">{item.difficultyLevel}</span>
                            <span className="bulletin" >&bull;</span>
                        </div>
                        <div className="col-md-12 col-xs-12 col-sm-12 no-padding-div">
                            <p className="task_desc" dangerouslySetInnerHTML={{__html: item.tinyDescription || "-"}} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-3 col-xs-12">
                        <p className="task_priceText">Fee Earned</p>
                        <p className="task_rate">{`${item.credits || ''} ${item.currencyCode || ''}`}</p>
                    </div>
                    <div className="col-md-2 col-sm-3 col-xs-12 float-lg-right">
                       <button className="btn btn-primary add-task-btn" onClick={() => showDeleteModal(item._id)}>Remove the Approved Task</button>
                    </div>
                </div>

            )):  <div className="col-m-12 col-sm-12 col-xs-12 text-center"><h3 className="text-center">No task available</h3></div>}
        </div>
    )
};
export default MyTask;