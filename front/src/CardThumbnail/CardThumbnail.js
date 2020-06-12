import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import './card-thumbnail.css'
import { useEffect } from 'react';

import axios from 'axios'
import { animated, useSpring } from 'react-spring'
import { useCardInformationContext } from '../Context/Context'
export const CardThumbNail = ({ item, data, updateCardList }) => {
    const [quantityButtonsVisibility, setQuantityButtonsVisibility] = useState(false)
    const [defaultQuantity, setDefaultQuantity] = useState(item.quantity)
    const [updatableCard, setUpdatableCard] = useState()
    const [changedState, setChangedState] = useState()
    const [cardDetail, setCardDetail] = useState([])
    const [cardBlur, setCardBlur] = useState(false)
    const [cardInfoVisibility, setCardInfoVisibility] = useState(false)
    const [props, setProps] = useSpring(() => ({ height: '0px', position: 'absolute', background: '#ff0', margin: '1em 0', opacity: '0' }))

    const { cardVisible, setCardVisible } = useCardInformationContext()

    useEffect(() => {
        console.log(cardVisible)
        if (cardVisible === true) {
            setProps({ height: '0px', opacity: '0' })
            setCardVisible(false)
        }
    }, [cardVisible])

    useEffect(() => {
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
                setCardDetail(result.data)
            }).catch(error => { console.log(error) })
            return response
        }
    }
    const changeCardBlur = (visibility) => {
        setCardBlur(visibility)
    }
    const expandCardInfo = () => {
        //setCardInformationContext(false)
        setCardInfoVisibility(!cardInfoVisibility)
        setCardVisible(true)
    }

    useEffect(() => {
        if (cardInfoVisibility) {
            setProps({ height: '400px', opacity: '1' })
        } else {
            setProps({ height: '0px', opacity: '0' })
        }
    }, [cardInfoVisibility])

    return (
        <div className="card-thumbnail">
            <div style={{ background: "#aaa", position: 'absolute', zIndex: '9999', width: '100px', height: '100px', fontWeight: 'bold' }}>
                {cardVisible ? "true" : "false"}
            </div>
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
            <div onMouseOver={() => changeCardBlur(true)} onMouseOut={() => changeCardBlur(false)}>
                <div className="img-container">
                    <img src={data.data.image_png} alt="" />
                </div>
                <div className={cardBlur ? "blured-image" : "blured-image-container"} onClick={expandCardInfo} >
                    <div className="icon-container">
                        <i className="fas fa-search search-icon-big"></i>
                    </div>
                </div>

            </div>
            <animated.div className={"card-information-container"} style={props}>
                {cardDetail.name}
            </animated.div>
        </div>
    )
}