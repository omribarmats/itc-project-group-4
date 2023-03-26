const { FilteredSearchValidation } = require('../validations/SearchValidation');
const { Configuration, OpenAIApi } = require('openai');
var converter = require('number-to-words');

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);


module.exports = class SearchController {

    static async FilteredSearch(req, res) {

        const destinationTemplate = '{"name":"..", "longitude": "..","latitude": ".."}';
        const placesTemplate = '[{"name":"..", "longitude": "..","latitude": "..", "type": "..", "why_should_i_go_there": ".."}]';
        const objectTemplate = '{"type":".."}';

        const activitiesArray = [
            "Cafes",
            "Parks",
            "Restaurants",
            "Museums",
            "Start-ups",
            "Bars",
            "Malls",
            "Markets",
            "Hotels",
            "Hostels",
        ];

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
            let location = req.body.query.location;
            const places = req.body.query.places;

            quantity = converter.toWords(quantity);

            let destinationPromp = '';

            if (typeof location === 'object') {
                destinationPromp = destinationPromp + `Generate a json file of the coordinates`;
                location = JSON.stringify(location);
            }
            else {
                destinationPromp = destinationPromp + `Generate an object of coordinates of`;
            }

            destinationPromp = destinationPromp + ` ${location} in the following JSON structure ${destinationTemplate}`;

            const destinationResponse = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: destinationPromp,
                temperature: 0.9,
                max_tokens: 4000,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.6,
                stop: [" Human:", " AI:"],
            });

            let placesPrompt = `Generate a json file of coordinates of top real places in ${location} with exactly`;

            places.forEach(place => {
                placesPrompt = placesPrompt + ` ${quantity} ${place} and`;
            });

            if (places.length == 0) {
                placesPrompt = placesPrompt + ` ${quantity} places and`;
            }

            placesPrompt = placesPrompt + ` why should i go there in the following JSON structure ${placesTemplate}`;

            const placesResponse = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: placesPrompt,
                temperature: 0.9,
                max_tokens: 4000,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.6,
                stop: [" Human:", " AI:"],
            });

            const destinationResAsJson = JSON.parse(destinationResponse.data.choices[0].text);
            const placesResAsJson = JSON.parse(placesResponse.data.choices[0].text);

            placesResAsJson.forEach(async (place) => {
                const replacedType = place.type;
                const replacePrompt = `Generate an object with a value that suitable the most to "${replacedType}" from the following array ${activitiesArray} in the following structure ${objectTemplate}`;

                const replaceResponse = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: replacePrompt,
                    temperature: 0.9,
                    max_tokens: 100,
                    top_p: 1,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.6,
                    stop: [" Human:", " AI:"],
                });

                place.type = JSON.parse(replaceResponse.data.choices[0].text).type;
            })

            const data = {
                destination: destinationResAsJson,
                places: placesResAsJson
            };

            //console.log(data);

            return res.status(200).json({
                success: true,
                data: data
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.response ? error.response.data : "There was an issue on the server"
            });
        }
    }

}