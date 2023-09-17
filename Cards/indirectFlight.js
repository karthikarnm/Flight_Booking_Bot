module.exports.IndirectflightCard = (matchingFlights) => {
    
    console.log(matchingFlights);

    const adaptiveCards = [];

    for (const flight of matchingFlights) {
        const adaptiveCard = {
            "type": "AdaptiveCard",
            "body": [
                {
                    "type": "TextBlock",
                    "text": "IndirectFlights",
                    "size": "Medium",
                    "weight": "Bolder"
                }
            ],
            "actions": [
                {
                    "type": "Action.ShowCard",
                    "title": `IndirectFlight ${flight['reservationFor']['IndirectflightNumber']}`,
                    "card": {
                        "type": "AdaptiveCard",
                        "body": [
                            {
                                "type": "TextBlock",
                                "text": `${flight['reservationFor']['IndirectflightNumber']}`,
                                "size": "Medium",
                                "weight": "Bolder"
                            },
                            {
                                "type": "TextBlock",
                                // "text": `VIA: ${flight['reservationFor']['IndirectdepartureAirport']['citys']}`,
                                "wrap": true
                            },
                            {
                                "type": "TextBlock",
                                "text": `Departure Airport: ${flight['reservationFor']['departureAirport']['name']}`,

                                "wrap": true
                            },                            {
            
                                "type": "TextBlock",
                                "text": `Destination City: ${flight['reservationFor']['arrivalAirport']['city']}`,
                                "wrap": true
                            },
                            {
                                "type": "TextBlock",
                                "text": `Destination Airport: ${flight['reservationFor']['arrivalAirport']['name']}`,
                                "wrap": true
                            },
                            {
                                "type": "TextBlock",
                                "text": `Seller Name: ${flight['reservationFor']['seller']['name']}`,
                                "wrap": true
                            },
                            {
                                "type": "TextBlock",
                                "text": `arrivalTime: ${flight['reservationFor']['arrivalTime']}`,
                                "wrap": true
                            },
                            {
                                "type": "TextBlock",
                                "text": "Price: $250",
                                "wrap": true
                            }
                        ],
                        "actions": [
                            {
                                "type": "Action.Submit",
                                "title": `Select Flight ${flight['reservationFor']['flightNumber']}`,
                                "data": {
                                    "flightSelection": `Flight ${flight['reservationFor']['flightNumber']}`
                                }
                            }
                        ]
                    },
                    "iconUrl": "https://cdn-icons-png.flaticon.com/128/8188/8188928.png"
                }
            ],
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3"
        };

        adaptiveCards.push(adaptiveCard);
    }

    return adaptiveCards;
};
