const { WaterfallDialog, ComponentDialog, TextPrompt } = require('botbuilder-dialogs');
const { ActivityTypes, MessageFactory, CardFactory } = require('botbuilder');
const { randomInt } = require('crypto');

const { ConfirmTkt } = require('./CnfTicket')
const twilio = require('twilio')

const NodeCache = require('node-cache');
const cache = new NodeCache();

const LocalStorage = require('node-localstorage').LocalStorage

const localStorage = new LocalStorage('./storage');

const userdetails = localStorage.getItem('usersOtp')
    ;
const { TktCnf } = require('../Cards/TicketCnf')

// Replace these with your Twilio credentials and phone number
const TWILIO_ACCOUNT_SID = 'AC1f1d4c3258dbbf4a99497f7962b73064';
const TWILIO_AUTH_TOKEN = '212a586934d9daa526044dcaf2587470';
const TWILIO_PHONE_NUMBER = '+14788181342';

class OtpVerificationDialog extends ComponentDialog {
    constructor(conversationState) {
        super('otpId');


        this.addDialog(new TextPrompt('otpPrompt'));
        this.addDialog(new ConfirmTkt(conversationState))
        this.addDialog(
            new WaterfallDialog('otpVerificationDialog', [
                this.sendOtpStepContext.bind(this),
                this.verifyOtpStepContext.bind(this),
                this.tktcnf.bind(this)
            ])

        );
        this.initialDialogId = 'otpVerificationDialog'
    }

    async sendOtpStepContext(stepContext) {
        console.log("otpstepContext")
        const otp = generateOTP();
        const storedData = localStorage.getItem('usersData')
        const Number = JSON.parse(storedData)
        const phoneNumber = ` +91${Number.tx}`; // Replace with the user's phone number or get it from user input
        console.log(phoneNumber)
        try {
            await sendOTPviaTwilio(phoneNumber, otp);
            await stepContext.context.sendActivity(`OTP sent to ${phoneNumber}.`);
            return await stepContext.prompt('otpPrompt', 'Please enter the OTP you received.');
        } catch (error) {
            console.error('Error sending OTP via Twilio:', error);
            await stepContext.context.sendActivity('Failed to send OTP. Please try again later.');
            return await stepContext.endDialog();
        }
    }

    async verifyOtpStepContext(stepContext) {
        const userEnteredOTP = stepContext.result;
        const storedOTP = localStorage.getItem('usersOtp')
        const Otp = JSON.parse(storedOTP)

        console.log(JSON.parse(storedOTP), userEnteredOTP)
        if (userEnteredOTP === Otp) {
            await stepContext.context.sendActivity('OTP verification successful. .');
            return await stepContext.next()
        } else {
            await stepContext.context.sendActivity('OTP verification failed. Please try again.');
        }

        return await stepContext.endDialog();
    }
    async tktcnf(stepContext) {
        console.log("TicketCnf ticket");
        const storedData = localStorage.getItem('usersData')

        console.log(JSON.parse(storedData))

        const payment = CardFactory.adaptiveCard(TktCnf(JSON.parse(storedData)));
        await stepContext.context.sendActivity({ attachments: [payment] });

        return await stepContext.beginDialog('id');

    }


}

// Function to generate a random 6-digit OTP
function generateOTP() {
    const string = String(Math.floor(100000 + Math.random() * 900000))
    localStorage.setItem('usersOtp', JSON.stringify(string));

    return string;
}

// Function to send OTP via Twilio SMS
async function sendOTPviaTwilio(phoneNumber, otp) {
    const twilioClient = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    try {
        await twilioClient.messages.create({
            to: phoneNumber,
            from: TWILIO_PHONE_NUMBER,
            body: `Your OTP is: ${otp}`,
        });
    } catch (error) {
        throw error;
    }
}

module.exports.OtpVerificationDialog = OtpVerificationDialog;
