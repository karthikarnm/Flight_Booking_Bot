module.exports.paymentCard = ()=>{
    return {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.3",
        "body": [
            {
                "type": "TextBlock",
                "text": "Payment Details",
                "size": "Large",
                "weight": "Bolder"
            },
            {
                "type": "TextBlock",
                "text": "Product Name: Your Product Name",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "text": "Price: $100.00",
                "wrap": true
            },
            {
                "type": "Input.Number",
                "id": "quantity",
                "label": "Quantity",
                "value": 1,
                "min": 1
            },
            {
                "type": "Input.Text",
                "id": "name",
                "label": "Name on Card",
                "placeholder": "John Doe"
            },
            {
                "type": "Input.Text",
                "id": "cardNumber",
                "label": "Card Number",
                "placeholder": "**** **** **** ****"
            },
            {
                "type": "Input.Date",
                "id": "expirationDate",
                "label": "Expiration Date",
                "placeholder": "MM/YY"
            },
            {
                "type": "Input.Text",
                "id": "cvv",
                "label": "CVV",
                "placeholder": "***"
            }
        ],
        "actions": [
            {
                "type": "Action.Submit",
                "title": "Submit Payment",
                "data": {
                    "action": "submitPayment"
                }
            }
        ]
    }
}