import React from 'react';
import { Button, Input, TextField, Card, CardContent, Typography, CardActionArea, CardActions, CardMedia } from '@material-ui/core';
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
        if (sessionStorage.getItem("token") != null) {
            axios.post('http://127.0.0.1:8001/deck-list/', { userId: sessionStorage.getItem("userId") }, { headers: { "token": sessionStorage.getItem("token") } }).then(
                data => {
                    console.log(data)
                    data.data.response.map((item) => {
                        let thumbnail = (item.thumbnail)
                        console.log(thumbnail)
                        item = JSON.parse(item.deck)
                        setDecks(decks => [...decks,
                        <Card className="card-container" key={item.id}>
                            <CardActionArea>
                                < CardContent >
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="100"
                                        image={"data:image/jpg;base64, " + thumbnail}
                                        title="Contemplative Reptile"
                                    />
                                    <Typography variant="h4" className="" style={{ fontWeight: '300' }} color="textSecondary">
                                        {item.title}
                                    </Typography>

                                    <Typography className="" color="textSecondary">
                                        Colors
                                </Typography>
                                </CardContent >
                            </CardActionArea>

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

    const registerDeck = () => {
        history.push({ pathname: '/deck/' })
    }

    return (
        <div className="grid-container dark-theme">
            <div className="deck-container-title">Decks</div>
            <div className="deck-add-new">
                <Button onClick={registerDeck} style={{ background: 'white' }} variant="contained">Adicionar</Button>
            </div>
            {decks}
        </div>
    );
}

export default DeckList;
