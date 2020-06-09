import React, { useEffect } from 'react';
import './authentication.css';
import { Button, Input, TextField } from '@material-ui/core';
import axios from 'axios'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import {
    useHistory
} from "react-router-dom";


export default function Authentication() {
    let history = useHistory()
    const [backgrondImage, setBackgroundImage] = useState("")
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })
    const [registrationForm, setRegistrationForm] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })
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
        console.log(registrationForm)
        if (registrationForm.username != "" && registrationForm.password != "" && registrationForm.passwordConfirmation != "" && registrationForm.email != "") {
            let response = axios.post("http://127.0.0.1:8001/auth/register_user/", registrationForm).then(result => {
                console.log(result)
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
                    console.log(result)
                }
            )
        }
    }, [loginForm])


    return (
        <div className="authentication">
            <div className="color-overlay">

            </div>
            <div className="background-wallpaper">
                {backgrondImage}
            </div>
            <div className="authentication-container">
                <div className="authentication-form-container">
                    <div className="login">
                        <div className="login-container">
                            <h2 style={{ alignSelf: 'self-end', fontFamily: 'Roboto-Regular', fontSize: '3em' }}>Login</h2>
                            <TextField className="login_input" label="Username or Email" variant="outlined" style={{ width: "100%" }} />
                            <TextField className="login_input" label="Password" type="password" variant="outlined" style={{ width: "100%" }} />
                            <Button onClick={login} variant="contained" color="primary" className="thin" style={{ gridRowStart: "6" }}>
                                Olá Mundo
                            </Button>
                        </div>
                    </div>
                    <div className="registration">
                        <div className="registration-container" >
                            <h2 style={{ alignSelf: 'self-end', fontFamily: 'Roboto-Regular', fontSize: '3em' }}>Register</h2>
                            <TextField id="registration_username" className="registration_input" label="Username" variant="outlined" style={{ width: "100%" }} />
                            <TextField id="registration_email" className="registration_input" label="Email" variant="outlined" style={{ width: "100%" }} />
                            <TextField id="registration_password" className="registration_input" label="Password" variant="outlined" style={{ width: "100%" }} />
                            <TextField id="registration_confirm_password" className="registration_input" label="Confirm Password" variant="outlined" style={{ width: "100%" }} />
                            <Button variant="contained" color="primary" className="thin" onClick={register} style={{ gridRowStart: "6" }}>
                                Register
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


