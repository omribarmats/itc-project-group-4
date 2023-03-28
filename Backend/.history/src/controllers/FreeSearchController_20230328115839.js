const openai = require('../config');
const example = require('./example_results.json');

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
		prompt = `Is the following text asking about a city, country, or region on earth? "${query}" Return "true/"false"}`;
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

		prompt = `Give top five travel recommendations based on the following text "${query}" in JSON, for example: ${example}`;
		try {
			let giveRecommendation = await Chat(prompt, 1, 2500, 1, 0.3, 0.8);

			prompt = `check the following text to be a valid JSON and fix errors: "${giveRecommendation}" Return new JSON object`;
			giveRecommendation = await Chat(prompt, 0.1, 1000, 0.1, 0.3, 0.3);

			const parseJson = JSON.parse(giveRecommendation);

			return res.status(200).json({
				success: true,
				destinations: parseJson,
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
