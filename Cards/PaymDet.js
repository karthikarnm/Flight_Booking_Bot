module.exports.paymentDet = () => {
    return {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.5",
        "body": [
            {
                "type": "TextBlock",
                "text": "Payment Successful",
                "size": "large",
                "weight": "bolder"
            },
            {
                "type": "TextBlock",
                "text": "Thank you for your payment!",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "text": "Booking Details:",
                "weight": "bolder"
            },
            {
                "type": "TextBlock",
                "text": "Booking ID: 123456",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "text": "Name: John Doe",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "text": "Seat Number: A1",
                "wrap": true
            }
        ],
        "actions": [
            {
                "type": "Action.Submit",
                "title": "Close",
                "data": {
                    "action": "closePaymentSuccessCard"
                }
            }
        ]
    }

}