const { ComponentDialog, WaterfallDialog } = require("botbuilder-dialogs");
const LocalStorage = require('node-localstorage').LocalStorage
const twilio = require('twilio')
const CONFIRMTICKETDIALOG = 'CONFIRMTICKET';
const CONFIRMTICKETDIALOGID = 'CONFIRMTICKETID'

const TWILIO_ACCOUNT_SID = 'AC1f1d4c3258dbbf4a99497f7962b73064';
const TWILIO_AUTH_TOKEN = '212a586934d9daa526044dcaf2587470';
const TWILIO_PHONE_NUMBER = '+14788181342';


const localStorage = new LocalStorage('./storage');

class ConfirmTkt extends ComponentDialog {
    constructor(conversationState) {
        super('id');

        this.addDialog(new WaterfallDialog('CONFIRMTICKET', [
            this.sendTicketConfirmation.bind(this)
        ]))
        this.initialDialogId = 'CONFIRMTICKET';

    }
    async sendTicketConfirmation(stepContext) {
        try {
            console.log("sendTicketConfirmation")
            const storedData = localStorage.getItem('usersData')
            const data = JSON.parse(storedData)
            const phoneNumber = ` +91${Number.tx}`
            // Your ticket confirmation message content
            const ticketConfirmationMessage = `Hi ${data.name} Your ticket is confirmed! \n \nTicket number is ${data.bookingId}, your Seat Number is :${data.Seat} from ${data.entsource} to ${data.entdes} on ${data.entDate}`;
            console.log(ticketConfirmationMessage)
            // Initialize the Twilio client
            const twilioClient = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

            // Send the ticket confirmation SMS
            await twilioClient.messages.create({
                body: ticketConfirmationMessage,
                from: TWILIO_PHONE_NUMBER,
                to:`+91${data.tx}`
            });

            await stepContext.context.sendActivity(`Hi ${data.name}, Your ticket sent to you Successfully.`);
            return await stepContext.beginDialog('menuId'); // End the dialog after sending the message
        } catch (error) {
            console.error('Error sending message:', error);
            await stepContext.context.sendActivity('Error sending the ticket confirmation message.');
            return await stepContext.endDialog();
        }
    }
}


module.exports.ConfirmTkt = ConfirmTkt;