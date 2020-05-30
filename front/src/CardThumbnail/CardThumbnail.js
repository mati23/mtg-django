import React, { useState } from 'react';
import { Button, Input, TextField, Chip, CircularProgress } from '@material-ui/core';
import './card-thumbnail.css'
import { useEffect } from 'react';
export const CardThumbNail = ({ item, data, updateCardList }) => {
    const [quantityButtonsVisibility, setQuantityButtonsVisibility] = useState(false)
    const [defaultQuantity, setDefaultQuantity] = useState(0)

    useEffect(() => {
        setDefaultQuantity(item.quantity)
    }, [])

    const showButtons = () => {
        setQuantityButtonsVisibility(true)
    }
    const hideButtons = () => {
        setQuantityButtonsVisibility(false)
    }

    const increaseCounter = (deckId) => {
        updateCardList()
        if (defaultQuantity <= 3) {
            setDefaultQuantity(defaultQuantity + 1)

        }
    }
    const decreaseCounter = (cardId) => {
        updateCardList()
        if (defaultQuantity >= 1) {
            setDefaultQuantity(defaultQuantity - 1)

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
                <div style={{ color: item.quantity == defaultQuantity ? "#333" : "#206CD9" }} >{defaultQuantity}X </div>
                <div style={{ visibility: quantityButtonsVisibility == true ? "visible" : "hidden" }}>
                    <Button className="green-background card-quantity-button" size="small" variant="contained" onClick={increaseCounter}>
                        +
                </Button>
                </div>
            </div>
            <img src={data.data.image_png} alt="" />
        </div>
    )
}