const openai = require('../config');

module.exports = class FreeSearchController {
	constructor() {
		this.isQuestion = false;
	}
	static async Chat(
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
			console.log('response', response);

			return response.data.choices[0].text;
		} catch (error) {
			return error.response;
		}
	}

	static async Search(req, res) {
		const { query } = req.body;
		console.log('query', query);

		const response = await this.Chat(query, 0.1, 10, 0.1, 0.1, 0.1);
		console.log('response', response);
		return res.status(200).json({
			success: 'true',
			answer: response,
		});
	}
};
