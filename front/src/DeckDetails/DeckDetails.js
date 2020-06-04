import React from 'react';
import { Button, Input, TextField, Chip, CircularProgress, Fade, Dialog } from '@material-ui/core';
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
    const [newCardArray, setNewCardArray] = useState([])

    let cardArray = []

    const [deckListHasChanged, setDeckListHasChanged] = useState(true)

    useEffect(() => {
        getDeckManaCount()
    }, [])
    function checkForUpdatedValues() {
        let list = document.getElementsByClassName("quantity-edited")
        if (list.length > 0) {
            setUpdatableCardHasChanges(true)
        } else {
            setUpdatableCardHasChanges(false)
        }
    }

    function getDeckManaCount() {
        let response = axios.post("http://127.0.0.1:8001/deck/deck_mana/", { deckId: params.id })
            .then(result => {
                let json_result = JSON.parse(result.data.response)
                console.log(json_result)
            })
    }
    const updateCardList = useCallback((cardId, quantity) => {
        if (cardId !== "" && cardArray.map((item) => { return item.id === cardId ? true : false })) {
            cardArray.map((index) => {
                if (index.id === cardId) {
                    index.new_quantity = quantity
                    checkForUpdatedValues()
                    setNewCardArray(cardArray)
                    //console.log(newCardArray)
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

    useEffect(() => {
        console.log(deck)
    }, [setDeck])

    function getCardList(cardIdList) {
        let cards_json = JSON.parse(cardIdList)
        if (cards_json) {
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
    }

    const [dialog, setDialog] = useState({
        visibility: false,
        message: ""
    })
    const openDialog = (new_message) => {
        console.log("abrindo dialog", new_message)
        setDialog({
            visibility: true,
            message: new_message
        })
    }
    const closeDialog = () => {
        setDialog({
            visibility: false
        })
        if (dialog.message == "SUCCESS") {
            updateList()
        }
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

    const updateList =
        () => {
            setDeck({})
            setCardList("")
            updateDeckInfo()
        }

    const saveChanges = () => {
        console.log(newCardArray)
        let cardListPost = []
        newCardArray.map((item) => {
            cardListPost.push({
                id: item.id,
                quantity: item.new_quantity
            })
        })
        console.log(cardListPost)
        let response = axios.post("http://127.0.0.1:8001/deck/save_changes/", {
            newCardList: cardListPost,
            deckId: params.id
        }).then((result) => {
            console.log(result.data)
            openDialog(result.data.response)
        })
    }






    return (
        <div className="deck-detail-container">
            <CardSearcher deckId={params.id} openDialog={(new_message) => openDialog(new_message)}></CardSearcher>
            <div className="deck-title">{deck.title}</div>
            <div className="description-container">
                <div className="description-text">"{deck.deck_description}"</div>
                <div className="description-container-right">{updatableCardHasChanges == false ? "" : <Fade in={updatableCardHasChanges}><Button color="primary" variant="contained" onClick={saveChanges}>SAVE CHANGES</Button></Fade>}</div>
            </div>
            <div className="deck-thumbnails">
                {cardList}
            </div>
            <Dialog onClose={closeDialog} aria-labelledby="customized-dialog-title" open={dialog.visibility}>
                <div className="dialog-container">
                    <div className="icon-container">
                        <i className={dialog.message == "SUCCESS" ? "fas fa-check dialog-icon green" : "fas fa-times dialog-icon red"}></i>
                    </div>
                    <div className="dialog-message">
                        {dialog.message}
                    </div>
                </div>
            </Dialog>
        </div >
    )
}
export default DeckDetails;


