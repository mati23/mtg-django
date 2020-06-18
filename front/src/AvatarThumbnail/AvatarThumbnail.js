import React from 'react';
import { Button, Input, TextField, Chip, CircularProgress, Fade, Dialog } from '@material-ui/core';
import axios from 'axios'
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring'
import './avatar-thumbnail.css'
import CardSearcher from '../CardSearcher/CardSearcher';
import Context, { ContextProvider, CardInformationContainerContext, useAvatarThumbnailContext } from '../Context/Context';
import { CardThumbNail } from '../CardThumbnail/CardThumbnail';
import ReactEcharts from "echarts-for-react";
import CardInformationContainerContextProvider from '../Context/Context';

export default function AvatarThumbnail({ index, avatar, updateStyle, updateGrid }) {
    const [thumbnailStyle, setThumbnailStyle] = useState(false)
    const [props, setProps] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
    const [clicked, setClicked] = useState(true)
    const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
    const trans = (x, y, s) => ` scale(${s})`
    const { avatarSelected, setAvatarSelected } = useAvatarThumbnailContext()
    const [avatarIndex, setAvatarIndex] = useState(parseInt(null))

    const setActiveAvatar = (event) => {
        setAvatarIndex(parseInt(event.target.id))
        setAvatarSelected(parseInt(event.target.id))
        updateGrid(parseInt(event.target.id))
    }

    useEffect(() => {
        console.log(typeof avatarSelected)
        if (avatarIndex === avatarSelected) {
            setProps({ xys: calc(0, 0), boxShadow: '0px 0px 27px 25px rgba(230,100,53,1)' })
        } else {
            setProps({ xys: [0, 0, 1], boxShadow: '0px 0px 0px 0px rgba(255,255,255,0)' })
        }
    }, [avatarSelected])
    return (
        <animated.div key={index} className="avatar-thumbnail" style={
            { transform: props.xys.interpolate(trans), boxShadow: props.boxShadow }

        } onClick={(e) => setActiveAvatar(e)}>
            <img id={index} src={"data:image/jpg;base64, " + avatar.image}></img>
        </animated.div>

    )
}