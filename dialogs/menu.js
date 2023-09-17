
const { ComponentDialog, DialogSet, DialogTurnStatus, TextPrompt, WaterfallDialog } = require('botbuilder-dialogs');
const { MessageFactory, CardFactory } = require('botbuilder');

const {MainDialog} = require('./mainDialog')
const {QnADialog} = require('./bot')
const { TicketTracking } =require('./Tickettrack')
const ROOT_WATERFALL_DIALOG = 'ROOTWATERFALLDIALOG';

class MenuDialog extends ComponentDialog{
    constructor(conversationState){
        super('menuId');
        this.addDialog(new MainDialog(conversationState) )
        this.addDialog(new QnADialog(conversationState) )
        this.addDialog(new TicketTracking(conversationState) )
        this.addDialog(new WaterfallDialog(ROOT_WATERFALL_DIALOG, [
            this.menu.bind(this),
            this.introStep.bind(this),
         
            // this.finalStep.bind(this)
        ]));
        this.initialDialogId = ROOT_WATERFALL_DIALOG;

    }
    async menu(stepContext) {
        console.log("menu step")
        // Create a hero card with buttons
        try{
        const card = CardFactory.heroCard(
            'Choose an option:',
            null,
            [
                {
                    type: 'imBack',
                    title: 'Book a Flight',
                    value: 'Book a Flight'
                },
                {
                    type: 'imBack',
                    title: 'Flight Tracking',
                    value: 'Flight Tracking'
                },
                {
                    type: 'imBack',
                    title: 'Help',
                    value: 'Help'
                }
            ]
        );

        // Attach the card to a message and send it
        const message = MessageFactory.attachment(card);
       await stepContext.context.sendActivity(message);
       return ComponentDialog.EndOfTurn
        
        }
        catch(err){
            console.log(err, "Error")
        }
    }
    async introStep(stepContext) {
        try {
            console.log("step1");
            const userMessage = stepContext.context.activity.text;

        switch (userMessage) {
            case 'Book a Flight':
                await stepContext.context.sendActivity('You selected: Book a Flight. How can I assist you with booking a flight?');
                return await stepContext.beginDialog('MainDialogID')
                break;

            case 'Flight Tracking':
                await stepContext.context.sendActivity('You selected: Flight Tracking. Please provide your flight details for tracking.');
                return await stepContext.beginDialog('TrackID')
                break;

            case 'Help':
                await stepContext.context.sendActivity('You selected: Help. How can I assist you?');
                return await stepContext.beginDialog('CQAID')
                break;

            default:
                await stepContext.context.sendActivity("I'm sorry, I didn't understand your selection.");
                break;
        }

        return ComponentDialog.EndOfTurn
    
        } catch (error) {
            console.error("Error in step1:", error);
            throw error;
        }
    }
}

module.exports.MenuDialog = MenuDialog;
