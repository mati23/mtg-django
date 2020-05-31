import React, { useCallback } from 'react';
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
import CardDetails from '../CardDetails/CardDetails';

const CardSearcher = ({ deckId, updateList }) => {

    const [cards, setCards] = useState([])
    const [cardName, setCardNames] = useState('')
    const [cardViewerComponent, setCardViewerComponent] = useState()
    const [selectedCard, setSelectedCard] = useState({
        cardId: '',
        visibility: false
    })
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
    const printlol = (event) => {
        return event
    }
    const getOptionSelectedFromMenu = (event, value) => {
        setSelectedCard(value, true);
        return setCardViewerComponent(<CardDetails updateList={() => updateList()} deckId={deckId} selectedCardId={value} newCardVisibility={"block"} printSomething={printlol}></CardDetails>)
        //setSelectedCardId(value)

        //return history.push(('/card/' + value), { id: value, name: "test" })
    }
    const togglePopUp = useCallback(
        event => {
            event.preventDefault();
            setSelectedCard("teste", false)
        },
        [selectedCard.cardId, selectedCard.visibility]
    );


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

            {cardViewerComponent}

        </div>
    );
}

export default CardSearcher;
