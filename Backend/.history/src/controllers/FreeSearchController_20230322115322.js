const openai = require('../config');

module.exports = class FreeSearchController {
	static async Chat(
		query,
		temperature,
		max_tokens,
		top_p,
		frequency,
		presence
	) {
		console.log('query', query);
		// try {
		// 	const response = await openai.createCompletion({
		// 		model: 'text-davinci-003',
		// 		prompt: query,
		// 		temperature: temperature,
		// 		max_tokens: max_tokens,
		// 		top_p: top_p,
		// 		frequency_penalty: frequency,
		// 		presence_penalty: presence,
		// 	});
		// 	console.log('response', response);

		// 	return response.data.choices[0].text;
		// } catch (error) {
		// 	return res.status(400).json({
		// 		success: false,
		// 		error: error.response
		// 			? error.response.data
		// 			: 'There was an issue on the server',
		// 	});
		// }
	}

	static async Search(req, res) {
		const { query } = req.body;
		console.log('query', query);

		const response = await Chat(query, 0.1, 10, 0.1, 0.1, 0.1);
		return res.status(200).json({
			success: 'true',
			answer: 'Hello',
		});
	}
};
