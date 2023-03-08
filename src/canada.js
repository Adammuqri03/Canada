const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const weatherResults = document.getElementById('weather');

// event listeners
searchBtn.addEventListener('click', () => {
  const city = searchInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

// get weather information for a given city
function getWeather(city) {
  // make API request to OpenWeatherMap
  const apiKey = '9fd7a449d055dba26a982a3220f32aa2';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // display weather information
      const html = `
        <div class="weather-item">
          <div class="weather-name">
            
          </div>
          <div class="weather-details">
          <div class="card">
          <h3>${data.name}</h3>
            <p>Temperature:🌡 <span class="temp">${data.main.temp}&deg;C</span></p>
            <p>Weather: <span class="weather">${data.weather[0].main}</span></p>
            <p>Humidity: <span class="humidity">${data.main.humidity}%</span></p>
            <p>Wind: <span class="wind">${data.wind.speed} m/s</span></p>
            <p>pressure: <span class="wind">${data.main.pressure} m/s</span></p>
            </div>
          </div>
        </div>
      `;
      weatherResults.innerHTML = html;
    })
    .catch(error => {
      console.log(error);
      weatherResults.innerHTML = '<p>Sorry, we could not find the weather for that city.</p>';
    });
}

//fetch menu

const searchForm = document.getElementById('search-form');
const mealDetails = document.getElementById('meal-details');
const ingredientList = document.getElementById('ingredient-list');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent default form submit behavior

  const mealSelect = document.getElementById('meal-select');
  const mealName = mealSelect.options[mealSelect.selectedIndex].value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.meals === null) {
        mealDetails.innerHTML = `<p>No meal found for '${mealName}'</p>`;
        ingredientList.innerHTML = '';
      } else {
        const meal = data.meals[0];
        mealDetails.innerHTML = `
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 200px; height: 200px;" style="max-width: 50%; display: block; margin: 0 auto;"><br>
         

          

          <p>${meal.strInstructions}</p>
        `;
        const ingredients = getIngredients(meal);
        ingredientList.innerHTML = `
          <h3>Ingredients:</h3>
          <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
        `;
      }
    })
    .catch(error => {
      mealDetails.innerHTML = `<p>Something went wrong: ${error}</p>`;
      ingredientList.innerHTML = '';
    });
});

function getIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }
  return ingredients;
}