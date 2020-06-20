import React, { useEffect } from 'react';
import './authentication.css';
import { Button, Input, TextField, Dialog } from '@material-ui/core';
import axios from 'axios'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import {
    useHistory, useLocation
} from "react-router-dom";


export default function Authentication() {
    let history = useHistory()
    let location = useLocation()
    const [backgrondImage, setBackgroundImage] = useState("")
    const [dialogComponent, setDialogComponent] = useState("")
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })
    const [params, setParams] = useState("")
    const [dialog, setDialog] = useState(false)
    const [registrationForm, setRegistrationForm] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })

    useEffect(() => {
        console.log(location)
        if (location.state != null && location.state != "") {
            setDialog(true)
        }
    }, [])

    useEffect(() => {
        if (window.sessionStorage.getItem('username') !== null || window.sessionStorage.length > 0) {
            history.push('/')
        }
    })
    const [errorMessage, setErrorMessage] = useState("")
    const image = () => {
        let response = axios.get("http://127.0.0.1:8001/auth/set_auth_image/").then(result => {
            setBackgroundImage(
                <img className="gradient-image" src={"data:image/jpg;base64, " + result.data.response}></img>
            )
        })
    }
    const login = () => {
        let htmlLoginForm = document.getElementsByClassName("login_input")
        setLoginForm((loginForm) => ({
            ...loginForm,
            username: htmlLoginForm[0].getElementsByTagName("input")[0].value,
            password: htmlLoginForm[1].getElementsByTagName("input")[0].value,
        }))
    }

    const register = () => {
        let registerForm = document.getElementsByClassName("registration_input")
        setRegistrationForm((registrationForm) => ({
            ...registrationForm,
            username: registerForm[0].getElementsByTagName("input")[0].value,
            email: registerForm[1].getElementsByTagName("input")[0].value,
            password: registerForm[2].getElementsByTagName("input")[0].value,
            passwordConfirmation: registerForm[3].getElementsByTagName("input")[0].value
        }))
    }

    useEffect(() => {
        image()
    }, [])

    useEffect(() => {
        if (registrationForm.username != "" && registrationForm.password != "" && registrationForm.passwordConfirmation != "" && registrationForm.email != "") {
            let response = axios.post("http://127.0.0.1:8001/auth/register_user/", registrationForm).then(result => {
                window.sessionStorage.setItem('username', result.data.username)
                window.sessionStorage.setItem('token', result.data.token)
                window.sessionStorage.setItem('userId', result.data.userId)
                history.push('/')
            })
        }
    }, [registrationForm])

    useEffect(() => {
        if (loginForm.username != "" && loginForm.password != "") {
            let response = axios.post("http://127.0.0.1:8001/login_user/", loginForm).then(
                result => {
                    if (result.data.response == "success" && result.data.username) {
                        window.sessionStorage.setItem('username', result.data.username)
                        window.sessionStorage.setItem('token', result.data.token)
                        window.sessionStorage.setItem('userId', result.data.userId)
                        history.push('/')
                    }
                }
            )
        }
    }, [loginForm])

    const closeDialog = () => {
        setDialog(false)
    }

    return (
        <div className="authentication">
            <Dialog className="authentication-dialog" onBackdropClick={closeDialog} aria-labelledby="customized-dialog-title" open={dialog}>
                <div className="dialog-container">
                    <div className="icon-container"><i className="fas fa-id-card-alt create-account"></i></div>
                    <div className="dialog-message">
                        {location.state}
                    </div>
                </div>
            </Dialog>
            <div className="color-overlay">

            </div>
            <div className="background-wallpaper">
                {backgrondImage}
            </div>
            <div className="authentication-container">
                <div className="authentication-form-container">
                    <div className="login">
                        <div className="login-container ">
                            <h2 style={{ alignSelf: 'self-end', fontFamily: 'Roboto-Regular', fontSize: '3em', color: '#aaa' }}>Login</h2>
                            <TextField className="login_input" label="Username or Email" variant="outlined" style={{ width: "100%" }} />
                            <TextField className="login_input" label="Password" type="password" variant="outlined" style={{ width: "100%" }} />
                            <Button onClick={login} variant="contained" className="thin" style={{ gridRowStart: "6", background: '#E74D11', color: '#aaa' }}>
                                LOGIN
                            </Button>
                        </div>
                    </div>
                    <div className="registration">
                        <div className="registration-container" >
                            <h2 style={{ alignSelf: 'self-end', fontFamily: 'Roboto-Regular', fontSize: '3em', color: '#aaa' }}>Register</h2>
                            <TextField id="registration_username" className="registration_input" label="Username" variant="outlined" style={{ width: "100%" }} />
                            <TextField id="registration_email" className="registration_input" label="Email" variant="outlined" style={{ width: "100%" }} />
                            <TextField id="registration_password" className="registration_input" label="Password" variant="outlined" style={{ width: "100%" }} />
                            <TextField id="registration_confirm_password" className="registration_input" label="Confirm Password" variant="outlined" style={{ width: "100%" }} />
                            <Button variant="contained" className="thin" onClick={register} style={{ gridRowStart: "6", background: '#E74D11', color: '#aaa' }}>
                                REGISTER
                            </Button>

                        </div>
                    </div>
                </div>
                <div className="artwork">

                </div>
            </div>

        </div>
    );
}


