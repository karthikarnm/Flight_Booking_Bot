module.exports.WellComeBot = ()=>{
    return {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.3",
        "body": [
            {
                "type": "Container",
                "style": "emphasis",
                "backgroundImage": {
                    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1gmz46G_ZkMgWsgffiWRY9YZ6ajmOcrld_Q&usqp=CAU"
                },
                "items": [
                    {
                        "type": "Image",
                        "url": "https://i.pinimg.com/originals/31/63/5f/31635fd10983b3c0da798aaf8fabf25d.gif",
                        "horizontalAlignment": "Center"
                    },
                    {
                        "type": "TextBlock",
                        "text": " Welcome to FlightBooker, your personal flight booking assistant.\n I'm here to make your travel plans hassle-free and convenient.",
                        "size": "Default",
                        "weight": "Bolder",
                        "horizontalAlignment": "Left",
                        "color": "Dark",
                        "isSubtle": true,
                        "wrap": true,
                        "fontType": "Monospace",
                        "id": "txt1",
                        "separator": true,
                        "height": "stretch",
                        "maxLines": -1
                    },
                    {
                        "type": "Container",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Make a move :)",
                                "wrap": true,
                                "size": "Default",
                                "fontType": "Monospace",
                                "weight": "Default",
                                "color": "Accent"
                            }
                        ]
                    }
                ]
            }
        ]
    }
}