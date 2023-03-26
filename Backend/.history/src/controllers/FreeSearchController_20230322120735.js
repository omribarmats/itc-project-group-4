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
		console.log('response', response);

		return response.data.choices[0].text;
	} catch (error) {
		return error.response;
	}
}
module.exports = class FreeSearchController {
	constructor(prompt) {
		this.isQuestion = Chat(prompt, 0.1, 10, 0.1, 0.1, 0.1);
	}
	static async Search(req, res) {
		const { query } = req.body;
		const prompt = `If ${query} is a question, return "true/"false".`;
		console.log('query', this.isQuestion(prompt));
	}
};
