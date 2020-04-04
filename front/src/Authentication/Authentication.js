import React from 'react';
import './authentication.css';
import { Button, Input, TextField } from '@material-ui/core';

function Authentication() {
    return (
        <div className="authentication">
            <div className="authentication-container">
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
                        <Button variant="contained" color="primary" className="thin">
                            Olá Mundo
                        </Button>
                    </div>
                </div>
                <div className="artwork">
                    Artwork
                </div>
            </div>

        </div>
    );
}

export default Authentication;
