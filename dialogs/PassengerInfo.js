const { ComponentDialog, WaterfallDialog, ChoicePrompt, TextPrompt, NumberPrompt, ChoiceFactory } = require("botbuilder-dialogs");

const { WaterFall3 } = require('./WaterFall3')

const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./storage');

const num = new NumberPrompt('num');
const text1 = new TextPrompt('Text1');
const text2 = new TextPrompt('Text2');

const choicePrompt = new ChoicePrompt('choicePrompt');
const CONFIRM_PROMPT = new ChoicePrompt('confirmPrompt')

class passengerInfo extends ComponentDialog {
    constructor(conversationState) {
        super('passId');

        this.addDialog(text1)
        this.addDialog(num)
        this.addDialog(text2)

        this.addDialog(choicePrompt);

        this.addDialog(new WaterFall3(conversationState))

        this.addDialog(new WaterfallDialog('WATERFALL_DIALOG3', [
            this.PassengerName.bind(this),
            this.PassengerAge.bind(this),
            this.PassengerSex.bind(this),
            this.details.bind(this),
            this.list.bind(this)
        ]))

        this.initialDialogId = 'WATERFALL_DIALOG3'
    }
    async PassengerName(stepContext) {

        try {   
            stepContext.values.Seating = stepContext.options.set
            stepContext.values.ext = stepContext.options.ext;
            console.log("PassengerName");
            await stepContext.context.sendActivity(`Your selected seat is ${stepContext.values.Seating} please enter Passenger Details :`);
            await stepContext.context.sendActivity("Please enter Passenger Name.");
            return await stepContext.prompt('Text1');
        } catch (error) {
            console.error("Error in PassengerName:", error);
            throw error; // Re-throw the error to be handled by the error handler.
        }
    }

    async PassengerAge(stepContext) {
        try {
            console.log("PassengerAge");
            stepContext.values.text1 = stepContext.result;
            if (stepContext.values.text1) {
                await stepContext.context.sendActivity("Please enter Passenger Age.");
                return await stepContext.prompt('num');
            } else {
                await stepContext.context.sendActivity("Please verify ");

            }
        } catch (error) {
            console.error("Error in PassengerAge:", error);
            throw error;
        }
    }

    async PassengerSex(stepContext) {
        try {
            console.log("PassengerGender");
            stepContext.values.num = stepContext.result;
            if (stepContext.values.num) {
                await stepContext.context.sendActivity("Please enter Passenger Gender.");
                return await stepContext.prompt('Text2');
            } else {
                await stepContext.context.sendActivity("Please verify ");

            }
      

        } catch (error) {
            console.error("Error in PassengerSex:", error);
            throw error;
        }
    }
    async details(stepContext) {
        try {
            console.log("details od passenger");
            stepContext.values.text2 = stepContext.result;
            if (stepContext.values.text2) {
                const age = stepContext.values.num;
                const name = stepContext.values.text1;
                const gender = stepContext.values.text2;


                const ext1 = {};

                ext1.age = age;
                ext1.name = name;
                ext1.gender = gender;
                console.log(ext1)

                localStorage.setItem('PassengerData', JSON.stringify(ext1))
          
                if (ext1) {
                    const choices = ['Yes', 'No'];
                    const promptOptions = {
                        prompt: 'Do you want to Enter another Passenger details:',
                        retryPrompt: 'I didn\'t catch that. Please choose "Yes" or "No".',
                        choices: ChoiceFactory.toChoices(choices),
                    };

                    return await stepContext.prompt('choicePrompt', promptOptions);

                }
                else {
                    console.log("error at storing")
                }
            }
        } catch (error) {
            console.error("Error in PassengerSex:", error);
            throw error;
        }
    }
    async list(stepContext) {
        console.log("list");
        const choice = stepContext.result;
        if (choice.value === 'Yes') {
            return await stepContext.beginDialog('WATERFALL_DIALOG3')

        } else {
            // return await stepContext.beginDialog('WATERFALL_DIALOG3')
            return await stepContext.beginDialog('WaterFall3Id',{ set : stepContext.values.Seating, ext : stepContext.values.ext  })

        }

    } catch(error) {
        console.error("Error in PassengerSex:", error);
        throw error;
    }
}




module.exports.passengerInfo = passengerInfo;