
module.exports.ForContactCard = ()=>{
    return {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.3",
        "body": [
            {
                "type": "Image",
                "url": "https://i.gifer.com/PNl.gif",
                "size": "Medium",
                "horizontalAlignment": "Center",
                "backgroundColor": "red",
                "width": "350px",
                "height": "200px"
            },
            {
                "type": "TextBlock",
                "text": "Provide Your Contact Information",
                "weight": "Bolder",
                "size": "Medium",
                "margin": "Medium",
                "color": "Good",
                "horizontalAlignment": "Center"
            },
            {
                "type": "Input.Text",
                "id": "name",
                "placeholder": "Your Name",
                "isRequired": true,
                "label": "Name",
                "spacing": "Small",
                "errorMessage": "Specify Correct data"
            },
            {
                "type": "Input.Text",
                "id": "email",
                "placeholder": "Your Email",
                "isRequired": true,
                "style": "Email",
                "label": "Email",
                "errorMessage": "Specify Correct data"
            },
            {
                "type": "Input.Text",
                "placeholder": "Contact Number",
                "id": "tx",
                "label": "Phone Number : "
            },
            {
                "type": "Input.Text",
                "placeholder": "No of passengers",
                "id": "pep",
                "label": " Passengers Info : "
            }
        ],
        "actions": [
            {
                "type": "Action.Submit",
                "title": "Submit",
                "data": {
                    "type": "booking"
                },
                "style": "positive",
                "associatedInputs": "auto"
            }
        ],
        "id": "txt"
    }
    
}