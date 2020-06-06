import React, { useEffect, useState } from 'react';
import './homepage.css'
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

var HashMap = require('hashmap')
var map = new HashMap()

function Homepage() {
    const [manaCount, setManaCount] = useState([])
    const [smallestNumber, setSmallestNumber] = useState(0)

    const allManaCost = () => {
        const response = axios.get('http://127.0.0.1:8001/')
            .then(result => {
                console.log(result)
                let json_result = []
                let newManaArray = []
                map.multi(
                    "R", 0,
                    "G", 0,
                    "U", 0,
                    "B", 0,
                    "W", 0,
                    "C", 0,
                )
                json_result = result.data.response
                json_result.map(item => {
                    if (item.color !== "number") {
                        map.set(item.color, item.quantity)
                        if (item.quantity > smallestNumber) {
                            setSmallestNumber(item.quantity)
                        }
                    }
                })
                map.forEach((value, key) => {
                    newManaArray.push(value)
                    console.log(key, value, newManaArray)

                })
                setManaCount(newManaArray)
            })
    }
    useEffect(() => {
        console.log(manaCount)
    }, [manaCount])
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
                            text: 'Global Mana Usage',
                            textStyle: {
                                color: "#fff",
                                fontWeight: 'normal',
                                fontSize: 46,
                                align: 'center',
                                fontFamily: 'Roboto',
                            },
                            left: 200

                        },
                        tooltip: {},
                        legend: {
                            data: ['Sales']
                        },
                        radar: {
                            splitNumber: 7,
                            splitArea: {
                                areaStyle: {
                                    color: ['rgba(3,3,3,0.1)',
                                        'rgba(3,3,3,0.2)',
                                        'rgba(3,3,3,0.3)',
                                        'rgba(3,3,3,0.4)',
                                        'rgba(3,3,3,0.5)',
                                        'rgba(3,3,3,0.5)',
                                        'rgba(3,3,3,0.5)'],
                                    shadowColor: 'rgba(255, 2544, 255, 0.1)',
                                    shadowBlur: 10
                                }
                            },
                            name: {
                                textStyle: {
                                    color: '#fff',
                                    backgroundColor: '#666',
                                    borderRadius: 3,
                                    padding: [10, 10],
                                    fontSize: 20
                                }
                            },
                            indicator: [
                                { name: 'Red', max: smallestNumber + Math.ceil(smallestNumber * 0.1), color: '#F24B5C' },
                                { name: 'Green', max: smallestNumber + Math.ceil(smallestNumber * 0.1), color: '#6BB073' },
                                { name: 'Blue', max: smallestNumber + Math.ceil(smallestNumber * 0.1), color: '#41b7cc' },
                                { name: 'Black', max: smallestNumber + Math.ceil(smallestNumber * 0.1), color: '#222' },
                                { name: 'White', max: smallestNumber + Math.ceil(smallestNumber * 0.1), color: '#d5d5d5' },
                                { name: 'Non-Color', max: smallestNumber + Math.ceil(smallestNumber * 0.1), color: '#B5BFD9' }
                            ],

                            shape: 'circle'
                        },
                        series: [{
                            type: 'radar',
                            data: [{
                                value: manaCount,
                                name: "Legend",
                                symbolSize: 10,
                                symbol: 'none',
                                lineStyle: {
                                    width: 5,
                                    color: '#ddd',
                                    shadowColor: 'rgba(255, 255, 255, 0.9)',
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                }
                            }],
                        }]
                    }}
                    style={{ height: '500px', width: '100%' }}
                ></ReactEcharts>
            </div>
        </div >
    );
}

export default Homepage;
