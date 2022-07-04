import React, {useState} from 'react'
import User from "../../assets/images/avatar.png";
import {Link} from "react-router-dom";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import './Header.scss';

const Header = ({location: pathname}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const signOut = async () => {
        localStorage.clear();
        window.location.pathname = "/home";
    };

    const superAdmin = [
        {label: "Dashboard", link: "/dashboard", accessBy: "SUPERADMIN"},
    ];

    const loginUser = () => {
        // return (
            // token && !isCandidate ?
            //     (<a className="text-white nav-link Hi-John">Hi, {`${userData.firstname || ""} ${userData.lastname || ""}`}</a>)
            //     : (<a className="text-white nav-link Hi-John">Hi, {userName || ""}</a>)
        // )
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light text-white header">
                <Link to="/dashboard" className="header-nav-item code-title">CodeDIY</Link>
                <div className="collapse navbar-collapse text-right">
                    <ul className="nav position-right">
                        <li className={`nav-item`}>
                            { loginUser() }
                        </li>
                        <li className={`nav-item`}>
                            <Dropdown className="sm-menu" isOpen={dropdownOpen} toggle={toggle}>
                                { loginUser() }
                                <DropdownToggle>
                                    <img alt='user' src={User} style={{width: 31.9, borderRadius: "50%"}}/>
                                </DropdownToggle>
                                <DropdownMenu>
                                    {superAdmin.map((item, key) =>{
                                        return (
                                            <div key={key}>
                                                <Link to={item.link} className={`${pathname === item.link && 'active'}`}>
                                                    <DropdownItem>{item.label}</DropdownItem>
                                                </Link>
                                            </div>
                                        )
                                    })
                                    }
                                </DropdownMenu>
                            </Dropdown>
                        </li>
                        <li className={`nav-item`}>
                            <a className="text-white nav-link Hi-John pointer" onClick={signOut}>Log out</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

    )
};

export default Header;

