const { ActivityHandler, CardFactory } = require('botbuilder');

const { DialogBot } = require('./dialogBot');
const { WellComeBot } = require('../Cards/Wellcome')

class DialogAndWelcomeBot extends DialogBot {
    constructor(conversationState, userState, dialog) {
        super(conversationState, userState, dialog);

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    // const reply = `Welcome to Complex Dialog Bot ${ membersAdded[cnt].name }. This bot provides a complex conversation, with multiple dialogs. Type anything to get started.`;
                    // await context.sendActivity(reply);
                    const username = context.activity.from.name;
    
                    const welcomeCard = CardFactory.adaptiveCard(WellComeBot());
                    await context.sendActivity({ attachments: [welcomeCard] });

                }
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.DialogAndWelcomeBot = DialogAndWelcomeBot;

// const welcomeCard = CardFactory.adaptiveCard(WellComeBot());
// await context.sendActivity({ attachments: [welcomeCard] });