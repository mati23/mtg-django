import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import './navbar.css'
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';

function Navbar() {
    const history = useHistory()
    const showDeckList = () => {
        return history.push("/deck-list")
    }
    const showAuthPage = () => {
        return history.push("/auth")
    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" href="/" style={{ fontFamily: 'Roboto-Regular' }}>
                        Mtg Blueprint
                    </IconButton>
                    <Button style={{ color: "#fff" }} onClick={showDeckList}>Decks</Button>
                    <div className="center-div"></div>
                    <Button style={{ color: "#fff" }} onClick={showAuthPage} edge="end">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;
