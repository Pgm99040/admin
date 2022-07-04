import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Home from "./Component/Home";
import Header from "./Component/Common/Header";
import Login from "./Component/Login";
import Dashboard from "./Component/Dashboard";
import jobPosting from "./Component/Dashboard/component/jobPosting";
import Blog from "./Component/Dashboard/component/Blog";

import NotFound from "./Component/Common/NotFound";
import {getFromStorage} from "./utils/common";
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component{
  render() {
      const adminType = getFromStorage("adminType");
      const token = getFromStorage("token");
    return (
        <div style={{"overflowX": "hidden"}} className="main-app">
            <ToastContainer/>
          {token && adminType === "superAdmin" ?
            <div>
                <Header/>
                <div className="wrapper toggled" id='wrapper'>
                    <div id='page-content-wrapper' className="page-content-wrapper">
                        <Switch>
                            <Route exact path="/dashboard" component={Dashboard}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/notfound" component={NotFound}/>
                            <Route exact path="/" component={Dashboard}/>
                            <Route
                                path="/"
                                render={({match, history}) => {
                                    return ( <Dashboard match={match} history={history}/>)
                                }
                                }
                                />
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </div>
              </div>
              :
              <div>
                  <Switch>
                      <Route path="/home" component={Home}/>
                      <Route path="/login" component={Login}/>
                      <Route path="/notfound" component={NotFound}/>
                      <Route path="/">
                          <Redirect to="/home"/>
                      </Route>
                  </Switch>
              </div>
          }
        </div>
    );
  }
}

export default App;
