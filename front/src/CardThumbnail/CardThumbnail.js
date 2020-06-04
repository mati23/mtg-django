import React, { useState } from 'react';
import { Button, Input, TextField, Chip, CircularProgress } from '@material-ui/core';
import './card-thumbnail.css'
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import axios from 'axios'
export const CardThumbNail = ({ item, data, updateCardList }) => {
    const [quantityButtonsVisibility, setQuantityButtonsVisibility] = useState(false)
    const [defaultQuantity, setDefaultQuantity] = useState(item.quantity)
    const [updatableCard, setUpdatableCard] = useState()
    const [changedState, setChangedState] = useState()
    const [cardDetail, setCardDetail] = useState([])


    useEffect(() => {
        console.log(item.id)
        getObjectById(item.id)
    }, [])
    useEffect(() => {
        updateCardList(item.id, defaultQuantity)
    }, [defaultQuantity])

    const showButtons = () => {
        setQuantityButtonsVisibility(true)
    }
    const hideButtons = () => {
        setQuantityButtonsVisibility(false)
    }

    const increaseCounter = (cardId) => {
        if (defaultQuantity <= 3) {
            setDefaultQuantity(defaultQuantity + 1)

        }
    }
    const decreaseCounter = (cardId) => {
        if (defaultQuantity >= 1) {
            setDefaultQuantity(defaultQuantity - 1)
            setChangedState(!changedState)
        }
    }
    function getObjectById(id) {
        if (id !== "" && id !== null && id !== undefined) {
            let response = axios.get('http://127.0.0.1:8001/card/' + id + "/").then(result => {
                console.log(result.data)
                setCardDetail(result.data)
            }).catch(error => { console.log(error) })
            return response
        }
    }
    return (
        <div className="card-thumbnail">
            <div className="card-thumbnail-quantity" onMouseOver={showButtons} onMouseOut={hideButtons}>
                <div style={{ visibility: quantityButtonsVisibility == true ? "visible" : "hidden" }}>
                    <Button className="red-background card-quantity-button" size="small" variant="contained" onClick={() => decreaseCounter(item.id)}>
                        -
                </Button>
                </div>
                <div className={item.quantity == defaultQuantity ? "quantity-not-edited" : "quantity-edited"} >{defaultQuantity}X </div>
                <div style={{ visibility: quantityButtonsVisibility == true ? "visible" : "hidden" }}>
                    <Button className="green-background card-quantity-button" size="small" variant="contained" onClick={() => increaseCounter(item.id)}>
                        +
                </Button>
                </div>
            </div>
            <img src={data.data.image_png} alt="" />
        </div>
    )
}