import React, { useEffect } from 'react';
import './authentication.css';
import { Button, Input, TextField } from '@material-ui/core';
import axios from 'axios'
import { useState } from 'react';

function Authentication() {
    const [backgrondImage, setBackgroundImage] = useState("")

    const image = () => {
        let response = axios.get("http://127.0.0.1:8001/auth/set_auth_image/").then(result => {

            setBackgroundImage(
                <img className="gradient-image" src={"data:image/jpg;base64, " + result.data.response}></img>

            )
        })
    }
    useEffect(() => {
        image()
    }, [])

    useEffect(() => {
        let image = new Image()

        console.log(backgrondImage)
    }, [backgrondImage])
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
                            <TextField id="outlined-basic" label="Username or Email" variant="outlined" style={{ margin: "2em", width: "90%" }} />
                            <TextField id="outlined-basic" label="Password" type="password" variant="outlined" style={{ margin: "2em", width: "90%" }} />
                            <Button variant="contained" color="primary" className="thin">
                                Olá Mundo
                        </Button>
                        </div>
                    </div>
                    <div className="registration">
                        <div className="registration-container">
                            <TextField id="outlined-basic" label="Username" variant="outlined" style={{ margin: "2em", width: "90%" }} />
                            <TextField id="outlined-basic" label="Email" variant="outlined" style={{ margin: "2em", width: "90%" }} />
                            <TextField id="outlined-basic" label="Password" variant="outlined" style={{ margin: "2em", width: "90%" }} />
                            <TextField id="outlined-basic" label="Repeat Password" variant="outlined" style={{ margin: "2em", width: "90%" }} />
                            <Button variant="contained" color="primary" className="thin">
                                Olá Mundo
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

export default Authentication;
