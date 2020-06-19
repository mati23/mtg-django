import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import './navbar.css'
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem } from '@material-ui/core';
import { useEffect } from 'react';

function Navbar() {
    const history = useHistory()
    const showDeckList = () => {
        return history.push("/deck-list")
    }
    const showAuthPage = () => {
        return history.push("/auth")
    }
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const logout = () => {
        window.sessionStorage.clear()
        window.location.reload()
    }
    useEffect(() => {
        console.log(window.sessionStorage)
    }, [])
    return (
        <div>
            <AppBar position="static">
                <Toolbar className="orange-theme">
                    <IconButton edge="start" color="inherit" aria-label="menu" href="/" style={{ fontFamily: 'Roboto-Regular' }}>
                        Mtg Blueprint
                    </IconButton>
                    <Button style={{ color: "#fff" }} onClick={showDeckList}>Decks</Button>
                    <div className="center-div"></div>
                    {
                        window.sessionStorage.getItem('username') == null ?
                            < Button style={{ color: "#fff" }} onClick={showAuthPage} edge="end">Login</Button> :
                            <div className="welcome-container" onClick={handleClick}>
                                Welcome, 	&nbsp;
                                <div className="user-name">{window.sessionStorage.getItem('username')}</div>
                                !
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                </Menu>
                            </div>

                    }

                </Toolbar>
            </AppBar>
        </div >
    );
}

export default Navbar;
