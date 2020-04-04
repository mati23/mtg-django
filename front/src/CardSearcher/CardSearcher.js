import React from 'react';
import './card_searcher.css';
import { Button, Input, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios'





const top100Films = [];
let getCardsByName = () => {
    let response = axios.get('http://127.0.0.1:8001/cards/');
    console.log(response);
}
function CardSearcher() {

    return (
        <div className="card-searcher-container">
            <Autocomplete
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                style={{ width: 300, background: '#f00' }}
                renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                onInputChange={getCardsByName}
            />
        </div>
    );
}

export default CardSearcher;
