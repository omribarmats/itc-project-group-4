const { FilteredSearchValidation } = require('../validations/SearchValidation');
const { Configuration, OpenAIApi } = require('openai');
var converter = require('number-to-words');

const configuration = new Configuration({
    apiKey: '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',
});

const openai = new OpenAIApi(configuration);


module.exports = class SearchController {

    static async FilteredSearch(req, res) {
        const template = '{"name":"..", "longitude": "..","latitude": "..", "type": "..", "why_should_i_go_there": ".."}';
        //const prompt = `Human: Give me the coordinates of top 10 places to visit in Paris and Put this message in the following JSON structure ${template}\nAI:`;
        //const prompt = `Generate a json file according to google maps of the coordinates of top 10 places to visit in Paris and in the following JSON structure ${template}`;
        //const prompt = `Generate a json file of coordinates of day trip in London with 5 coffee and 5 museum and why should i go there in the following JSON structure ${template}`;

        try {
            const validRequest = FilteredSearchValidation(req.body.query);

            if (!validRequest) {
                const errorMessage = `Input parsing error: ${FilteredSearchValidation.errors[0].instancePath} ${FilteredSearchValidation.errors[0].message}.`;

                return res.status(400).json({
                    success: false,
                    message: errorMessage
                })
            }

            let quantity = req.body.query.quantity;
            const location = req.body.query.location;
            const places = req.body.query.places;

            quantity = converter.toWords(quantity);

            let prompt = `Generate a json file of coordinates of day trip in ${location} with exactly`;

            places.forEach(place => {
                prompt = prompt + ` ${quantity} ${place} and`;
            });

            prompt = prompt + ` why should i go there in the following JSON structure ${template}`;

            //console.log("prompt", prompt);

            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                temperature: 0.9,
                max_tokens: 4000,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.6,
                stop: [" Human:", " AI:"],
            });

            console.log(response.data.choices[0].text);

            return res.status(200).json({
                success: true,
                data: response.data.choices[0].text
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.response ? error.response.data : "There was an issue on the server"
            });
        }
    }

}