async function fetchMovies(query) { 
  const apiKey = 'abcdef12';

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
    showError(error.message);
    return [];
  }
  
  }



let debounceTimeout;
document.getElementById('searchInput').addEventListener('input', (event) => {
  clearTimeout(debounceTimeout);
  const query = event.target.value.trim();

  debounceTimeout = setTimeout(async () => {
    if (query.length > 2) {
      const movies = await fetchMovies(query);
      displayResults(movies);
    } else {
      displayResults([]);
    }
  }, 500);


  function displayResults(movies) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; 
  
    movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.innerHTML = `
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
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
});