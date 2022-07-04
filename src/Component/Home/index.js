import React from "react";
import photo from '../../assets/images/banner.png'
import {Link} from "react-router-dom";
import "./Home.scss";
const Index = (props) => {
    return (
        <div className="home">
            <div className="container-fluid home-content">
                <div className="home-header">
                    <div>
                        <Link className="code-title" onClick={()=> {props.history.push('/home')}} style={{cursor:"pointer"}}>CodeDIY</Link>
                    </div>
                    <div>
                        <Link to="/login" className="login-title">Log In</Link>
                    </div>
                </div>
                <div className="row content-web container-fluid">
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xs-12">
                        <p className="the-best-people-headertext">The Best Learning Happens...</p>
                        <p className="make-it-headertext">When you actually do the task</p>
                        <p className="collaborate-with-headertext">Perform carefully curated job tasks and get expert opinion for code and design review.</p>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 button-container">
                            <button className="button-white">
                                <span className="how-it-works-buttonText">HOW IT WORKS</span>
                            </button>
                            <button className="button-blue">
                                <span className="get-started-buttonText">GET STARTED</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xs-12 imageposition">
                        <img src={photo} alt='' className='image-setting'/>
                    </div>

                </div>

            </div>
            {/*<div className="row d-flex justify-content-between flex-column">*/}
            {/*    <div/>*/}
            {/*    <div className="col-md-12 " id='gradient'>*/}
            {/*        <div className='row' id="media" style={{padding:"50px", height: "100vh"}}>*/}
            {/*            <div className='col-md-1 col-sm-12'/>*/}
            {/*            <div className='col-md-5 col-sm-12 align'>*/}
            {/*                <h5>The Best Learning Happens...</h5>*/}
            {/*                <h2><strong>When you actually do the task</strong></h2>*/}
            {/*                <h6 className="display-6">Take quizzes and evaluate your Knowledge across different*/}
            {/*                    programming languages</h6>*/}
            {/*                <div className="row">*/}
            {/*                    <div className='col-md-12  col-sm-12 ' >*/}
            {/*                        <button type="button" className="btn btn-light mt-5 mr-4" id='btn-1'>HOW IT WORKS</button>*/}
            {/*                        <button type="button" className="btn btn-outline-primary mt-5 btn-color bt"  onClick={() => {props.history.push('/')}}>GET STARTED</button>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className='col-md-6 col-sm-12 d-flex justify-content-between flex-column'>*/}
            {/*                <div/>*/}
            {/*                <img src={photo} alt='' className='image-setting'/>*/}
            {/*                <div/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div/>*/}
            {/*</div>*/}
        </div>
    )
};

export default Index;