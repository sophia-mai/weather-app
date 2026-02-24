import "./style.css";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

function getWeatherForecast(event) {
  event.preventDefault();
  const city = document.getElementById("city").value.trim();
  document.getElementById("city").value = "";
  getLocation(city);
}

function getLocation(city) {
  fetch(`${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1`)
    .then((response) => response.json())
    .then((data) => {
      const location = data.results[0];
      getCurrentWeather(location);
    })
    .catch((err) => console.log(err));
}

document
  .getElementById("search")
  .addEventListener("submit", getWeatherForecast);
