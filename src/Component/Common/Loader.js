import React from "react";
import { LoadingOutlined } from '@ant-design/icons';
import "./Loader.scss";
const Loader = () =>{
    return(
        <div>
            <div className="text-center loader">
                <LoadingOutlined style={{ fontSize: 50 }} spin />
            </div>
        </div>
    )
};
export default Loader;