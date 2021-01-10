//Current Time

/////////////////////////////////////////////////////////////////////////////////////
//New Date

function newDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  let date = now.getDate();
  if (hours < 10)
                hours =`0${hours}`;

  let minutes = now.getMinutes();
    if (minutes < 10)
                minutes = `0${minutes}`;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[now.getDay()];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
     let month = months [now.getMonth ()];

  return `Last updated: ${day}, ${hours}:${minutes}`
}

//////////////////////////////////////////////////////////////////////////

// Showing Temperature
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#degrees")
    degrees.innerHTML = `${temperature}ºC`;

  let weatherDescription = (response.data.weather[0].main)
    document.querySelector ("#weatherResume"). innerHTML = weatherDescription;

  let humidity = (response.data.main.humidity)
    document.querySelector ("#humidity"). innerHTML = humidity

  let wind = (response.data.wind.speed)
    document.querySelector ("#windSpeed"). innerHTML = wind

  let yourCityName = document.querySelector("#yourCityName")
  yourCityName.innerHTML = `${response.data.name}`

  let dateElement = document.querySelector("#currentTime")
  dateElement.innerHTML = newDate(response.data.dt * 1000)

  let iconWeather = document.querySelector("#iconWeather")
  iconWeather.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` )




  let fahrenheit = Math.round(response.data.main.temp * (9 / 5) + 32);

 /////////////////////////////METRIC BUTTONS////////////////////////////////////
    function handleFahrenheitClick () {
      let degrees= document.querySelector("#degrees");
      degrees.innerHTML = `${fahrenheit}ºF`;
    }
      let metricButton = document.querySelector("#metricButton2");
      metricButton.addEventListener("click", handleFahrenheitClick);

    function handleCelsiusClick () {
      let degrees= document.querySelector("#degrees");
      degrees.innerHTML = `${temperature}ºC`;
    }
      let celsiusButton =document.querySelector("#metricButton1");
      celsiusButton.addEventListener("click", handleCelsiusClick)
  }

///////////////////////////////////////////////////////////////////////////

//Selecting City
function yourCity(event) {
  event.preventDefault();
   let city = document.querySelector("#cityName").value
   let yourCityName = document.querySelector("#yourCityName")
   yourCityName.innerHTML = (city)

   search(city)
  }
let sign = document.querySelector("#yourCityWeatherInput");
sign.addEventListener("submit", yourCity);


/////////////////////////////////////////////////////////////////////////////////////
// API Weather por City
function search(city) {
  let apiKey = "ccd7e3ef34f8befeaea04a6b52aa4224";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
search ("Lisbon")
///////////////////////////////////////////////////////////////////////////////////

// Geolocation

function searchLocation(position) {
  let apiKey = "ccd7e3ef34f8befeaea04a6b52aa4224";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#geoLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

///////////////////////////////////////////////////////////////////////////////////
























