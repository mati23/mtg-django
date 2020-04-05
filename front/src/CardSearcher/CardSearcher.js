import React from 'react';
import './card_searcher.css';
import { Button, Input, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios'
import { useState } from 'react';

function CardSearcher() {
    const [cards, setCards] = useState([])
    let cardName = ''
    const getCardsByName = () => {
        let response = axios.post(cardName, 'http://127.0.0.1:8001/cards/').then(data => {
            console.log(data.data)
            setCards(data.data)
        });
    }

    return (
        <div className="card-searcher-container">
            <Autocomplete
                id="combo-box-demo"
                options={cards}
                getOptionLabel={(options) => options.name}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                onInputChange={getCardsByName}
                value={cardName}
            />
        </div>
    );
}

export default CardSearcher;
