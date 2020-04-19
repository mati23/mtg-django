import React from 'react';
import { Button, Input, TextField, Chip, CircularProgress } from '@material-ui/core';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring'
import './deck-details.css'




function DeckDetails() {
    let [deck, setDeck] = useState({})
    let params = useParams()
    useEffect(() => {
        axios.get("http://127.0.0.1:8001/deck/" + params.id + "/").then(
            (data) => {
                setDeck(data.data)
            }
        )
    }, [])
    let [loading, setLoading] = useState(true)

    return (
        <div className="deck-detail-container">
            <div className="deck-title">{deck.title}</div>
            <div>{deck.deck_description}</div>
            {loading && <CircularProgress />}

        </div>
    )
}
export default DeckDetails;
