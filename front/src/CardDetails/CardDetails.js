import React from 'react';
import './card-details.css';
import { Button, Input, TextField, Chip } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring'
import Context, { ContextConsumer } from '../Context/Context';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 40, (x - window.innerWidth / 2) / 40, 1.3]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const CardDetails = ({ deckId, selectedCardId, newCardVisibility, printSomething }) => {

    const [cardVisibility, setCardVisibility] = useState({
        visibility: '',
    })
    const [cardObject, setCardObject] = useState({
        id: '',
        quantity: 0,
        deckId: ''
    })

    const lol = useEffect(() => {
        setCardQuantity(0)
        setCardObject({
            id: selectedCardId,
            quantity: cardQuantity,
            deckId: ''
        })
        console.log('olocobixo')
    }, [selectedCardId])


    const [cardQuantity, setCardQuantity] = useState(0)
    const [props, setProps] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 550, friction: 40 } }))
    const [cardImage, setCardImage] = useState("")
    const getObjectById = (id) => {
        if (id !== "" && id !== null && id !== undefined) {
            let response = axios.get('http://127.0.0.1:8001/card/' + id + "/").then(result => {
                setCardImage(result.data.image_normal)
            }).catch(error => { console.log(error) })
            return response
        }
    }
    const increaseCounter = () => {
        if (cardQuantity <= 3) {
            setCardQuantity(cardQuantity + 1)
            setCardObject({
                id: selectedCardId,
                quantity: cardQuantity + 1,
                deckId: deckId.deckId
            })
        }
    }
    const decreaseCounter = () => {
        if (cardQuantity >= 1) {
            setCardQuantity(cardQuantity - 1)
            setCardObject({
                id: selectedCardId,
                quantity: cardQuantity - 1,
                deckId: deckId.deckId
            })
        }
    }
    const changeVisibility = (state) => {
        state == false ? setCardVisibility("none") : setCardVisibility("block")
    }

    const params = useParams()
    if (selectedCardId !== "") {
        let object = getObjectById(selectedCardId)
    }
    const saveCardIntoDeck = (event, value) => {
        let response = axios.post("http://127.0.0.1:8001/deck/create", {
            "id": value.id,
            "quantity": value.quantity,
            "deckId": value.deckId
        })
    }

    return (
        <div style={{ display: newCardVisibility }} >
            <div className="card-details">
                <div className="card-thumbnail-container">
                    <animated.div className="card"
                        onMouseMove={({ clientX: x, clientY: y }) => setProps({ xys: calc(x, y) })}
                        onMouseLeave={() => setProps({ xys: [0, 0, 1] })}
                        style={{ transform: props.xys.interpolate(trans) }}
                    >
                        <img src={cardImage}></img>
                    </animated.div>
                </div>
                <div className="card-action-buttons">
                    <Button onClick={decreaseCounter} className="action-button" style={{ background: "#F03A5F" }}>Remove</Button>
                    <Chip label={cardQuantity}></Chip>
                    <Button onClick={increaseCounter} className="action-button" style={{ background: "#00C4A6" }}>Add</Button>
                </div>
                <div className="card-action-buttons">
                    <Button className={cardQuantity > 0 ? "button-enabled" : "button-disabled"}
                        disabled={cardQuantity > 0 ? false : true}
                        onClick={(event, value) => saveCardIntoDeck(event, cardObject)}>SAVE</Button>
                </div>

            </div>

        </div>
    );
}

export default CardDetails;
