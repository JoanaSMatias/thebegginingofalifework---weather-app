//Current Time

/////////////////////////////////////////////////////////////////////////////////////
//New Date

function newDate(timestamp) {
  let now = new Date(timestamp);
   let date = now.getDate()
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[now.getDay()];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
     let month = months [now.getMonth ()];

  return `Last updated: ${date} of ${month}, ${formatHours(timestamp)}, ${day}`;
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  let date = now.getDate();
  if (hours < 10)
                hours ="0" + hours;
  let minutes = now.getMinutes();
    if (minutes < 10)
                minutes="0" + minutes ;
  return `${hours}:${minutes}`;
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
  iconWeather.setAttribute("alt", response.data.weather[0].main )



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
function displayForecast(response) {
  console.log (response.data.list)

  let forecastElement = document.querySelector("#forecastRow1");
  forecastElement.innerHTML = null
  let forecast = null;
  

  for(let index = 0; index < 3; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML +=`
        <div class="col" id="day1">
          <p></p>
            <strong id="dayOfTheWeek1">${formatHours(forecast.dt * 1000)}</strong>
          <p></p>
            <span id="minimunTemp1">${Math.floor(forecast.main.temp_min)}</span>
            <span>ºC -</span>
            <span id="maximunTemp1">${Math.round(forecast.main.temp_max)}</span>
            <span>ºC</span>
          <p>
            <span id="descriptionDay1">${forecast.weather[0].main}</span>
            <img
                id=forecastIcon
                src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
          </p>
        </div>`  
};

  let forecastElement2 = document.querySelector("#forecastRow2");
  forecastElement2.innerHTML = null
  let forecast2 = null;

  for(let index = 3; index <= 4 ; index++) {
    forecast2 = response.data.list[index];
    forecastElement2.innerHTML +=`
        <div class="col" id="day1">
          <p></p>
            <strong id="dayOfTheWeek1">${formatHours(forecast2.dt * 1000)}</strong>
          <p></p>
            <span id="minimunTemp1">${Math.floor(forecast2.main.temp_min)}</span>
            <span>ºC -</span>
            <span id="maximunTemp1">${Math.round(forecast2.main.temp_max)}</span>
            <span>ºC</span>
          <p>
            <span id="descriptionDay1">${forecast2.weather[0].main}</span>
            <img
                id=forecastIcon
                src="http://openweathermap.org/img/wn/${forecast2.weather[0].icon}@2x.png"/>
          </p>
        </div>`  
}
}
/////////////////////////////////////////////////////////////////////////////////////
// API Weather por City
function search(city) {
  let apiKey = "ccd7e3ef34f8befeaea04a6b52aa4224";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);


  apiUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`
  axios.get(apiUrl).then(displayForecast)

}
search ("Lisbon")
///////////////////////////////////////////////////////////////////////////////////

// Geolocation

function searchLocation(position) {
  let apiKey = "ccd7e3ef34f8befeaea04a6b52aa4224";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);

  apiUrl =`https://api.openweathermap.org/data/2.5/forecast?lat=${
    position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast)
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#geoLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

///////////////////////////////////////////////////////////////////////////////////
























