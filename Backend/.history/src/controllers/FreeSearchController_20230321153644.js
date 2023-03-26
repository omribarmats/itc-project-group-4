const openai = require('../config');

module.exports = class FreeSearchController {
	static async Search(req, res) {
		console.log(req.body.query);
		try {
			const { query } = req.body;
			const response = await openai.createCompletion({
				model: 'text-davinci-003',
				prompt: `  If this a text "${query}" a question yes/no`,

				// `,
				temperature: 0.8,
				max_tokens: 2506,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0.6,
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
