const { CardFactory } = require("botbuilder");
const { ComponentDialog, WaterfallDialog, DialogTurnStatus, TextPrompt, ChoicePrompt, ChoiceFactory } = require("botbuilder-dialogs");
const { data } = require('../resources/flights.json')
const { WaterFall3 } = require('./WaterFall3')
const { passengerInfo } = require('./PassengerInfo')
const unirest = require('unirest')
const { seatCard } = require("../Cards/SeatCard")

const { flightCard, flightCard1 } = require('../Cards/FlightCard')
const { IndirectflightCard } = require('../Cards/indirectFlight')


const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./storage');
const userdetails = localStorage.getItem('users');

const fs = require('fs');
const { DiffieHellmanGroup } = require("crypto");
// const NodeCache = require('node-cache');
// const cache =new NodeCache();

const NUM = new TextPrompt('NUM');
const TEXT1 = new TextPrompt('TEXT1');
const TEXT2 = new TextPrompt('TEXT2');
const TEXT3 = new TextPrompt('TEXT3');
const TEXT4 = new TextPrompt('TEXT4');

const SEATING = new TextPrompt('SEAT');

const WATERFALL_DIALOG2 = 'WATERFALLDIALOG2'


class WaterFall2 extends ComponentDialog {
    constructor(conversationState) {
        super('WATERFALL2');

        this.addDialog(NUM)
        this.addDialog(TEXT1)
        this.addDialog(TEXT2)
        this.addDialog(TEXT3)
        this.addDialog(TEXT4)
        this.addDialog(SEATING)


        this.addDialog(new passengerInfo(conversationState))


        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG2, [
            this.askForDate.bind(this),
            this.collectSource.bind(this),
            this.collectDestination.bind(this),
            this.ClassType.bind(this),
            this.displayBookingDetails.bind(this),
            this.Flightdetails.bind(this),
            this.SeatingData.bind(this),
        ]));



        this.initialDialogId = WATERFALL_DIALOG2;
    }
    async askForDate(stepContext) {
        try {
            stepContext.values.ext = stepContext.options.ext;
            console.log("askForDate", stepContext.values.ext.date);
            if (stepContext.values.ext.date === undefined) {
                await stepContext.context.sendActivity("Please let me know your Date.");
                return  stepContext.prompt('NUM');

            } else {
                return await stepContext.next()
            }
        } catch (error) {
            console.error("Error in askForDate:", error);
            throw error; // Re-throw the error to be handled by the error handler.
        }
    }

    async collectSource(stepContext) {

        try {
            console.log("collectSource");
            if (stepContext.values.ext.source === undefined) {
                stepContext.values.NUM = stepContext.result;

                await stepContext.context.sendActivity(`Please let me know your Source`);
                return await stepContext.prompt('TEXT1');
            }
            else {
                return await stepContext.next()
            }
        }
        catch (error) {
            console.error("Error in collectSource:", error);
            throw error;
        }
    }

    async collectDestination(stepContext) {
        try {

    
            console.log("collectSource");
            console.log("collectDestination");
            stepContext.values.TEXT1 = stepContext.result;
            if (stepContext.values.ext.des === undefined) {
                await stepContext.context.sendActivity("Please let me know your Destination.");
                return await stepContext.prompt('TEXT2');
            } else {
                return await stepContext.next()
            }
        } catch (error) {
            console.error("Error in collectDestination:", error);
            throw error;
        }
    }

    async ClassType(stepContext) {
        try {
            console.log("collectClassType");
            stepContext.values.TEXT2 = stepContext.result;
            if (stepContext.values.ext.type === undefined) {
                await stepContext.context.sendActivity("Please let me know your ClassType.");
                return await stepContext.prompt('TEXT3');
            } else {
                return await stepContext.next()
            }
        } catch (error) {
            console.error("Error in ClassType:", error);
            throw error;
        }
    }
    async collectIndirectFlights(stepContext) {
        try {
            
            const jsonFilePath ='flights.json';
            const jsonData1 = readJsonFile(jsonFilePath);

            
            console.log("collectSource");
            
            const matchingFlights = [];
            const matchingFlights2 = []
            // console.log("jsonData1",jsonData1)
    
            for (const flight of jsonData1) {
                const airportSource1 = flight.reservationFor;
                if (
                    stepContext.values.TEXT1 === `${airportSource1['departureAirport']['city']}` &&
                    stepContext.values.TEXT2 === `${airportSource1['arrivalAirport']['city']}`
                ) {
                    // If the condition is satisfied, add the entire flight details to the array
                    matchingFlights.push(flight);
                    console.log("sucess")
                }
            }
            console.log("matchingFlights",matchingFlights)
            if (matchingFlights.length > 0 ) {
                // Condition satisfied, log the details of matching flights
                for (const flight of matchingFlights) {
                    console.log('Matching Flight Details:');
                    if(flight['reservationFor']['IndirectdepartureAirport']){
                    const NUM = flight.reservationFor.flightNUMber;
                    const flightDetails = `Flight NUMber: ${flight['reservationFor']
                    ['flightNumber']}\n \nDeparture Airport: ${flight['reservationFor'][`departureAirport`]['name']}\n
                                            \nIndirectdepartureAirport: ${flight['reservationFor']['IndirectdepartureAirport']['city']}\n
                                            \n arrivalTime: ${flight['reservationFor']['arrivalTime']}\n
                                            \n \ndepartureTime: ${flight['reservationFor']['departureTime']}
                                            \n \nSeller Name : ${flight['reservationFor']['seller']['name']}`;
                    console.log(flight['reservationFor']['seller']['name'])
                    await stepContext.context.sendActivity(flightDetails)
                    const cards = flightCard(flight);
                    for (const card of cards) {
                
                        await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
                    }
                    console.log(matchingFlights)
                    console.log("sucess")
                    }
          
                    // Add more properties as needed
                }
                const cards = flightCard(matchingFlights);
                const card1 = flightCard1(matchingFlights)

                for (const card of cards) {
                
                    await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
                }
                for (const card1 of cards) {
                    
                    await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(card1)] });
                }
            } else {
                // Condition not satisfied, handle it as needed
                await stepContext.context.sendActivity('No matching flights found.');
            }
  









            // await stepContext.context.sendActivity(`These are the flights whic flies from ${ext.source || ext.src} to ${ext.des || ext.dest} via ${ext.via || ext.viaRout || "NotSecified"}`)
            return ComponentDialog.EndOfTurn

    
                } catch (error) {
            console.error("Error in collectIndirectFlights:", error);
            throw error;
        }
    }
    

    async displayBookingDetails(stepContext) {
        try {


            console.log("displayBookingDetails");
            stepContext.values.TEXT3 = stepContext.result;
            const dat = stepContext.values.NUM;
            const src = stepContext.values.TEXT1;
            const dest = stepContext.values.TEXT2;
            const cla = stepContext.values.TEXT3;


            const ext = stepContext.values.ext || {};

            ext.src = src;
            ext.dest = dest;
            ext.cla = cla;
            ext.dat = dat;


          
    

            const jsonFilePath ='flights.json';
            const jsonData1 = readJsonFile(jsonFilePath);

            
            console.log("collectSource");
            
            const matchingFlights = [];
           

       
            console.log("jsonData1",jsonData1)
    
            for (const flight of jsonData1) {
                const airportSource1 = flight.reservationFor;
                if (
                    stepContext.values.TEXT1  === `${airportSource1['departureAirport']['city']}` &&
                    stepContext.values.TEXT2   === `${airportSource1['arrivalAirport']['city']}` ||  
                    ext.source  === `${airportSource1['departureAirport']['city']}` &&
                    ext.des  === `${airportSource1['arrivalAirport']['city']}`
                ) {
                    // If the condition is satisfied, add the entire flight details to the array
                    matchingFlights.push(flight);
                   
                    console.log("sucess")
                }
            }
     
            console.log("matchingFlights",matchingFlights)
            if (matchingFlights.length > 0) {
                // Condition satisfied, log the details of matching flights
                // for (const flight of matchingFlights) {
                //     console.log('Matching Flight Details:');

                //     const flightDetails = `Flight NUMber: ${flight['reservationFor']
                //     ['flightNumber']}\n \nDeparture Airport: ${flight['reservationFor'][`departureAirport`]['name']}\n
                //                             \nArrival Airport: ${flight['reservationFor']['arrivalAirport']['name']}\n
                //                             \n arrivalTime: ${flight['reservationFor']['arrivalTime']}\n
                //                             \n \ndepartureTime: ${flight['reservationFor']['departureTime']}
                //                             \n \nSeller Name : ${flight['reservationFor']['seller']['name']}`;

                //     console.log(flight['reservationFor']['seller']['name'])
                //     await stepContext.context.sendActivity(flightDetails)

          
                //     // Add more properties as needed
                // }
                const cards = flightCard(matchingFlights);

                for (const card of cards) {
                    await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
                }
            } else {
                // Condition not satisfied, handle it as needed
                await stepContext.context.sendActivity('No matching flights found.');
            }
  









            await stepContext.context.sendActivity(`These are the flights whic flies from ${ext.source || ext.src} to ${ext.des || ext.dest}`)
            return ComponentDialog.EndOfTurn
        } catch (error) {
            console.error("Error in ContactDetails:", error);
            throw error; // Rethrow the error for further handling, if needed.
        }
    }
    async Flightdetails(stepContext) {
        try {
            console.log("Flightdetails", stepContext.context.activity.value)
            const payloadFlight = stepContext.context.activity.value
            const ext = stepContext.values.ext || {};
            ext.payloadFlight = payloadFlight
            console.log(ext)
         
            if (payloadFlight) {
                const seating = CardFactory.adaptiveCard(seatCard(payloadFlight))
                await stepContext.context.sendActivity({ attachments: [seating] });
                await stepContext.context.sendActivity("Please Enter Your Seats ")
                return await stepContext.prompt('SEAT');
            } else {
                await stepContext.context.sendActivity("Please select your flight")
            }
        } catch (error) {
            console.error("Error in Flightdetails:", error);
            throw error;
        }
    }

    async SeatingData(stepContext) {
        try {
            console.log("SeatingData")
    

            stepContext.values.SEATING = stepContext.result
            console.log("SeatingData", stepContext.values.SEATING)

            return await stepContext.beginDialog('passId', { set: stepContext.values.SEATING, ext: stepContext.values.ext })
        } catch (error) {
            console.error("Error in SeatingData:", error);
            throw error;
        }
    }



}

function readJsonFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        // console.log(JSON.parse(data))
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing JSON file:', error);
        return null;
    }
}

module.exports.WaterFall2 = WaterFall2