import React from 'react';
import { Button, Input, TextField, Chip, CircularProgress, Fade, Dialog } from '@material-ui/core';
import axios from 'axios'
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring'
import './deck-details.css'
import CardSearcher from '../CardSearcher/CardSearcher';
import Context, { ContextProvider, CardInformationContainerContext } from '../Context/Context';
import { CardThumbNail } from '../CardThumbnail/CardThumbnail';
import ReactEcharts from "echarts-for-react";
import CardInformationContainerContextProvider from '../Context/Context';




function DeckDetails() {
    const [deck, setDeck] = useState({})
    const [cardList, setCardList] = useState("")
    const [cardString, setCardString] = useState([])
    const [updatableCardList, setUpdatableCardList] = useState("")
    const [updatableCardHasChanges, setUpdatableCardHasChanges] = useState(false)
    const [newCardArray, setNewCardArray] = useState([])
    const [manaCount, setManaCount] = useState([])
    const [graphColors, setGraphColors] = useState([])

    let cardArray = []

    const [deckListHasChanged, setDeckListHasChanged] = useState(true)

    function attributeStringToColor(array) {
        let color = []
        array.map(item => {
            switch (item.name) {
                case 'R':
                    color.push("#F06B51")
                    break
                case 'G':
                    color.push("#24645A")
                    break
                case 'U':
                    color.push("#1D97C1")
                    break
                case 'B':
                    color.push("#293138")
                    break
                case 'W':
                    color.push("#FBE4C3")
                    break
                case 'number':
                    color.push("#000")
                    break
                case 'S':
                    color.push("#5C929B")
                    break
                case 'C':
                    color.push("#7B7B7B")
                    break

            }
        })
        return color
    }
    useEffect(() => {
        getDeckManaCount()

    }, [])

    useEffect(() => {
        console.log("manaCount:", manaCount)
        setGraphColors(attributeStringToColor(manaCount))
    }, [manaCount])
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
                let json_result = []
                let newManaArray = []
                json_result = JSON.parse(result.data.response)
                json_result.map(item => {
                    if (item.color !== "number") {
                        newManaArray.push({ value: item.quantity, name: item.color })
                    }
                })
                setManaCount(newManaArray)
                console.log('result', json_result)
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

    }, [updatableCardList])


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
        let cardListPost = []
        newCardArray.map((item) => {
            cardListPost.push({
                id: item.id,
                quantity: item.new_quantity
            })
        })
        let response = axios.post("http://127.0.0.1:8001/deck/save_changes/", {
            newCardList: cardListPost,
            deckId: params.id
        }).then((result) => {
            openDialog(result.data.response)
        })
    }






    return (

        <div className="deck-detail-container">
            <div className="centralized-container">
                <CardSearcher deckId={params.id} openDialog={(new_message) => openDialog(new_message)}></CardSearcher>
                <div className="deck-title">{deck.title}</div>
                <div className="description-container">
                    <div className="description-text">"{deck.deck_description}"</div>
                    <div className="description-container-right">{updatableCardHasChanges == false ? "" : <Fade in={updatableCardHasChanges}><Button color="primary" variant="contained" onClick={saveChanges}>SAVE CHANGES</Button></Fade>}</div>
                </div>
                <div className="deck-thumbnails">
                    <CardInformationContainerContextProvider>
                        {cardList}
                    </CardInformationContainerContextProvider>
                </div>
            </div>
            <div className="chart-container">
                <ReactEcharts
                    option={{
                        title: {
                            text: 'Overall Statistics',
                            textStyle: {
                                color: "#fff",
                                fontWeight: 'normal',
                                fontSize: 56,
                                align: 'center'
                            },
                            left: 200

                        },
                        tooltip: {},
                        series: [{
                            type: 'pie',
                            radius: '70%',
                            center: ['50%', '50%'],
                            color: graphColors,
                            data: manaCount,
                            roseType: 'radius',
                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }]
                    }}
                    style={{ height: '500px', width: '100%' }}
                ></ReactEcharts>
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


