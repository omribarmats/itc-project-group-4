const express = require('express');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const app = express();

app.use(express.json());

const openai = require('./src/config');

// app.post('/day-planner', async (req, res) => {
// 	try {
// 		const { amount } = req.body;
// 		const { activity } = req.body;
// 		const { city } = req.body;

// 		const response = await openai.createCompletion({
// 			model: 'text-davinci-003',
// 			prompt: `return a JS array of objects of ${amount} coordinates and names of ${activity} in ${city}.
//       For example: [{name: "Cafe de Flore", coordinates: [48.863096, 2.332536]}, [{name: "Les Deux Magots", coordinates: [48.859809, 2.334535]}]
//       `,
// 			temperature: 0.8,
// 			max_tokens: 2506,
// 			top_p: 1,
// 			frequency_penalty: 0,
// 			presence_penalty: 0,
// 			// stop: ["\n"],
// 		});
// 		console.log(response);
// 		return res.status(200).json({
// 			success: 'true',
// 			data: response.data.choices[0].text,
// 		});
// 	} catch (error) {
// 		return res.status(400).json({
// 			success: false,
// 			error: error.response
// 				? error.response.data
// 				: 'There was an issue on the server',
// 		});
// 	}
// });

const port = process.env.PORT;

app.listen(port, () => console.log(`server listening on port ${port}`));
