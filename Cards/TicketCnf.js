module.exports.TktCnf = ({name, bookingId, Seat, entDate }) =>{
    return {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.3",
        "body": [
            {
                "type": "Container",
                "items": [
                    {
                        "type": "TextBlock",
                        "text": "Ticket Confirmation",
                        "weight": "Bolder",
                        "size": "Large",
                        "color": "Accent",
                        "horizontalAlignment": "Center"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Booking Confirmed!",
                        "weight": "Bolder",
                        "size": "Medium",
                        "spacing": "Small"
                    },
                    {
                        "type": "TextBlock",
                        "text": `Thank you ${name} for choosing our services. Your ticket has been successfully booked.`,
                        "wrap": true,
                        "fontType": "Default"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Booking ID:",
                        "weight": "Bolder",
                        "size": "Medium",
                        "spacing": "Small"
                    },
                    {
                        "type": "TextBlock",
                        "text": bookingId,
                        "size": "Medium"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Passenger Name:",
                        "weight": "Bolder",
                        "size": "Medium",
                        "spacing": "Small"
                    },
                    {
                        "type": "TextBlock",
                        "text": name,
                        "size": "Medium"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Seat Number:",
                        "weight": "Bolder",
                        "size": "Medium",
                        "spacing": "Small"
                    },
                    {
                        "type": "TextBlock",
                        "text": Seat,
                        "size": "Medium"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Date of Travel:",
                        "weight": "Bolder",
                        "size": "Medium",
                        "spacing": "Small"
                    },
                    {
                        "type": "TextBlock",
                        "text": entDate,
                        "size": "Medium"
                    },
                    {
                        "type": "ColumnSet",
                        "columns": [
                            {
                                "type": "Column",
                                "width": "stretch",
                                "items": [
                                    {
                                        "type": "ColumnSet",
                                        "columns": [
                                            {
                                                "type": "Column",
                                                "width": "stretch"
                                            },
                                            {
                                                "type": "Column",
                                                "width": "stretch"
                                            },
                                            {
                                                "type": "Column",
                                                "width": "stretch",
                                                "items": [
                                                    {
                                                        "type": "Image",
                                                        "url": "https://media3.giphy.com/media/2tTh8Y9GbFt9xkYT4F/giphy.gif"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "backgroundImage": {
                    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpPatkDkAj7VvCrWB6YZ9qgtkNH9rlBsslJQ&usqp=CAU",
                    "verticalAlignment": "Center",
                    "horizontalAlignment": "Center"
                },
                "horizontalAlignment": "Left",
                "style": "accent",
                "bleed": true,
                "verticalContentAlignment": "Center"
            }
        ]
    }
}