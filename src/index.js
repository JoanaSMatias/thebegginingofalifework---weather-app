//Current Time
function today() {
 let now = new Date();
 let date = now.getDate();
 let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 let day = days[now.getDay()];
 let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
 let month = months [now.getMonth ()];
 let hours = now.getHours();
let minutes = now.getMinutes();
 if (minutes < 10)
                minutes = "0" + minutes
let nowToday = document.querySelector("#currentTime");
nowToday.innerHTML = (`${date} of ${month}, ${hours}:${minutes}, ${day}`)
}
today();

//////////////////////////////////////////////////////////////////////////

// Showing Temperature
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#degrees")
  let weatherDescription = (response.data.weather[0].main)
  let humidity = (response.data.main.humidity)
  let wind = (response.data.wind.speed)

  let yourCityName = document.querySelector("#yourCityName")
  yourCityName.innerHTML = `${response.data.name}`

//let dateElement = document.querySelector("#currentTime");
//dateElement.innerHTML = formatDate(today);


  if (temperature > 17){degrees.innerHTML = `${temperature}ºC 🌞`} else {degrees.innerHTML = `${temperature}ºC ❄`}
  document.querySelector ("#weatherResume"). innerHTML = weatherDescription;
  document.querySelector ("#humidity"). innerHTML = humidity
  document.querySelector ("#windSpeed"). innerHTML = wind
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



// if (weather[input.value] !== undefined) {
    //let tempfahrenheit = Math.floor(weather[input.value].temp * (9 / 5) + 32);
   // let temp = Math.floor(weather[input.value].temp);

   // alert(
     // `It is currently ${
      //  weather[input.value].temp
     // }ºC (${tempfahrenheit}ºF) in ${input.value} with a humidity of ${
      //  weather[input.value].humidity
     // }%.`
   // );
 // } else {
   // alert(`Sorry, we don't know the weather for this city, try going to
//https://www.google.com/search?q=weather+${input.value}`);






















