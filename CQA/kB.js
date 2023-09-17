const axios = require('axios');

async function getCQAAnswer(question) {
    try {
        const axiosConfig = {
            method: "post",
            url: "https://internal-lang-service.cognitiveservices.azure.com/language/:query-knowledgebases", 
            params:{
                projectName : 'CollageDetBot',
                "api-version":'2021-10-01',
                deploymentName: "production"
            },
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": "64da2fee3ea644e0b940071a23080d94"  
            },
            data: {
                "top": "1",
                "question": question,
                "confidenceScoreThreshold": "0.70"
            }
        };

        var qna = await axios(axiosConfig);
        // console.log("cqa res from kb",JSON.stringify(qna.data,null,2))
        console.log("from Kb ")
        return qna.data
    }
    catch(err){
        console.log(err)


    }
}

// getCQAAnswer("What are the basic requirements for joining college?")
module.exports.getCQAAnswer = getCQAAnswer