async function fetchMovies(query) {
  const apiKey = 'YOUR_API_KEY'; 
  const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Помилка HTTP! Статус: ${response.status}`);
    }
    
    const data = await response.json();
    if (data.Response === "False") {
      throw new Error(data.Error);
    }

    return data.Search; 
  } catch (error) {
    console.error('Помилка запиту:', error.message);
    return [];
  }
}


document.getElementById('searchInput').addEventListener('input', async (event) => {
  const query = event.target.value.trim();
  
  const movies = await fetchMovies(query);
  displayResults(movies);
});

function displayResults(movies) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; 

  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <p><strong>${movie.Title}</strong> (${movie.Year})</p>
    `;
    resultsContainer.appendChild(movieElement);
  });
}


function showError(message) {
  const errorBox = document.getElementById('errorBox');
  errorBox.textContent = message;
  errorBox.style.display = 'block';
}