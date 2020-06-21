import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import './card-thumbnail.css'
import { useEffect } from 'react';

import axios from 'axios'
import { animated, useSpring } from 'react-spring'
import { useCardInformationContext } from '../Context/Context'

function replaceManaTagForNames(manaObject) {
    switch (manaObject.color) {
        case 'number':
            manaObject.color = 'Generic'
            manaObject.hex = '#5A5A5A'
            manaObject.fontHex = '#fff'

            return manaObject
        case 'U':
            manaObject.color = 'Blue'
            manaObject.hex = '#1E9CEE'
            manaObject.fontHex = '#fff'
            return manaObject
        case 'B':
            manaObject.color = 'Black'
            manaObject.hex = '#363636'
            manaObject.fontHex = '#fff'
            return manaObject
        case 'W':
            manaObject.color = 'White'
            manaObject.hex = '#ffeba5'
            manaObject.fontHex = '#363636'
            return manaObject
        case 'R':
            manaObject.color = 'Red'
            manaObject.hex = '#FF3860'
            manaObject.fontHex = '#fff'
            return manaObject
        case 'G':
            manaObject.color = 'Green'
            manaObject.hex = '#47C774'
            manaObject.fontHex = '#fff'
            return manaObject
        case 'S':
            manaObject.color = 'Snow'
            manaObject.hex = '#a2eff2'
            manaObject.fontHex = '#86ccc1'
            return manaObject
    }
}

export const CardThumbNail = ({ item, data, updateCardList }) => {
    const [quantityButtonsVisibility, setQuantityButtonsVisibility] = useState(false)
    const [defaultQuantity, setDefaultQuantity] = useState(item.quantity)
    const [updatableCard, setUpdatableCard] = useState()
    const [changedState, setChangedState] = useState()
    const [cardDetail, setCardDetail] = useState([])
    const [cardBlur, setCardBlur] = useState(false)
    const [cardInfoVisibility, setCardInfoVisibility] = useState(false)
    const [props, setProps] = useSpring(() => ({ config: { duration: 250, tension: 500, friction: 1 }, height: '0px', position: 'absolute', margin: '1em 0', opacity: '0', color: "#ddd", zIndex: '5' }))

    const [manaTags, setManaTags] = useState([])
    const [manaCounter, setManaCounter] = useState([])

    const { cardVisible, setCardVisible } = useCardInformationContext()


    useEffect(() => {
        if (cardDetail.mana_counter != undefined) {
            setManaCounter(manaCounter => [...manaCounter, JSON.parse(cardDetail.mana_counter)])
        }
    }, [cardDetail])

    useEffect(() => {
        if (manaCounter !== undefined && manaCounter.length > 0) {
            manaCounter.map(item => {
                if (item !== undefined && item.length > 0) {
                    item.map((inner, index) => {
                        inner = replaceManaTagForNames(inner)
                        setManaTags(manaTags => [...manaTags,
                        <div key={index} className="mana-counter-tag">
                            <div className="mana-counter-color" style={{ background: inner.hex, color: inner.fontHex }}>
                                {inner.color}
                            </div>
                            <div className="mana-counter-quantity">
                                {inner.quantity}
                            </div>
                        </div>
                        ])
                    })
                }
            })
        }
    }, [manaCounter])

    useEffect(() => {
        if (cardVisible === true) {
            setProps({ height: '0px', opacity: '0', zIndex: '5' })
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


    useEffect(() => {

    }, [manaCounter])

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
            document.getElementsByClassName('chart-container')[0].style.opacity = '0';
            setProps({ height: '700px', opacity: '1', zIndex: '5' })
        } else {
            setProps({ height: '0px', opacity: '0', zIndex: '5' })
            document.getElementsByClassName('chart-container')[0].style.opacity = '1';
        }
    }, [cardInfoVisibility])

    return (
        <div className="card-thumbnail">
            <div className="card-thumbnail-quantity" onMouseOver={showButtons} onMouseOut={hideButtons}>
                <div style={{ visibility: quantityButtonsVisibility == true ? "visible" : "hidden", zIndex: 1 }}>
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
            <animated.div className={"card-information-container darker-theme"} style={props}>

                <div className="card-visual">
                    <div className="card-title">
                        {cardDetail.name}
                    </div>
                    <div className="image-big">
                        <img src={data.data.image_large} alt="" />
                    </div>
                    div 1
                </div>
                <div className="card-stats">
                    <div style={{ width: '100%', padding: '5em' }}>
                        <div className="mana-tags-container">
                            {manaTags}
                        </div>
                        <div className="stats-name">
                            <div className="stats-title" >Type:</div>
                            <div className="stats-value">{cardDetail.type_line}</div>
                        </div>
                        <div className="stats-name">
                            <div className="stats-title" >Artist:</div>
                            <div className="stats-value" >{cardDetail.artist}</div>
                        </div>
                        <div className="stats-name">
                            <div className="stats-title" >Border Color:</div>
                            <div className="stats-value">{cardDetail.border_color}</div>
                        </div>

                        <div className="stats-name">
                            <div className="stats-title" >Frame:</div>
                            <div className="stats-value">{cardDetail.frame}</div>
                        </div>

                        <div className="stats-name">
                            <div className="stats-title" >Rarity:</div>
                            <div className="stats-value">{cardDetail.rarity}</div>
                        </div>

                        <div className="stats-name">
                            <div className="stats-title" >Collector Number:</div>
                            <div className="stats-value">{cardDetail.collector_number}</div>
                        </div>
                        <div className="stats-name">
                            <div className="stats-title" >Release Date:</div>
                            <div className="stats-value">{cardDetail.released_at}</div>
                        </div>
                        <div className="stats-name">
                            <div className="stats-title" >Set Name:</div>
                            <div className="stats-value">{cardDetail.set_name} ({cardDetail.set})</div>
                        </div>

                        <div className="stats-name">
                            <div className="stats-title" >Set Type:</div>
                            <div className="stats-value">{cardDetail.set_type}</div>
                        </div>
                    </div>
                </div>
            </animated.div>
        </div>
    )
}