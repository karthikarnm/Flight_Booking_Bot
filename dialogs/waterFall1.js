const { ComponentDialog, WaterfallDialog } = require("botbuilder-dialogs");
const { WaterFall2 } =  require('../dialogs/waterFall2')

const WATERFALL_DIALOG1 = 'WATERFALLDIALOG1'

class WaterFall1 extends ComponentDialog{
    constructor(){
        super('WATERFALL1');
    
        this.addDialog(new WaterFall2() )
       this.addDialog(new WaterfallDialog(WATERFALL_DIALOG1, [
            this.step3.bind(this),
            this.step4.bind(this),
        ]));
        this.initialDialogId = WATERFALL_DIALOG1;
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

module.exports.WaterFall1 = WaterFall1