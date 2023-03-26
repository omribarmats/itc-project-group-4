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

	return answer;
}
module.exports = class FreeSearchController {
	static async Search(req, res) {
		const { query } = req.body;

		try {
			let prompt = `Is  the following text a grammatically correct sentence question? "${query}" Return "true/"false"}`;
			const isQuestion = (
				await Chat(prompt, 0.1, 10, 0.1, 0.3, 0.3)
			).toLowerCase();
			console.log('isQuestion', typeof isQuestion, isQuestion);

			// if (!isQuestion) {
			// 	return res.status(204).json({
			// 		success: true,
			// 		data: 'Please enter a question',
			// 	});
			// } else {
			// 	console.log('isQuestion?', isQuestion);
			// prompt = `If ${query} is a question about a specific destination on earth, for example: Santiago Chile, Los Angeles CA, Boston, London England, Berlin Germany, Marrakech, Shanghai, Sidney Australia, return "true/"false"}.`;
			// const answer = await Chat(prompt, 0.1, 10, 0.1, 0.3, 0.3);
			// return res.status(200).json({
			// 	success: 'true',
			// 	data: answer,
			// });
			// }
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
