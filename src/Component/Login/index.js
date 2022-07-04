import React, {Component} from 'react'
import { loginWithSuperAdmin } from "../../utils/_data";
import Loader from "../Common/Loader";
import { setInToStorage, toastSuccess, toastError } from "../../utils/common";
import "./Login.scss";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                email: '',
                password: '',
                platform: "web"
            },
            errors: {
                email: '',
                password: '',
            },
            candidateList: {},
            isLoading: false
        };

    }

    onChange = (e) => {
        this.setState({
            errors: {
                ...this.state.errors,
                [e.target.name]: this.validate(e.target.name, e.target.value),
            },
            fields: {
                ...this.state.fields,
                [e.target.name]: e.target.value,
            }
        });
    };

    validate = (name, value) => {
        switch (name) {
            case 'email':
                if (!value) {
                    return 'Email is required';
                } else if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)) {
                    return 'Email is invalid';
                } else {
                    return '';
                }
            case 'password':
                if (!value) {
                    return 'Password is required';
                } else {
                    return '';
                }
            default: {
                return ''
            }
        }
    };

    onSave = async () => {
        const {fields} = this.state;
        let validationErrors = {};
        Object.keys(fields).forEach(name => {
            const error = this.validate(name, fields[name]);
            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });

        if (Object.keys(validationErrors).length > 0) {
            this.setState({errors: validationErrors});
            return;
        }
        this.setState({isLoading: true});
        const response = await loginWithSuperAdmin(fields);
        console.log("superAdmin", response);
        if (response && response.data && response.data.success) {
            setInToStorage(response.data.result);
            this.setState({isLoading: false});
            toastSuccess("Successfully login");
            this.props.history.push("/dashboard");
        } else {
            this.setState({isLoading: false});
            toastError("Something went wrong");
        }
    };

    render() {
        const {errors, fields, isLoading} = this.state;
        if (isLoading) return <Loader/>;
        return (
            <div className="container login-page">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3 col-md-6 offset-md-3 col-xs-12 mt-5">
                        <div className="heading">
                            <h1>Log in</h1>
                        </div>
                        <div className="form-group mt-4">
                            <input type="email" className="form-control form-control-lg" name="email"
                                   value={fields.email}
                                   onChange={this.onChange} placeholder="Username"/>
                            <p className="text-danger">{errors.email}</p>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control form-control-lg" name="password"
                                   value={fields.password} onChange={this.onChange} placeholder="Password"/>
                            <p className="text-danger">{errors.password}</p>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary mb1 bg-teal btn-lg btn-block"
                                    onClick={this.onSave}>Login
                            </button>
                        </div>
                        <div className="form-group">
                            <a className="text-info">Forgot Your Password?</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Index;
