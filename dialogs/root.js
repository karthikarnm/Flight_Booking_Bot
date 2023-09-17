const { ComponentDialog, WaterfallDialog, Dialog, DialogSet, DialogTurnStatus } = require("botbuilder-dialogs");
const { MainDialog } =  require('./mainDialog')
const { MenuDialog } =  require('./menu')

const   ROOT_WATERFALL_DIALOG = 'WATERFALLDIALOG1'

class Root extends ComponentDialog{
    constructor(conversationState){
        super('WATERFALL1');
    
        this.addDialog(new MenuDialog(conversationState) )

        this.addDialog(new WaterfallDialog(ROOT_WATERFALL_DIALOG, [
        this.InitialStep.bind(this)
        ]));
        this.initialDialogId = ROOT_WATERFALL_DIALOG;

    }
    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }
  async InitialStep(stepContext) {
    try {
 
       return await stepContext.beginDialog('menuId');
        
        //  return stepContext.endDialog();
    } catch (error) {
        console.error('Error in InitialStep:', error);
        await stepContext.context.sendActivity('An error occurred. Please try again later.');
        return stepContext.endDialog('Dialog ended due to an error.');
    }
}

    
}

module.exports.Root = Root