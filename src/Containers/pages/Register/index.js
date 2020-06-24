import React, { Component } from 'react';
import './Register.scss'
import Button from '../../../Components/atoms/Button';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../Config/redux/action';

class Register extends Component {
    state = {
        email    : '',
        password : ''
    }

    handleChangetext = (e) => {
        this.setState({
            [e.target.id]   : e.target.value
        })
    }

    handleRegisterSubmit = async () => {
        const {email, password} = this.state;
        const res = await this.props.registerAPI({email, password}).catch(err => err)
        console.log(res);
        if (res) {
            this.setState({
                email   : '',
                password: ''
            })
        }
    }

    render() {
        return (
            <div className = 'auth-container '>
                <div className="auth-card ">
                    <p className = "auth-title">Register Page</p>
                    <input
                        value       = {this.state.email}
                        id          = 'email'
                        className   = "auth-input"
                        placeholder = 'Email'
                        type        = 'text'
                        onChange    = {this.handleChangetext}
                    />
                    <input 
                        value       = {this.state.password}
                        id          = 'password'
                        className   = "auth-input"
                        placeholder = 'Password'
                        type        = 'password'
                        onChange    = {this.handleChangetext}
                    />
                    <Button 
                        onclick = {this.handleRegisterSubmit}
                        title   = "Register"
                        loading = {this.props.isLoading}
                    />
                </div>
                {/* <button>Register</button>
                <button>Dashboard</button> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading : state.isLoading
})

const mapDispatchToProps = (dispatch) => ({
    registerAPI : (data) => dispatch (registerUserAPI(data))
})


export default connect(mapStateToProps, mapDispatchToProps) (Register);