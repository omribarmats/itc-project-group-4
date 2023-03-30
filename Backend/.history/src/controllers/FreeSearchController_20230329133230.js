const openai = require('../config');
const fs = require('fs');

const example = `[{
		"name": "Lincoln Center for the Performing Arts",
		"address": "10 Lincoln Center Plaza, New York, NY 10023",
		"longitude": "31.7764903",
		"latitude": "35.1983634",
		"why_should_i_go_there": "As one of the most renowned performing arts destinations in the world, Lincoln Center hosts top-notch theatrical performances offering the finest entertainment experiences"
	},
	{
		"name": "The Israel Museum",
		"address": "Ruppin Blvd, Jerusalem 9179035, Israel",
		"longitude": "31.7764903",
		"latitude": "35.1983634",
		"why_should_i_go_there": "Represents the rich history of the Jewish people and many other cultures from around the world."
	},
	{
		"name": "Langosteria 10",
		"address": "Via Savona, 10, 20144 Milano MI, Italy",
		"longitude": "31.7764903",
		"latitude": "35.1983634",
		"why_should_i_go_there": "Langosteria 10 is a high-end seafood restaurant in Milan that serves top-quality fish dishes using fresh, seasonal ingredients. The menu features a wide variety of seafood, including oysters, lobster, and caviar, as well as other Italian specialties like risotto and pasta. The atmosphere is upscale and elegant, making it a perfect choice for a special occasion or a romantic dinner. The restaurant also has a great selection of wines and cocktails to complement your meal. If you're a seafood lover looking for an upscale dining experience in Milan, Langosteria 10 is definitely worth a visit."
	},
	{
		"name": "City Cruises",
		"address": "Westminster Pier, Victoria Embankment, London SW1A 2JH, United Kingdom",
		"longitude": "31.7764903",
		"latitude": "35.1983634",
		"why_should_i_go_there": "City Cruises is one of the leading sightseeing cruise companies on the River Thames. Their boats offer panoramic views of London's iconic landmarks, including the Tower Bridge, the Houses of Parliament, and the London Eye. They have a variety of cruises available, ranging from a one-hour sightseeing tour to a three-course dinner cruise. Their boats are spacious and comfortable, with indoor and outdoor seating options, and onboard facilities such as a bar and restroom. If you're visiting London and want to experience the city from a unique perspective, a sightseeing cruise with City Cruises is a must-do."
	},
	{
		"name": "Top of the Rock Observation Deck",
		"address": "30 Rockefeller Plaza, New York, NY 10112, United States",
		"longitude": "31.7764903",
		"latitude": "35.1983634",
		"why_should_i_go_there": "Top of the Rock Observation Deck offers stunning panoramic views of New York City's skyline. Located on the 70th floor of the iconic Rockefeller Center, the observation deck provides 360-degree views of the city, including the Empire State Building, Central Park, and the Hudson River. The deck has both indoor and outdoor viewing areas, so you can enjoy the views no matter what the weather is like. It's a great alternative to the crowded Empire State Building observation deck and offers a more spacious and comfortable experience. If you're visiting New York City and want to see the city from a bird's-eye view, Top of the Rock Observation Deck is a must-visit."
	}
]`;

function saveQuestionToFs(fileContent, query) {
	const filePath = `src/questions/${query}.json`;
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
		if (isDestination.includes('false')) {
			console.log('is not asking for a recommendation');
			return res.status(200).json({
				success: true,
				destinations: `Hello! I'm here and delighted to assist you with any travel recommendations you may need. As an example, you could ask me, "Are there any great pizza restaurants you would recommend in Palermo, Italy?`,
			});
		}

		try {
			prompt = `Give top two travel recommendations based on the following text "${query}" in JSON, for example: ${example}`;
			let giveRecommendation = await Chat(prompt, 1, 2500, 1, 0.3, 0.8);

			// prompt = `Fix any JSON format errors in the following text: "${giveRecommendation}" Return JSON`;
			// const validJson = await Chat(prompt, 0.1, 1000, 0.1, 0.3, 0.3);

			try {
				saveQuestionToFs(validJson, query);
			} catch (error) {
				console.log('error', error);
			}

			const parseJson = JSON.parse(giveRecommendation);
			console.log('validJson', validJson);

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
