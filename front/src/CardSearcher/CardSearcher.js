import React from 'react';
import './card_searcher.css';
import { Button, Input, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios'
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory
} from "react-router-dom";

function CardSearcher() {
    const [cards, setCards] = useState([])
    const [cardName, setCardNames] = useState('')
    let history = useHistory()
    function setCardName(e) {
        setCardNames(e.target.value)
        getCardsByName()
    }
    const getCardsByName = () => {
        let response = axios.get('http://127.0.0.1:8001/cards/' + cardName + '/').then(data => {
            setCards(data.data)
        }).catch(error => console.log(error));
    }
    const optionSelect = () => {
        console.log('true')
    }
    const getOptionSelectedFromMenu = (event, value) => {
        console.log(value);
        return history.push(('/card/' + value), { id: value, name: "test" })
    }


    return (
        <div className="card-searcher-container">
            <Autocomplete
                id="combo-box-demo"
                options={cards}
                getOptionLabel={(options) => options.name}
                style={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                onInputChange={setCardName}
                loading={true}
                onChange={(event, value) => { getOptionSelectedFromMenu(event, value.id) }}
            />
        </div>
    );
}

export default CardSearcher;
