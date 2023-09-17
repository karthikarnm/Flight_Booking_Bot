const axios = require('axios');

async function clu(query) {
    try {
        const axiosConfig = {
            method: "post",
            url: "https://internal-lang-service.cognitiveservices.azure.com/language/:analyze-conversations",
            params: { "api-version": "2022-10-01-preview" },
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": "64da2fee3ea644e0b940071a23080d94",
                Accept: "application/json"
            },
            data: {
                kind: "Conversation",
                analysisInput: {
                    conversationItem: {
                        participantId: "1",
                        id: "1",
                        modality: "text",
                        language: "en-US",
                        text: query,
                    },
                },
                parameters: {
                    projectName: "FlightBookingBot",
                    verbose: true,
                    deploymentName: "FlightBot",
                    stringIndexType: "TextElement_V8",
                }
            }
        };

        const response = await axios(axiosConfig);

        if (response.data) {
            console.log("CLuResponse", JSON.stringify(response.data, null, 2));
            return {
                status: "success",
                data: response.data,
                topIntent: response.data.result.prediction.topIntent,
                entities: response.data.result.prediction.entities
            };
        } else {
            return {
                status: "failed"
            };
        }
    } catch (err) {
        console.error(err);
        return {
            status: "error"
        };
    }
}

// Example usage
// clu("I need to travel newyork to London on business. Find me a suitable flight on 23 sep 2023")
module.exports.clu = clu
