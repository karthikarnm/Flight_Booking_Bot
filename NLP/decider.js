const { clu } = require('./clu');
const Decider = async (query) => {
    try {
        const [cluResponse] = await Promise.all([clu(query)]);
        
        if (cluResponse && cluResponse.status === 'success' && cluResponse.data) {
            const luisScore = cluResponse.data.result.prediction.intents[0].confidenceScore;
            const topIntent = cluResponse.data.result.prediction.topIntent;
            const luisThreshold = 0.80;

            if (luisScore >= luisThreshold) {
                // console.log("luis start",JSON.stringify(cluResponse.entities,null,2))
                return {
                    flow: "clu",
                    topIntent,
                    entities: cluResponse.entities
                };
            } else {
                console.log("Not working");
                // Handle the case where the luisScore is not sufficient.
            }
        } else {
            console.log("CLU response not successful");
            // Handle the case where cluResponse status is not 'success' or data is missing.
        }
    } catch (err) {
        console.log(err);
        // Handle any errors that might occur during the process.
    }
};

module.exports.Decider = Decider;
// Decider("I need to travel newyork to London on business. Find me a suitable flight on 23 sep 2023")

// const axios = require('axios');

// const options = {
//     method: 'GET',
//     url: 'https://flight-fare-search.p.rapidapi.com/v2/flights/',
//     params: {
//         from: 'LHR',
//         to: 'DXB',
//         date: '23-10-2023',
//         adult: '1',
//         type: 'economy',
//         currency: 'USD'
//     },
//     headers: {
//             'X-RapidAPI-Key': 'c746319e9bmshcab9153b3cb3d2ap16a0d6jsn67a85efecaf0',
//             'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
//     }
// };
// async function fun() {
//     try {
//         const response = await axios.request(options);
//         console.log(response.data);
//     } catch (error) {
//         console.error(error);
//     }
// }
// fun()