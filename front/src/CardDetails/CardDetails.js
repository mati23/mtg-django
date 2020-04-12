import React from 'react';
import './card-details.css';
import { Button, Input, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios'
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const getObjectById = (id) => {
    let response = axios.get('http://127.0.0.1:8001/card/' + id).then(result => {
        console.log(result)
    }).catch(error => { console.log(error) })
    return response
}

function CardDetails() {
    const params = useParams()
    console.log(params)
    let object = getObjectById(params.id)
    return (
        <div className="card-details">

        </div>
    );
}

export default CardDetails;
