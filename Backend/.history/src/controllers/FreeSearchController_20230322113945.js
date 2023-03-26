const openai = require('../config');

module.exports = class FreeSearchController {
	static async Chat(
		prompt,
		temperature,
		max_tokens,
		top_p,
		frequency_penalty,
		presence_penalty,
		stop
	) {
		try {
			const response = await openai.createCompletion({
				model: 'text-davinci-003',
				prompt: `  If this a text "${query}" a question return "true"/"false"`,
				temperature: 0,
				max_tokens: 10,
				top_p: 0.1,
				frequency_penalty: 0.1,
				presence_penalty: 0.1,
				// stop: ['\n'],
			});
			console.log('response', response);

			return res.status(200).json({
				success: 'true',
				answer: response.data.choices[0].text,
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
