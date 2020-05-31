import React from 'react';
import { Button, Input, TextField, Chip, CircularProgress, Fade } from '@material-ui/core';
import axios from 'axios'
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring'
import './deck-details.css'
import CardSearcher from '../CardSearcher/CardSearcher';
import Context, { ContextProvider } from '../Context/Context';
import { CardThumbNail } from '../CardThumbnail/CardThumbnail';




function DeckDetails() {
    const [deck, setDeck] = useState({})
    const [cardList, setCardList] = useState("")
    const [cardString, setCardString] = useState([])
    const [updatableCardList, setUpdatableCardList] = useState("")
    const [updatableCardHasChanges, setUpdatableCardHasChanges] = useState(false)

    let cardArray = []

    useEffect(() => {
        console.log("first")
    }, [updatableCardList])
    const [deckListHasChanged, setDeckListHasChanged] = useState(true)


    function checkForUpdatedValues() {
        let list = document.getElementsByClassName("quantity-edited")
        if (list.length > 0) {
            setUpdatableCardHasChanges(true)
        } else {
            setUpdatableCardHasChanges(false)
        }
    }

    const updateCardList = useCallback((cardId, quantity) => {
        if (cardId !== "" && cardArray.map((item) => { return item.id === cardId ? true : false })) {
            cardArray.map((index) => {
                if (index.id === cardId) {
                    index.quatity = quantity
                    checkForUpdatedValues()
                }
            })
        }
    }, [cardArray])

    useEffect(() => {
        console.log("teste")
    }, [updatableCardHasChanges])

    useEffect(() => {
        console.log(updatableCardList)
    }, [updatableCardList])

    function getCardList(cardIdList) {
        let cards_json = JSON.parse(cardIdList)
        cards_json.map((item) => { cardArray.push(item) })
        setCardString(cardIdList)
        cards_json.map((item) => {
            let response = axios.get("http://127.0.0.1:8001/card/" + item.id + "/").then((data) => {
                setCardList(cardList => [...cardList,
                <CardThumbNail key={item.id} item={item} data={data} updateCardList={updateCardList}></CardThumbNail>
                ])
            })
        })
    }

    let params = useParams()

    const updateDeckInfo = () => {
        axios.get("http://127.0.0.1:8001/deck/" + params.id + "/")
            .then(
                (data) => {
                    setDeck(data.data)
                    getCardList(data.data.card_list)
                    setUpdatableCardList(data.data.card_list)
                })
    }


    useEffect(() => {
        updateDeckInfo()
    }, [])

    useEffect(() => {
        deck.card_list == null || deck.card_list == undefined ? console.log("") : getCardList(deck.card_list)
    }, [])

    let [loading, setLoading] = useState(true)

    const updateList = useCallback(
        () => {
            setCardList("")
            updateDeckInfo()
            getCardList(deck.card_list)
        },
        [deckListHasChanged],
    )

    const saveChanges = () => {
        let response = axios.post("http://127.0.0.1:8001/deck/saveChanges/").then((result) => {
            console.log(result.data)
        })
    }



    return (
        <div className="deck-detail-container">
            <CardSearcher deckId={params.id} updateList={() => updateList()}></CardSearcher>
            <div className="deck-title">{deck.title}</div>
            <div className="description-container">
                <div className="description-text">"{deck.deck_description}"</div>
                <div className="description-container-right">{updatableCardHasChanges == false ? "" : <Fade in={updatableCardHasChanges}><Button color="primary" variant="contained" onClick={saveChanges}>SAVE CHANGES</Button></Fade>}</div>
            </div>
            <div className="deck-thumbnails">
                {cardList}
            </div>
        </div >
    )
}
export default DeckDetails;


