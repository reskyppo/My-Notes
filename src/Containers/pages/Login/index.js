import React, { Component } from 'react';
import './Login.scss'
import { connect } from 'react-redux';
import { loginUserAPI } from '../../../Config/redux/action';
import Button from '../../../Components/atoms/Button';

class Login extends Component {
    state = {
        email    : '',
        password : ''
    }

    handleChangetext = (e) => {
        this.setState({
            [e.target.id]   : e.target.value
        })
    }

    handleLoginSubmit = async () => {
        const {email, password} = this.state;
        const {history} = this.props;
        const res = await this.props.loginAPI({email, password}).catch(err => err);
        if (res) {
            console.log('login success', res);
            localStorage.setItem('userData', JSON.stringify(res));
            this.setState({
                email   : '',
                password: ''
            })
            history.push('/dashboard')
        }else{
            console.log('login error');

        }
    }



    render() {
        return (
            <div className = 'auth-container '>
                <div className="auth-card ">
                    <p className = "auth-title">Login Page</p>
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
                        onclick = {this.handleLoginSubmit}
                        title   = "Login"
                        loading = {this.props.isLoading}
                    />
                    <div className = 'nav-register'>
                        <p>Belum memiliki akun ? <a href="/register"> Daftar disini!</a> </p>
                    </div>
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
    loginAPI : (data) => dispatch (loginUserAPI(data))
})


export default connect(mapStateToProps, mapDispatchToProps) (Login);