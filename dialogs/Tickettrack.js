const { ComponentDialog, WaterfallDialog, ChoicePrompt, ChoiceFactory } = require("botbuilder-dialogs");

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./storage');

const choicePrompt = new ChoicePrompt('choicePrompt');
const choicePrompt1 = new ChoicePrompt('choicePrompt1');

const TRACK_DIALOG_ID = 'TRACK'

class TicketTracking extends ComponentDialog {
    constructor() {
        super('TrackID')
        this.addDialog(choicePrompt);
        this.addDialog(choicePrompt1);

        this.addDialog(new WaterfallDialog(TRACK_DIALOG_ID, [
            this.AskId.bind(this),
            this.VerifyId.bind(this),
            // this.choice.bind(this),
            this.returnData.bind(this),
          
        ]))
        this.initialDialogId = TRACK_DIALOG_ID

    }

    async AskId(stepContext) {
        try {
            console.log("AskId")
            await stepContext.context.sendActivity("Please enter your ticket Number");
            return ComponentDialog.EndOfTurn;

        }
        catch (err) {
            console.log(err)
        }
    }
    async VerifyId(stepContext) {
        try {
            console.log("VerifyId")
            const activity = stepContext.result
            const storedData = localStorage.getItem('usersData')
            const data = JSON.parse(storedData)

            if (activity === data.bookingId) {
                const details = `Your Flight Details\n 
                                \nBooking Id : ${data.bookingId}
                                \nName : ${data.name}\n
                                \nEmail : ${data.email}\n
                                \nFlight Number : ${data.flight.flightSelection}\n
                                \nSource : ${data.entsource}\n
                                \nDestination : ${data.entdes}\n
                                \nSeat : ${data.Seat}\n
                                \n \nStatus : 🟢 BOOKED`

                await stepContext.context.sendActivity(details)
                console.log("choice")
                const choices = ['Yes', 'No'];
                const promptOptions = {
                    prompt: 'Do You Want to Go Back to Menu :',
                    retryPrompt: 'I didn\'t catch that. Please choose "Yes" or "No".',
                    choices: ChoiceFactory.toChoices(choices),
                };
    
                await stepContext.prompt('choicePrompt', promptOptions);
                return ComponentDialog.EndOfTurn
                
            }
            else {
                await stepContext.context.sendActivity(`there is nothing tickets with this ${data.bookingId}\n \nStatus : 🔴 NOT BOOKED `)
                
                console.log("choice")
                const choices = ['Yes', 'No'];
                const promptOptions = {
                    prompt: 'Do You Want to Go Back to Menu :',
                    retryPrompt: 'I didn\'t catch that. Please choose "Yes" or "No".',
                    choices: ChoiceFactory.toChoices(choices),
                };
    
                await stepContext.prompt('choicePrompt1', promptOptions);
                return ComponentDialog.EndOfTurn
            }
        }
        catch (err) {

        }

    }
    async returnData(stepContext) {
        try {
            console.log(" return menu", stepContext.result.value)
            const choice = stepContext.result.value;
            if (choice === 'Yes') {
                return await stepContext.beginDialog('menuId')
            } else {
                return await stepContext.beginDialog(  TRACK_DIALOG_ID)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports.TicketTracking = TicketTracking;