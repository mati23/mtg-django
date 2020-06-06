import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import axios from 'axios'
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import ReactEcharts from "echarts-for-react";

function Homepage() {
    const [manaCount, setManaCount] = useState([])
    const [graphColors, setGraphColors] = useState([])
    const allManaCost = () => {
        const response = axios.get('http://127.0.0.1:8001/')
            .then(result => {
                console.log(result)
                let json_result = []
                let newManaArray = []
                json_result = result.data.response
                json_result.map(item => {
                    if (item.color !== "number") {
                        newManaArray.push(item.quantity)
                    }
                })
                setManaCount(newManaArray)
                console.log('result', json_result)
            })
    }
    useEffect(() => {
        allManaCost()
    }, [])
    function attributeStringToColor(array) {
        let color = []
        array.map(item => {
            switch (item.name) {
                case 'R':
                    color.push("#F06B51")
                    break
                case 'G':
                    color.push("#24645A")
                    break
                case 'U':
                    color.push("#1D97C1")
                    break
                case 'B':
                    color.push("#293138")
                    break
                case 'W':
                    color.push("#FBE4C3")
                    break
                case 'number':
                    color.push("#000")
                    break
                case 'S':
                    color.push("#5C929B")
                    break
                case 'C':
                    color.push("#7B7B7B")
                    break

            }
        })
        return color
    }
    return (
        <div>
            <div className="chart-container">
                <ReactEcharts
                    option={{
                        title: {
                            text: 'Overall Statistics',
                            textStyle: {
                                color: "#fff",
                                fontWeight: 'normal',
                                fontSize: 56,
                                align: 'center'
                            },
                            left: 200

                        },
                        tooltip: {},
                        legend: {
                            data: ['Sales']
                        },
                        radar: {
                            // shape: 'circle',
                            name: {
                                textStyle: {
                                    color: '#fff',
                                    backgroundColor: '#999',
                                    borderRadius: 3,
                                    padding: [3, 5]
                                }
                            },
                            indicator: [
                                { name: 'Red', max: 6500 },
                                { name: 'Green', max: 16000 },
                                { name: 'Blue', max: 30000 },
                                { name: 'Black', max: 38000 },
                                { name: 'White', max: 52000 },
                                { name: 'Non-Color', max: 25000 }
                            ],
                            shape: 'circle'
                        },
                        series: [{
                            name: 'Sales',
                            type: 'radar',
                            data: [{ value: manaCount, name: "dsa" }],

                        }]
                    }}
                    style={{ height: '500px', width: '100%' }}
                ></ReactEcharts>
            </div>
        </div>
    );
}

export default Homepage;
