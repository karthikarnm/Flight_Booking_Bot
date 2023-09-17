module.exports.ConfirmCard = ()=>{
    return {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.3",
        "type": "AdaptiveCard",
        "body": [
            {
                "type": "TextBlock",
                "text": "Do you want to proceed for Payment :",
                "size": "Medium",
                "weight": "Bolder",
                "wrap": true,
                "separator": true,
                "fontType": "Default",
                "color": "Dark",
                "isSubtle": true
            }
        ],
        "actions": [
            {
                "type": "Action.Submit",
                "title": "Yes",
                "data": {
                    "confirmation": "yes"
                },
                "iconUrl": "https://cdn-icons-png.flaticon.com/128/0/614.png"
            },
            {
                "type": "Action.Submit",
                "title": "No",
                "data": {
                    "confirmation": "no"
                },
                "iconUrl": "https://cdn-icons-png.flaticon.com/128/565/565513.png"
            }
        ],
        "backgroundImage": {
            "url": "https://img.freepik.com/premium-photo/male-hand-holding-plane-airplane-icon-blue-background-banner-nline-ticket-purchase-travel-icons-about-travel-planning-transportation-hotel-flight-passport-flight-ticket-booking-concept_150455-12608.jpg",
            "horizontalAlignment": "Center",
            "verticalAlignment": "Center"
        }
    }

}