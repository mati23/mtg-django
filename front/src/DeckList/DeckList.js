import React from 'react';
import { Button, Input, TextField, Card, CardContent, Typography, CardActionArea, CardActions } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios'
import { useState, useEffect } from 'react';
import './decklist.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory
} from "react-router-dom";

let items = []
let setDeckListInView = (deckList, title) => {
    return (
        < Card className="card-container" > i
            < CardContent >
                <Typography variant="h4" className="" color="textSecondary">
                    dsa
                </Typography>
                <div className="deck-thumbnail">IMAGE</div>
                <Typography className="" color="textSecondary">
                    Colors
                                </Typography>
            </CardContent >
        </Card >
    )
}

function DeckList() {
    let history = useHistory()
    let [decks, setDecks] = useState([])
    let [deckList, setDeckList] = useState([])
    let openCardDetails = (id) => {
        history.push('/deck/' + id + '/', { id: id })
    }
    useEffect(() => {
        if (sessionStorage.getItem("userId") != null) {
            axios.post('http://127.0.0.1:8001/deck-list/', { userId: sessionStorage.getItem("userId") }).then(
                data => {
                    console.log(data)
                    data.data.response.map((item) => {
                        item = JSON.parse(item)
                        setDecks(decks => [...decks,
                        <Card className="card-container" key={item.id}>
                            < CardContent >
                                <Typography variant="h4" className="" color="textSecondary">
                                    {item.deck_description}
                                </Typography>
                                <div className="deck-thumbnail">

                                </div>
                                <Typography className="" color="textSecondary">
                                    Colors
                                </Typography>
                            </CardContent >
                            <CardActions>
                                <Button className="open-deck-button" onClick={() => openCardDetails(item.id)}>Open Deck</Button>
                            </CardActions>
                        </Card >])

                    })

                }
            ).catch(error => { console.log(error) })
        } else {
            history.push({ pathname: '/auth/', state: "You are not logged in. Please sign in or create your account." })
            console.log("you are not logged in")
        }
    }, [])

    return (
        <div className="grid-container">
            <div className="deck-container-title">Decks</div>
            <div className="deck-add-new">
                <Button color="primary" variant="contained">Adicionar</Button>
            </div>
            {decks}
        </div>
    );
}

export default DeckList;
