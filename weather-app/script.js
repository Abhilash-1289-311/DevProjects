// API Configuration
const API_KEY = "3d1bd7d0c5b839f2d5ea5ceaecac037f"; // Replace with your actual API key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Get DOM elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherDisplay = document.getElementById("weatherDisplay");
const errorDiv = document.getElementById("error");

// Get all weather elements
const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temp");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const loadingDiv = document.getElementById("loading");

// Fetch weather data
async function getWeather(city) {
  try {
    weatherDisplay.classList.add("hidden");
    errorDiv.classList.add("hidden");
    loadingDiv.classList.remove("hidden"); // Show spinner

    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  } finally {
    loadingDiv.classList.add("hidden"); // Hide spinner
  }
}

// Display weather data
function displayWeather(data) {
  // Update city name
  cityName.textContent = `${data.name}, ${data.sys.country}`;

  // Update weather icon
  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  // Update temperature
  temperature.textContent = Math.round(data.main.temp);

  // Update description
  description.textContent = data.weather[0].description;

  // Update details
  feelsLike.textContent = Math.round(data.main.feels_like);
  humidity.textContent = data.main.humidity;
  windSpeed.textContent = data.wind.speed;

  // Show weather display
  weatherDisplay.classList.remove("hidden");
}

// Show error message
function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
  weatherDisplay.classList.add("hidden");
}

// Search weather
function searchWeather() {
  const city = cityInput.value.trim();

  if (city) {
    getWeather(city);
  } else {
    showError("Please enter a city name");
  }
}

// Event listeners
searchBtn.addEventListener("click", searchWeather);

// Enter key support
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchWeather();
  }
});

// Load weather for user's location on start (optional)
window.addEventListener("load", () => {
  getWeather("Bangalore"); // Default city
});
