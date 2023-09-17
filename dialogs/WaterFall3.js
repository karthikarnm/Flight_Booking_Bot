const { CardFactory } = require("botbuilder");
const { ComponentDialog, WaterfallDialog, DialogTurnStatus, TextPrompt, ChoicePrompt, ChoiceFactory } = require("botbuilder-dialogs");


const { ForContactCard } = require('../Cards/Contact');
const { VerifyCard } = require('../Cards/Verify');
const { paymentCard } = require('../Cards/PaymentCard')
const { PassengerList } = require('../Cards/passList')

const choices = new TextPrompt('choice');
const choicePrompt = new ChoicePrompt('choicePrompt');
const CONFIRM_PROMPT = new  ChoicePrompt('confirmPrompt')
const { OtpVerificationDialog } = require('./OtpDialog')

const WATERFALL_DIALOG3 = 'WATERFALLDIALOG3'


const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./storage');


class WaterFall3 extends ComponentDialog{
    constructor(conversationState){
        super('WaterFall3Id')
        this.addDialog(choices)
        this.addDialog(choicePrompt);
        this.addDialog(CONFIRM_PROMPT);
        this.addDialog(new OtpVerificationDialog(conversationState))
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG3, [
        
            this.Contact.bind(this),
            this.ContactDetails.bind(this),
            // this.Otp.bind(this),
            this.PaymentEntry.bind(this),
            this.paymentDet.bind(this)
        ]));
        this.initialDialogId = WATERFALL_DIALOG3;
    }
    async Contact(stepContext) {
        try {
            stepContext.values.Seating = stepContext.options.set
            stepContext.values.ext = stepContext.options.ext;
            console.log("contact",  stepContext.values.Seating)
          
            const adaptiveCard = CardFactory.adaptiveCard(ForContactCard())
            await stepContext.context.sendActivity({
                attachments: [adaptiveCard]
            });

            return ComponentDialog.EndOfTurn;
        } catch (error) {
            console.error("Error in Contact:", error);
            throw error;
        }
    }

    async ContactDetails(stepContext) {
        try {

            console.log("Contact Details", stepContext.context.activity.value, "Entities", stepContext.values.ext)

            const payload1 = stepContext.context.activity.value
            const ext = stepContext.values.ext

            const entDate = stepContext.values.ext.date || stepContext.values.ext.dat;
            const entsource = stepContext.values.ext.source || stepContext.values.ext.src;
            const entdes = stepContext.values.ext.des || stepContext.values.ext.dest;
            const entcla = stepContext.values.ext.type || stepContext.values.ext.cla;
            const Seat = stepContext.values.Seating;
            const flight =  stepContext.values.ext.payloadFlight;

            const bookingId = "#" + Math.floor(10000000 + Math.random() * 90000000).toString();

            payload1.bookingId = bookingId;
            payload1.entDate = entDate;
            payload1.entsource = entsource;
            payload1.entdes = entdes;
            payload1.entcla = entcla;
            payload1.Seat = Seat;
            payload1.flight =  flight
            
            
            const storedData = localStorage.getItem('PassengerData')
        const data = JSON.parse(storedData)
        data.bookingId = bookingId
        payload1.data = data
            console.log("payload", payload1)
            console.log(data.age)
            localStorage.setItem('usersData', JSON.stringify(payload1))
            if (stepContext.context.activity.value) {
                const Details = CardFactory.adaptiveCard(VerifyCard(payload1))
                const Details1 = CardFactory.adaptiveCard(PassengerList(payload1.data))
                await stepContext.context.sendActivity({ attachments: [Details] });
                await stepContext.context.sendActivity({ attachments: [Details1] });
                const choices = ['Yes', 'No'];
                const promptOptions = {
                    prompt: 'Are You Sure to continue :',
                    retryPrompt: 'I didn\'t catch that. Please choose "Yes" or "No".',
                    choices: ChoiceFactory.toChoices(choices),
                };

                return await stepContext.prompt('choicePrompt', promptOptions);
            }
        } catch (error) {
            console.error("Error in ContactDetails:", error);
            throw error;
        }
    }

    async PaymentEntry(stepContext) {
        try {
            console.log("payment Prompt", stepContext.result.value)
            const choice = stepContext.result.value;
            if (choice) {
                const payment = CardFactory.adaptiveCard(paymentCard());
                await stepContext.context.sendActivity({ attachments: [payment] });
            } else {
                console.log("PaymentEntry")
            }
            return ComponentDialog.EndOfTurn;
        } catch (error) {
            console.error("Error in PaymentEntry:", error);
            throw error;
        }
    }

    async paymentDet(stepContext) {
        try {
            console.log("payment details", stepContext.context.activity.value)
            const choice = stepContext.context.activity.value;
            if (choice) {
                return await stepContext.beginDialog('otpId');
            } else {
                await stepContext.context.sendActivity("Not Prompted")
            }
            return ComponentDialog.EndOfTurn;
        } catch (error) {
            console.error("Error in paymentDet:", error);
            throw error;
        }
    }
}
module.exports.WaterFall3 = WaterFall3