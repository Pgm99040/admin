import React, {Component} from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons';
class NotFound extends Component {

    render() {
        return (
            <div className='text-center' style={{marginTop:"20%"}}>
                <ExclamationCircleOutlined /><br/><br/>
                <span className="display-4">404 page not found</span>
            </div>
        );
    }
}

export default NotFound;
