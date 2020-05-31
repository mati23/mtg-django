import React, { useState } from 'react';
import { Button, Input, TextField, Chip, CircularProgress } from '@material-ui/core';
import './card-thumbnail.css'
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
export const CardThumbNail = ({ item, data, updateCardList }) => {
    const [quantityButtonsVisibility, setQuantityButtonsVisibility] = useState(false)
    const [defaultQuantity, setDefaultQuantity] = useState(item.quantity)
    const [updatableCard, setUpdatableCard] = useState()
    const [changedState, setChangedState] = useState()

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