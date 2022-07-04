import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = ({location: {pathname}}) => {
    const slidebarList = [
        {label: "Users", link: `/users`},
        {label: "Mentors", link: `/mentors`},
        {label: "Task", link: `task`},
        {label: "Task Engagements", link: "/task-engagements"}
    ];
    return (
        <div className="sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    {slidebarList.map((item, key) => {
                        return (
                            <div key={key}>
                                <Link key={key} to={item.link}
                                      className={`${pathname === item.link && 'active'}`}>
                                    <small>{item.label}</small>
                                    <i className="fa fa-angle-right"/>
                                </Link>
                            </div>
                        )})}
                </li>
            </ul>
        </div>
    );
};

export default withRouter(Sidebar);


