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
        console.log("TESTE")
        axios.get('http://127.0.0.1:8001/deck-list/').then(
            (data) => {
                data.data.map((item) => {
                    let image = new Image()
                    image.src = item.image
                    console.log(item.image)
                    setDecks(decks => [...decks,
                    < Card className="card-container" >
                        < CardContent >
                            <Typography variant="h4" className="" color="textSecondary">
                                {item.deck_description}
                            </Typography>
                            <div className="deck-thumbnail">
                                <img src={image} />
                            </div>
                            <Typography className="" color="textSecondary">
                                Colors
                            </Typography>
                        </CardContent >
                        <CardActions>
                            <Button className="open-deck-button" onClick={() => openCardDetails(item.id)}>Open Deck</Button>
                        </CardActions>
                    </Card >])
                    console.log(decks)
                })

            }
        ).catch(error => { console.log(error) })

    }, [])

    return (
        <div className="grid-container">
            <div className="deck-container-title">Decks</div>
            {decks}
        </div>
    );
}

export default DeckList;
