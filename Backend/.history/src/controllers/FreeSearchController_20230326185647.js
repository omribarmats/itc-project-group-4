const openai = require('../config');

async function Chat(
	prompt,
	temperature,
	max_tokens,
	top_p,
	frequency,
	presence
) {
	try {
		const response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: prompt,
			temperature: temperature,
			max_tokens: max_tokens,
			top_p: top_p,
			frequency_penalty: frequency,
			presence_penalty: presence,
		});
		const answer = response.data.choices[0].text;
		console.log('answer:', answer);

		return answer;
	} catch (error) {
		console.log('error:', error);
		return error;
	}
}
module.exports = class FreeSearchController {
	static async Search(req, res) {
		const { query } = req.body;

		let prompt = `Is  the following text a grammatically correct sentence question? "${query}" Return "true/"false"}`;
		const isQuestion = (
			await Chat(prompt, 0.1, 10, 0.1, 0.3, 0.3)
		).toLowerCase();

		if (isQuestion.includes('false')) {
			console.log('is a not question');
			return res.status(200).json({
				success: true,
				data: 'Please enter a question',
			});
		}
		prompt = `Is the following text about a destination on earth? "${query}" Return "true/"false"}`;
		const isDestination = (
			await Chat(prompt, 0.1, 10, 0.1, 0.3, 0.3)
		).toLowerCase();

		if (isDestination.includes('false')) {
			console.log('is not a destination');
			return res.status(200).json({
				success: true,
				data: 'Please enter a question about a destination',
			});
		}

		prompt = `Is the following text asking for travel recommendations "${query}"? Return "true/"false"}`;
		const isRecommendation = (
			await Chat(prompt, 0.1, 10, 0.1, 0.3, 0.3)
		).toLowerCase();
		if (isDestination.includes('false')) {
			console.log('is not a recommendation');
			return res.status(200).json({
				success: true,
				data: 'Please enter ask for recommendations',
			});
		}

		prompt = `Give top two travel recommendations based on the following text "${query}" in CSV, for example: [
	{
		"name": "The Israel Museum",
		"longitude": "31.7764903",
		"latitude": "35.1983634",
		"type": "Museum",
		"address": "Ruppin Blvd, Jerusalem 9179035, Israel",
		"reason":
			"Represents the rich history of the Jewish people and many other cultures from around the world.",
	},
	{
		"name": "Ticho House",
		"longitude": "31.7801072",
		"latitude": "35.2041865",
		"type": "Museum",
		"address": "14 Shmuel HaNagid St, Jerusalem 9419091, Israel",
		"reason":
			"Features a wide collection of artworks by Anna Ticho and Avraham Albert Ticho.",
	}
]
`;

		try {
			const giveRecommendation = await Chat(prompt, 1, 2500, 1, 0.3, 0.8);
			console.log('giveRecommendation:', giveRecommendation);
			return res.status(200).json({
				success: true,
				destinations: giveRecommendation,
			});
		} catch (error) {
			return res.status(400).json({
				success: false,
				error: error.response
					? error.response.data
					: 'There was an issue on the server',
			});
		}
	}
};
