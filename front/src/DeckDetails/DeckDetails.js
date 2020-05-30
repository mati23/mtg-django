import React from 'react';
import { Button, Input, TextField, Chip, CircularProgress } from '@material-ui/core';
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
    const [updatableCardList, setUpdatableCardList] = useState("")

    useEffect(() => {
        console.log(updatableCardList)
    }, [updatableCardList])
    const [deckListHasChanged, setDeckListHasChanged] = useState(true)


    function getCardList(cardIdList) {
        let cards_json = JSON.parse(cardIdList)
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

    const updateCardList = useCallback((cardId) => {
        console.log("Atualizou", cardId)

    }, [])

    return (
        <div className="deck-detail-container">
            <CardSearcher deckId={params.id} updateList={() => updateList()}></CardSearcher>
            <div className="deck-title">{deck.title}</div>
            <div>{deck.deck_description}</div>
            <div className="deck-thumbnails">
                {cardList}
            </div>
        </div >
    )
}
export default DeckDetails;


