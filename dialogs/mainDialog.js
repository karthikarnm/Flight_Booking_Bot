// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.


const { ComponentDialog, DialogSet, DialogTurnStatus, TextPrompt, WaterfallDialog } = require('botbuilder-dialogs');
const { Decider } = require('../NLP/decider')
const { extractAllEntities } = require('../NLP/Extractor')
const { WaterFall1 } =  require('../dialogs/waterFall1')
const { WaterFall2 } =  require('../dialogs/waterFall2')

const MAIN_WATERFALL_DIALOG = 'mainWaterfallDialog';

const WATERFALL_DIALOG1 = 'mainWaterfallDialog1'

class MainDialog extends ComponentDialog {
    constructor(conversationState) {
        super('MainDialogID');
        this.addDialog(new TextPrompt('TextPrompt'))
            // .addDialog(new WaterFall1() )
         this.addDialog(new WaterFall2(conversationState) )
         this.addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
                this.introStep.bind(this),
                this.actStep.bind(this),
                // this.finalStep.bind(this)
            ]));
            this.addDialog(new WaterfallDialog(WATERFALL_DIALOG1, [
                this.step3.bind(this),
                this.step4.bind(this),
            ]));

        this.initialDialogId = MAIN_WATERFALL_DIALOG;
    }
    async introStep(stepContext) {
        try {
            console.log("step1");
            await stepContext.context.sendActivity("how ma i help you ");
            return ComponentDialog.EndOfTurn
        } catch (error) {
            console.error("Error in step1:", error);
            throw error;
        }
    }

    async actStep(stepContext) {
        try {
            console.log("step2");
            let activity = stepContext.context.activity.text;
            console.log(activity)
            const analyzer = await Decider(activity);
            // console.log("@@@@@",analyzer.entities)
            const ext = await extractAllEntities(analyzer.entities);
            console.log(ext)
            if (ext) {
                // Begin WaterFall1 dialog with ext data
                return await stepContext.beginDialog(WATERFALL_DIALOG1, {
                    ext
                });
            } else {
                // Begin WaterFall2 dialog with stepContext.values.ext data
                await stepContext.beginDialog('WATERFALL2', { ext: stepContext.values.ext });
            }

            return await stepContext.endDialog();

            
        } catch (error) {
            console.error("Error in step2:", error);
            throw error;
        }
    }
    async step3(stepContext) {
        try {

            console.log("stepContext 3", stepContext.options.ext);

            if (stepContext.options && stepContext.options?.ext) {
                await stepContext.context.sendActivity("NLP FLOW ");
                stepContext.values.ext = stepContext.options.ext;
            } else {
                await stepContext.context.sendActivity("NOrmal FLow");
            }
            return await stepContext.next();
        } catch (error) {
            console.error("Error in stepContext3:", error);
            throw error;
        }
    }
    
    async step4(stepContext) {
    
            try {
                console.log("stepContext4", stepContext.values.ext);
        
                // Check if stepContext.values.ext is defined and has the expected properties
                if (stepContext.values.ext && stepContext.values.ext.date && stepContext.values.ext.source && stepContext.values.ext.des && stepContext.values.ext.type) {
                    console.log("stepContext 4", stepContext.values.ext.type);
                    // Begin WaterFall2 dialog with ext data
                    await stepContext.beginDialog('WATERFALL2', { ext: stepContext.values.ext });
                } else {
                    // Handle the case when ext is not defined or does not have the expected properties
                    await stepContext.beginDialog('WATERFALL2', { ext: stepContext.values.ext })
                }
            
            } catch (error) {
                console.error("Error in step4:", error);
                throw error;
            }
            return ComponentDialog.EndOfTurn;
        
        }
        
}

module.exports.MainDialog = MainDialog;
