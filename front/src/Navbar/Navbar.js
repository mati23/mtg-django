import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';

function Navbar() {
    const history = useHistory()
    const showDeckList = () => {
        return history.push("/deck-list")
    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        Mtg Blueprint
          </IconButton>
                    <Button style={{ color: "#fff" }} onClick={showDeckList}>Decks</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;
