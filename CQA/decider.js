const { getCQAAnswer } = require('./kB');

const Decider = async (question) => {
    try {
        const [cqaResponse] = await Promise.allSettled([
            getCQAAnswer(question)
        ]);

        if (cqaResponse && cqaResponse.status === "fulfilled") {
            const qnaScore = cqaResponse.value.answers[0]?.confidenceScore;

            if (qnaScore !== undefined) {
                console.log("cqa");
                return {
                    status: true,
                    flow: "cqa",
                    answer: cqaResponse.value.answers[0]?.answer
                };
            }
        } else {
            console.log('No valid QnA Maker response or status found.');
        }
    } catch (err) {
        console.log('Error in Decider:', err);
        // Handle any errors that might occur during the process.
        return {
            status: false,
            error: err.message
        };
    }
};
// Decider("Can I apply to multiple colleges at once?")
module.exports.Decider = Decider;
