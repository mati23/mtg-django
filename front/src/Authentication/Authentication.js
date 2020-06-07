import React, { useEffect } from 'react';
import './authentication.css';
import { Button, Input, TextField } from '@material-ui/core';
import axios from 'axios'
import { useState } from 'react';
import { useForm } from "react-hook-form";

export default function Authentication() {
    const [backgrondImage, setBackgroundImage] = useState("")
    const [registrationForm, setRegistrationForm] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })
    const [errorMessage, setErrorMessage] = useState("")
    const image = () => {
        let response = axios.get("http://127.0.0.1:8001/auth/set_auth_image/").then(result => {
            setBackgroundImage(
                <img className="gradient-image" src={"data:image/jpg;base64, " + result.data.response}></img>

            )
        })
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



        //if (errorMessage == "") {
        //    let response = axios.post("http://127.0.0.1:8001/auth/register_user/", registrationForm)
        //}

    }

    useEffect(() => {
        image()
    }, [])

    useEffect(() => {
        console.log(registrationForm)
    }, [registrationForm])


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
                            <TextField value={registrationForm.username} label="Username or Email" variant="outlined" style={{ margin: "2em", width: "90%" }} />
                            <TextField label="Password" type="password" variant="outlined" style={{ margin: "2em", width: "90%" }} />
                            <Button variant="contained" color="primary" className="thin">
                                Olá Mundo
                        </Button>
                        </div>
                    </div>
                    <div className="registration">
                        <div className="registration-container" >
                            <TextField id="registration_username" className="registration_input" label="Username" variant="outlined" style={{ margin: "2em", width: "90%" }} />
                            <TextField id="registration_email" className="registration_input" label="Email" variant="outlined" style={{ margin: "2em", width: "90%" }} />
                            <TextField id="registration_password" className="registration_input" label="Password" variant="outlined" style={{ margin: "2em", width: "90%" }} />
                            <TextField id="registration_confirm_password" className="registration_input" label="Confirm Password" variant="outlined" style={{ margin: "2em", width: "90%" }} />
                            <Button variant="contained" color="primary" className="thin" onClick={register}>
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


