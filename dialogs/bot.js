const { Decider } = require('../CQA/decider');

const { WaterfallDialog, ComponentDialog, ChoicePrompt, ChoiceFactory } = require('botbuilder-dialogs');

const choicePrompt = new ChoicePrompt('choicePrompt');

class QnADialog extends ComponentDialog{
    constructor(conversationState) {
        super('CQAID');
        this.addDialog(choicePrompt)
        
        this.addDialog(new WaterfallDialog('QnADialogwaterFall', [
            this.step1.bind(this),
            this.step2.bind(this),
            this.paymentDet.bind(this)
            
        ]))
        this.initialDialogId = 'QnADialogwaterFall';
    }
    async step1(stepContext) {
        console.log('CQA area')
        try{
        await stepContext.context.sendActivity("shoot some questions ")
        return ComponentDialog.EndOfTurn
        }
        catch(err){
            console.log(err)
        }
    }
    async step2(stepContext) {
        console.log('step2')
        let activity = stepContext.context.activity.text;
        const analyze = await Decider(activity);
        // if (analyze.status == true) {
        console.log("CQA", analyze.answer)
        await stepContext.context.sendActivity(analyze.answer)
        const choices = ['Yes', 'No'];
                const promptOptions = {
                    prompt: 'Still Struck, Do you wanna try again ? :',
                    retryPrompt: 'I didn\'t catch that. Please choose "Yes" or "No".',
                    choices: ChoiceFactory.toChoices(choices),
                };

                return await stepContext.prompt('choicePrompt', promptOptions);
    }
    async paymentDet(stepContext) {
        try {
            console.log("payment details", stepContext.result.value)
            const choice = stepContext.result.value;
            if (choice === 'Yes') {
                return await stepContext.beginDialog('QnADialogwaterFall');
            } else {
                return await stepContext.beginDialog('menuId');
            }
        } catch (error) {
            console.error("Error in paymentDet:", error);
            throw error;
        }
    }
}


module.exports.QnADialog = QnADialog;

