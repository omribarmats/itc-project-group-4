const openai = require('../config');
async function Chat(
	prompt,
	temperature,
	max_tokens,
	top_p,
	frequency,
	presence
) {
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

	return eval('(' + answer + ')');
}
module.exports = class FreeSearchController {
	static async Search(req, res) {
		const { query } = req.body;

		const prompt = `If ${query} is a sentence question, return "true/"false"}`;

		try {
			const isQuestion = await Chat(prompt, 0.1, 10, 0.1, 0.3, 0.3);

			console.log('isQuestion', isQuestion);
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
