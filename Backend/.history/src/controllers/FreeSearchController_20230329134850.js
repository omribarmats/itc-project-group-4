const openai = require('../config');
const fs = require('fs');

const example = [
	{
		name: 'Tel-O-Fun Bike Rental',
		address: '340 Namir Rd, Tel Aviv-Yafo, Israel',
		longitude: '34.7916790',
		latitude: '32.0975384',
		why_should_i_go_there:
			'Tel-O-Fun is the largest bike rental service in Tel Aviv, offering easy access to bicycles located around the city with their convenient mobile app. With daily and weekly rates available, this is one of the best ways to explore Tel Aviv on two wheels without worrying about maintenance or storage fees.',
	},
	{
		name: 'Lightbike - Tel Aviv Bicycle Rental',
		address: 'Kovshei Katliv 11, Tel Aviv 6424601, Israel',
		longitude: '34.7911552',
		latitude: '32.0826618',
		why_should_i_go_there:
			"Lightbike specializes in bicycle rentals for traveling and sightseeing in Tel Aviv. They offer a wide selection of rental bikes that can be picked up from their central hub at Hakirya Station or delivered directly to your door. Whether you're looking for a leisurely ride around town or an adrenaline-filled mountain biking adventure, Lightbike has something for everyone.",
	},
	{
		name: 'Bikes 4 You Tel Aviv Bike Rental',
		address: '110 Ben Yehuda St, Tel Aviv-Yafo, Israel',
		longitude: '34.7792772',
		latitude: '32.0738389',
		why_should_i_go_there:
			"Bikes 4 You is an independent bike rental provider in downtown Tel Aviv. They have a large selection of bikes to choose from and specialize in beach cruisers and electric bikes, making them a great choice if you're looking to explore the city in comfort and style. Their prices are competitive and they provide excellent customer service.",
	},
	{
		name: 'Cycling Center TLV - Bicycle Rental & Activities',
		address: '49 Ibn Gabirol St, Tel Aviv 6511812, Israel',
		longitude: '34.778778400000004,',
		latitude: '32.0697282,',

		why_should_i_go_there:
			"The Cycling Center TLV is the perfect place for any cycling enthusiast visiting Tel Aviv. This full-service bike shop offers not only bike rentals but also guided rides around the city and special cycling activities like racing and mountain biking excursions. If you're looking for a more authentic experience of cycling in Tel Aviv, the Cycling Center TLV is the way to go!",
	},

	{
		name: 'Telavivbikes Bicycle Rentals & Tours ',

		address: '20 Ben Yitzhak St., Givataim 5317730, Israel ',

		longitude: ' 34.8458243,',

		latitude: ' 32.0925823,',

		why_should_i_go_there:
			"Telavivbikes offers rentals of standard bikes as well as foldable electric bikes for those looking for easy access to different parts of the city or a more leisurely ride along the coast . In addition to renting out bicycles by the hour or day, they offer guided tours through various neighborhoods of Tel Aviv so you can get an insider's look at its fascinating culture and history.",
	},
];

function saveQuestionToFs(fileContent, query) {
	const filePath = `src/questions/${query}.js`;
	fs.writeFile(filePath, fileContent, (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log(`File saved to ${filePath}`);
		}
	});
}

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

		let prompt = `Is the following text a grammatically correct sentence question? "${query}" Return "true/"false"}`;
		const isQuestion = (
			await Chat(prompt, 0.1, 10, 0.1, 0.3, 0.3)
		).toLowerCase();

		if (isQuestion.includes('false')) {
			console.log('is a not question');
			return res.status(200).json({
				success: true,
				destinations: `Hey there! Could you kindly rephrase your question as a valid one? For instance:<p> Where are the best bike rental stores in Paris, France?<p>`,
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
				destinations:
					'Hey there! Please enter a question about a particular destination. For instance: <p>"Could you suggest a great spot with a view to see Lisbon, Portugal?"</p>',
			});
		}

		prompt = `Is the following text asking for travel recommendations "${query}"? Return "true/"false"}`;
		const isRecommendation = (
			await Chat(prompt, 0.1, 10, 0.1, 0.3, 0.3)
		).toLowerCase();
		if (isRecommendation.includes('false')) {
			console.log('is not asking for a recommendation');
			return res.status(200).json({
				success: true,
				destinations: `Hello! I'm here and delighted to assist you with any travel recommendations you may need. <p>As an example, you could ask me, "Are there any great pizza restaurants you would recommend in Palermo, Italy?"</p>`,
			});
		}

		try {
			prompt = `Give top five travel recommendations based on the following text "${query}" in JS, for example: ${example}`;
			let giveRecommendation = await Chat(prompt, 1, 2500, 1, 0.3, 0.8);

			// prompt = `Fix any JSON format errors in the following text: "${giveRecommendation}" Return JSON`;
			// const validJson = await Chat(prompt, 0.1, 1000, 0.1, 0.3, 0.3);

			try {
				saveQuestionToFs(giveRecommendation, query);
			} catch (error) {
				console.log('error', error);
			}

			// const parseJson = JSON.parse(validJson);
			// console.log('validJson', validJson);

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
