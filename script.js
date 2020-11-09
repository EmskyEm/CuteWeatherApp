// My Date & Time
function formatDate(date, timezone) {
  let localOffsetInMs = date.getTimezoneOffset() * 60 * 1000;
  let targetOffsetInMs = timezone * 1000;
  let targetTimestamp = date.getTime() + localOffsetInMs + targetOffsetInMs;
  let localDate = new Date(targetTimestamp);

  let hours = localDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = localDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = localDate.getDay();
  let days = [
    "Sunday,",
    "Monday,",
    "Tuesday,",
    "Wednesday,",
    "Thursday,",
    "Friday,",
    "Saturday,",
  ];

  let day = days[dayIndex];
  console.log(`${day} ${hours}:${minutes}`);
  return `${day} ${hours}:${minutes}`;
}

//Formating the time for the FORECAST
function formatHours(timestamp) {
  let localDate = new Date(timestamp);

  let hours = localDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = localDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// Fetching data from openweathermap.org -to display their info on my app.

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#unit-number").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#conditions").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#date").innerHTML = formatDate(
    new Date(),
    response.data.timezone
  );

  document.querySelector("#weather-icon").src =
    "src/img/" + response.data.weather[0].icon + ".png";
}

//Converting my weather choices into action.Start on this section.
function dispalyForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <strong>
        ${formatHours(forecast.dt * 1000)}
      </strong>
      <img class="forecast-icon"
        src="src/img/${forecast.weather[0].icon}.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

function search(city) {
  let apiKey = "8f2ac4f91e4219d33d78cabca0939d87";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function cToF(celsius) {
  return (celsius * 9) / 5 + 32;
}

function fToC(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#unit-number");
  var celsius = temperatureElement.innerHTML;
  var fahrenheit = cToF(celsius);
  temperatureElement.innerHTML = Math.round(fahrenheit);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#unit-number");
  var fahrenheit = temperatureElement.innerHTML;
  var celsius = fToC(fahrenheit);
  temperatureElement.innerHTML = Math.round(celsius);
}

function convertToCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}
function getCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8f2ac4f91e4219d33d78cabca0939d87";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//
let dateElement = document.querySelector("#date");
let currentTime = new Date();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", convertToCurrentLocation);
