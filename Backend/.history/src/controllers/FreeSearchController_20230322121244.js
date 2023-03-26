const openai = require('../config');

module.exports = class FreeSearchController {
	constructor(prompt) {
		this.isQuestion = 'this.console.log();';
	}

	async Chat(prompt, temperature, max_tokens, top_p, frequency, presence) {
		console.log('prompt', prompt);
		// try {
		// 	const response = await openai.createCompletion({
		// 		model: 'text-davinci-003',
		// 		prompt: prompt,
		// 		temperature: temperature,
		// 		max_tokens: max_tokens,
		// 		top_p: top_p,
		// 		frequency_penalty: frequency,
		// 		presence_penalty: presence,
		// 	});
		// 	console.log('response', response);

		// 	return response.data.choices[0].text;
		// } catch (error) {
		// 	return error.response;
		// }
	}
	static async Search(req, res) {
		const { query } = req.body;
		const prompt = `If ${query} is a question, return "true/"false".`;
		console.log('query', this.isQuestion());
	}
};
