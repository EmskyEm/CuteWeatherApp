// My Functions
function formatDate(date, timezone) {
  //console.log(city + "  " + timezone + "   " + date.toUTCString());

  // now.getTimezoneOffset() returns local offset wrt UTC in minutes as UTC time - your local time
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
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = days[dayIndex];
  console.log(`${day} ${hours}:${minutes}`);
  return `${day} ${hours}:${minutes}`;
}

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

  document.querySelector("#weather-icon").src /
    img /
    +response.data.weather[0].icon +
    ".png";
  f;
}

function search(city) {
  let apiKey = "8f2ac4f91e4219d33d78cabca0939d87";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
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

//Get
let dateElement = document.querySelector("#date");
let currentTime = new Date();
//dateElement.innerHTML = formatDate(currentTime, currentTime.getTimezoneOffset());

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
