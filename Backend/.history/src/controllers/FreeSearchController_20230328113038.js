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

		let prompt = `Is  the following text a grammatically correct sentence question? "${query}" Return "true/"false"}`;
		const isQuestion = (
			await Chat(prompt, 0.1, 10, 0.1, 0.3, 0.3)
		).toLowerCase();

		if (isQuestion.includes('false')) {
			console.log('is a not question');
			return res.status(200).json({
				success: true,
				data: 'Please enter a question',
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
				data: 'Please enter a question about a destination',
			});
		}

		prompt = `Is the following text asking for travel recommendations "${query}"? Return "true/"false"}`;
		const isRecommendation = (
			await Chat(prompt, 0.1, 10, 0.1, 0.3, 0.3)
		).toLowerCase();
		if (isDestination.includes('false')) {
			console.log('is not a recommendation');
			return res.status(200).json({
				success: true,
				data: 'Please enter ask for recommendations',
			});
		}

		prompt = `Give top five travel recommendations based on the following text "${query}" in JSON, for example: 
		[
	{
		name: 'Lincoln Center for the Performing Arts',
		address: '10 Lincoln Center Plaza, New York, NY 10023',
		why_should_i_go_there:
			'As one of the most renowned performing arts destinations in the world, Lincoln Center hosts top-notch theatrical performances offering the finest entertainment experiences',
	},
	{
		name: 'The Israel Museum',
		type: 'Museum',
		address: 'Ruppin Blvd, Jerusalem 9179035, Israel',
		longitude: '31.7764903',
		latitude: '35.1983634',
		why_should_i_go_there:
			'Represents the rich history of the Jewish people and many other cultures from around the world.',
	},
	{
		name: 'Langosteria 10',
		type: 'Restaurant',
		address: 'Via Savona, 10, 20144 Milano MI, Italy',
		longitude: '31.7764903',
		latitude: '35.1983634',
		why_should_i_go_there:
			"Langosteria 10 in Milan is a high-end seafood restaurant with fresh, seasonal ingredients. Their menu boasts Italian dishes like pasta and risotto, along with seafood delights such as caviar, lobster, and oysters. The ambiance is elegant, making it ideal for a romantic night or special event. The restaurant's wine and cocktail list is also fantastic. If you want to experience exquisite seafood dining in Milan, Langosteria 10 is a must-visit.",
		type: 'Sightseeing Cruise',
		address:
			'Westminster Pier, Victoria Embankment, London SW1A 2JH, United Kingdom',
		longitude: '31.7764903',
		latitude: '35.1983634',
		why_should_i_go_there:
			"City Cruises offers Thames sightseeing cruises, ranging from 1-hour tours to dinner cruises. Boats provide panoramic views of London's iconic landmarks, with indoor/outdoor seating and facilities like a bar and restroom. Don't miss this unique perspective on the city's sights during your London visit – a must-do experience.",
	},
	{
		name: 'Top of the Rock Observation Deck',
		type: 'Observation Deck',
		address: '30 Rockefeller Plaza, New York, NY 10112, United States',
		longitude: '31.7764903',
		latitude: '35.1983634',
		why_should_i_go_there:
			"Top of the Rock Observation Deck at Rockefeller Center provides 360-degree panoramic views of New York City. The deck, located on the 70th floor, offers stunning sights of the city skyline, including the Empire State Building, Central Park, and the Hudson River. With indoor and outdoor areas, it's a comfortable and less crowded alternative to the Empire State Building observation deck. Don't miss this must-visit attraction for a bird's-eye view of the city.",
	},
]`;
		try {
			let giveRecommendation = await Chat(prompt, 1, 2500, 1, 0.3, 0.8);

			prompt = `check the following text to be a valid JSON and fix errors: "${giveRecommendation}" Return new JSON object`;
			giveRecommendation = await Chat(prompt, 0.1, 1000, 0.1, 0.3, 0.3);

			const parseJson = JSON.parse(giveRecommendation);

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
