const express = require('express');
const cors = require('cors');

require('dotenv').config();
const FreeSearchController = require('./src/controllers/FreeSearchController');
const app = express();

app.use(express.json());
app.use(cors());

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

app.post('/free-search', FreeSearchController.Search);
const port = process.env.PORT;

app.listen(port, () => console.log(`server listening on port ${port}`));

const response = (result = {
	message: 'Yes, you asked about Houston and here are my recommendations',
	date: [
		{
			name: 'The Museum of Fine Arts',
			describeInAShortParagraphWhyThisLocationIsAGoodDestination:
				"The Museum of Fine Arts, Houston is an excellent destination for people who use wheelchairs because it is fully accessible and offers a range of accommodations and services to ensure a positive experience. From wheelchair-accessible entrances and elevators to free wheelchair availability and staff support, the museum is committed to ensuring that all visitors can enjoy its exhibits. The availability of ASL interpretation, assistive listening devices, and audio guides with descriptive text further enhances the museum's inclusivity for visitors with different disabilities.",
			address: '13 Rue du Bac, 75007 Paris, France',
			coordinates: [48.859809, 2.334535],
		},
	],
});
