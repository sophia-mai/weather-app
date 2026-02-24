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

function weatherCodeToDescription(code) {
  const descriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };
  return descriptions[code] ?? "Unknown";
}

function getCurrentWeather(location) {
  const url = `${FORECAST_URL}?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const forecast = {
        temperature: data.current.temperature_2m,
        unit: data.current_units.temperature_2m,
        description: weatherCodeToDescription(data.current.weather_code),
      };
      updateUI(location, forecast);
    })
    .catch((err) => console.log(err));
}

function updateUI(location, forecast) {
  document.getElementById("name").innerText = location.name;
  document.getElementById("condition").innerText = forecast.description;
  document.getElementById("temperature").innerHTML =
    `${forecast.temperature} &#8451;`;
}

document
  .getElementById("search")
  .addEventListener("submit", getWeatherForecast);
