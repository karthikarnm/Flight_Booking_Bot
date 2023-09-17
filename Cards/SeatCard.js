module.exports.seatCard = ({flightSelection})=>{
    return {
        "type": "AdaptiveCard",
        "version": "1.3",
        "body": [
            {
                "type": "Container",
                "items": [
                    {
                        "type": "TextBlock",
                        "text": `Your Selected Flight is ${flightSelection}`,
                        "size": "Large",
                        "weight": "Bolder"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Please choose your preferred seat from the available options:",
                        "wrap": true
                    }
                ]
            },
            {
                "type": "Container",
                "style": "emphasis",
                "items": [
                    {
                        "type": "ColumnSet",
                        "columns": [
                            {
                                "type": "Column",
                                "width": "auto",
                                "items": [
                                    {
                                        "type": "TextBlock",
                                        "text": "Row 1",
                                        "horizontalAlignment": "Center"
                                    },
                                    {
                                        "type": "ActionSet",
                                        "actions": [
                                            {
                                                "type": "Action.ToggleVisibility",
                                                "title": "1A",
                                                "targetElements": [
                                                    "selectedSeatLabel1A"
                                                ],
                                                "data": "1A"
                                            },
                                            {
                                                "type": "Action.ToggleVisibility",
                                                "title": "1B",
                                                "targetElements": [
                                                    "selectedSeatLabel1B"
                                                ],
                                                "data": "1B"
                                            },
                                            {
                                                "type": "Action.ToggleVisibility",
                                                "title": "1C",
                                                "targetElements": [
                                                    "selectedSeatLabel1C"
                                                ],
                                                "data": "1C"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "Column",
                                "width": "auto",
                                "items": [
                                    {
                                        "type": "TextBlock",
                                        "text": "Row 2",
                                        "horizontalAlignment": "Center"
                                    },
                                    {
                                        "type": "ActionSet",
                                        "actions": [
                                            {
                                                "type": "Action.ToggleVisibility",
                                                "title": "2A",
                                                "targetElements": [
                                                    "selectedSeatLabel2A"
                                                ],
                                                "data": "2A"
                                            },
                                            {
                                                "type": "Action.ToggleVisibility",
                                                "title": "2B",
                                                "targetElements": [
                                                    "selectedSeatLabel2B"
                                                ],
                                                "data": "2B"
                                            },
                                            {
                                                "type": "Action.ToggleVisibility",
                                                "title": "2C",
                                                "targetElements": [
                                                    "selectedSeatLabel2C"
                                                ],
                                                "data": "2C"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "Column",
                                "width": "auto",
                                "items": [
                                    {
                                        "type": "TextBlock",
                                        "text": "Row 3",
                                        "horizontalAlignment": "Center"
                                    },
                                    {
                                        "type": "ActionSet",
                                        "actions": [
                                            {
                                                "type": "Action.ToggleVisibility",
                                                "title": "3A",
                                                "targetElements": [
                                                    "selectedSeatLabel3A"
                                                ],
                                                "data": "3A",
                                                "id": "3A"
                                            },
                                            {
                                                "type": "Action.ToggleVisibility",
                                                "title": "3B",
                                                "targetElements": [
                                                    "selectedSeatLabel3B"
                                                ],
                                                "data": "3B"
                                            },
                                            {
                                                "type": "Action.ToggleVisibility",
                                                "title": "3C",
                                                "targetElements": [
                                                    "selectedSeatLabel3C"
                                                ],
                                                "data": "3C"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "id": "con",
                        "style": "accent",
                        "bleed": true,
                        "separator": true,
                        "horizontalAlignment": "Center",
                        "height": "stretch",
                        "selectAction": {
                            "type": "Action.ToggleVisibility"
                        }
                    },
                    {
                        "type": "TextBlock",
                        "text": "Selected Seat: 1A",
                        "wrap": true,
                        "id": "selectedSeatLabel1A",
                        "isVisible": false
                    },
                    {
                        "type": "TextBlock",
                        "text": "Selected Seat: 1B",
                        "isVisible": false,
                        "id": "selectedSeatLabel1B"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Selected Seat: 1C",
                        "isVisible": false,
                        "id": "selectedSeatLabel1C"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Selected Seat: 2A",
                        "isVisible": false,
                        "id": "selectedSeatLabel2A"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Selected Seat: 2B",
                        "isVisible": false,
                        "id": "selectedSeatLabel2B"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Selected Seat: 2C",
                        "isVisible": false,
                        "id": "selectedSeatLabel2C"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Selected Seat: 3A",
                        "isVisible": false,
                        "id": "selectedSeatLabel"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Selected Seat: 3B",
                        "isVisible": false,
                        "id": "selectedSeatLabel3B"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Selected Seat: 3C",
                        "isVisible": false,
                        "id": "selectedSeatLabel3C"
                    }
                ]
            }
        ],
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
    }
    }
    // return { 
    //     "type": "AdaptiveCard",
    //     "version": "1.3",
    //     "body": [
    //         {
    //             "type": "Container",
    //             "items": [
    //                 {
    //                     "type": "TextBlock",
    //                     "text": ` Your Selected  Flight is "${flightSelection}"`,
    //                     "size": "Large",
    //                     "weight": "Bolder"
    //                 },
    //                 {
    //                     "type": "TextBlock",
    //                     "text": "New TextBlock",
    //                     "wrap": true
    //                 },
    //                 {
    //                     "type": "TextBlock",
    //                     "text": "Please choose your preferred seat from the available options:",
    //                     "wrap": true
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "Container",
    //             "style": "emphasis",
    //             "items": [
    //                 {
    //                     "type": "ColumnSet",
    //                     "columns": [
    //                         {
    //                             "type": "Column",
    //                             "width": "auto",
    //                             "items": [
    //                                 {
    //                                     "type": "TextBlock",
    //                                     "text": "Row 1",
    //                                     "horizontalAlignment": "Center"
    //                                 },
    //                                 {
    //                                     "type": "ActionSet",
    //                                     "actions": [
    //                                         {
    //                                             "type": "Action.ToggleVisibility",
    //                                             "title": "1A",
    //                                             "targetElements": [
    //                                                 "selectedSeatLabel1A"
    //                                             ],
    //                                             "data": "1A"
    //                                         },
    //                                         {
    //                                             "type": "Action.ToggleVisibility",
    //                                             "title": "1B",
    //                                             "targetElements": [
    //                                                 "selectedSeatLabel1B"
    //                                             ],
    //                                             "data": "1B"
    //                                         },
    //                                         {
    //                                             "type": "Action.ToggleVisibility",
    //                                             "title": "1C",
    //                                             "targetElements": [
    //                                                 "selectedSeatLabel1C"
    //                                             ],
    //                                             "data": "1C"
    //                                         }
    //                                     ]
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             "type": "Column",
    //                             "width": "auto",
    //                             "items": [
    //                                 {
    //                                     "type": "TextBlock",
    //                                     "text": "Row 2",
    //                                     "horizontalAlignment": "Center"
    //                                 },
    //                                 {
    //                                     "type": "ActionSet",
    //                                     "actions": [
    //                                         {
    //                                             "type": "Action.ToggleVisibility",
    //                                             "title": "2A",
    //                                             "targetElements": [
    //                                                 "selectedSeatLabel2A"
    //                                             ],
    //                                             "data": "2A",
    //                                             "style": "positive"
    //                                         },
    //                                         {
    //                                             "type": "Action.ToggleVisibility",
    //                                             "title": "2B",
    //                                             "targetElements": [
    //                                                 "selectedSeatLabel2B"
    //                                             ],
    //                                             "data": "2B"
    //                                         },
    //                                         {
    //                                             "type": "Action.ToggleVisibility",
    //                                             "title": "2C",
    //                                             "targetElements": [
    //                                                 "selectedSeatLabel2C"
    //                                             ],
    //                                             "data": "2C"
    //                                         }
    //                                     ]
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             "type": "Column",
    //                             "width": "auto",
    //                             "items": [
    //                                 {
    //                                     "type": "TextBlock",
    //                                     "text": "Row 3",
    //                                     "horizontalAlignment": "Center"
    //                                 },
    //                                 {
    //                                     "type": "ActionSet",
    //                                     "actions": [
    //                                         {
    //                                             "type": "Action.ToggleVisibility",
    //                                             "title": "3A",
    //                                             "targetElements": [
    //                                                 "selectedSeatLabel3A"
    //                                             ],
    //                                             "data": "3A",
    //                                             "id": "3A"
    //                                         },
    //                                         {
    //                                             "type": "Action.ToggleVisibility",
    //                                             "title": "3B",
    //                                             "targetElements": [
    //                                                 "selectedSeatLabel3B"
    //                                             ],
    //                                             "data": "3B"
    //                                         },
    //                                         {
    //                                             "type": "Action.ToggleVisibility",
    //                                             "title": "3C",
    //                                             "targetElements": [
    //                                                 "selectedSeatLabel3C"
    //                                             ],
    //                                             "data": "3C"
    //                                         }
    //                                     ]
    //                                 }
    //                             ]
    //                         }
    //                     ],
    //                     "id": "con",
    //                     "style": "accent",
    //                     "bleed": true,
    //                     "separator": true,
    //                     "horizontalAlignment": "Center",
    //                     "height": "stretch",
    //                     "selectAction": {
    //                         "type": "Action.ToggleVisibility"
    //                     }
    //                 },
    //                 {
    //                     "type": "TextBlock",
    //                     "text": "Selected Seat:",
    //                     "isVisible": false,
    //                     "id": "selectedSeatLabel"
    //                 },
    //                 {
    //                     "type": "TextBlock",
    //                     "text": "Selected Seat: 1A",
    //                     "wrap": true,
    //                     "id": "selectedSeatLabel1A",
    //                     "isVisible": false
    //                 },
    //                 {
    //                     "type": "TextBlock",
    //                     "text": "Selected Seat: 1B",
    //                     "isVisible": false,
    //                     "id": "selectedSeatLabel1B"
    //                 },
    //                 {
    //                     "type": "TextBlock",
    //                     "text": "Selected Seat: 1C",
    //                     "isVisible": false,
    //                     "id": "selectedSeatLabel1C"
    //                 },
    //                 {
    //                     "type": "TextBlock",
    //                     "text": "Selected Seat: 2A",
    //                     "isVisible": false,
    //                     "id": "selectedSeatLabel2A"
    //                 },
    //                 {
    //                     "type": "TextBlock",
    //                     "text": "Selected Seat: 2B",
    //                     "isVisible": false,
    //                     "id": "selectedSeatLabel2B"
    //                 },
    //                 {
    //                     "type": "TextBlock",
    //                     "text": "Selected Seat: 2C",
    //                     "isVisible": false,
    //                     "id": "selectedSeatLabel2C"
    //                 },
    //                 {
    //                     "type": "TextBlock",
    //                     "text": "Selected Seat: 3A",
    //                     "id": "selectedSeatLabel3A"
    //                 },
    //                 {
    //                     "type": "TextBlock",
    //                     "text": "Selected Seat: 3B",
    //                     "isVisible": false,
    //                     "id": "selectedSeatLabel3B"
    //                 },
    //                 {
    //                     "type": "TextBlock",
    //                     "text": "Selected Seat: 3C",
    //                     "isVisible": false,
    //                     "id": "selectedSeatLabel3C"
    //                 }
    //             ]
    //         }
    //     ],
    //     "actions": [
    //         {
    //             "type": "Action.Submit",
    //             "title": "Confirm Seat Selection",
    //             "associatedInputs": [
    //                 "1A",
    //                 "1B",
    //                 "1C",
    //                 "2A",
    //                 "2B",
    //                 "2C",
    //                 "3A",
    //                 "3B",
    //                 "3C"
    //             ],
    //             "style": "positive",
    //             "id": "sub"
    //         }
    //     ],
    //     "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
    // }
