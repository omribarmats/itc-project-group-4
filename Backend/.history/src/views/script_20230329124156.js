const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	searchResults.innerHTML = 'Loading...';
	const query = searchInput.value;
	const apiUrl = 'http://localhost:4000/free-search';
	const requestBody = { query };
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ query: query }),
		});
		const { destinations } = await response.json();
		console.log(destinations);
		const destinationsHTML = destinations
			.map(
				(item) => `
		    <div class="results">
		      <h2>${item.name}</h2>
		      <p>${item.address}</p>
              <span>${item.why_should_i_go_there}</span>
		    </div>
		  `
			)
			.join('');
		searchResults.innerHTML = destinationsHTML;
	} catch (error) {
		console.error(error);
		searchResults.innerHTML = 'An error occurred while searching.';
	}
});
