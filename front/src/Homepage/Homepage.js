import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import axios from 'axios'
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';

function Homepage() {

    // const allManaCost = () => {
    //     const response = axios.get('http://127.0.0.1:8001/')
    //         .then(result => { console.log(result.data.response) })
    // }
    // useEffect(() => {
    //     allManaCost()
    // }, [])

    return (
        <div>
            TESTE
        </div>
    );
}

export default Homepage;
