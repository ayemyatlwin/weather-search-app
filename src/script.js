

function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let FtemperatureElement=document.querySelector("#fTemp");
  let CtemperatureElement=document.querySelector("#cTemp");
  let description = document.querySelector("#temperature_description");
  let icon=document.querySelector("#icon")
  let temperature = Math.round(response.data.main.temp);
  let temperature_description = response.data.weather[0].description;
  temperatureElement.innerHTML = `${temperature}`;
  CtemperatureElement.addEventListener("click",tempFunc)
  FtemperatureElement.addEventListener("click",tempFunc2)
  function tempFunc(){
    temperatureElement.innerHTML = `${temperature}`;

  }
  function tempFunc2(){
    //console.log("clicked F");
    let fahValue=Math.round(temperature*1.8+32);
    temperatureElement.innerHTML=fahValue;
  }
  description.innerHTML = `${temperature_description}`;
  icon.setAttribute("src",`https://www.openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  //response.data.weather[0].icon

  let wind = response.data.wind.speed;
  let windSpeed = Math.round(wind * 2.24);
  let details = document.querySelector("#wind");
  details.innerHTML = `Wind: ${windSpeed} mph`;

  let humidity = response.data.main.humidity;
  let rain = document.querySelector("#rain");
  rain.innerHTML = ` Humidity: ${humidity}%`;
}


function searchCity(event) {
  event.preventDefault();
  let apiKey = "a517e2f077fee2ef9b2aa7d6e87f83b4";
  let city = document.querySelector("#input").value;
  let unit = "metric";
  let h1 = document.querySelector("#city");
  h1.innerHTML = city;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}
let btn = document.querySelector("#search-btn");
btn.addEventListener("click", searchCity);

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let h2 = document.querySelector("h2");
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${hours}`;
}
h2.innerHTML = `${day} ${hours}:${minutes}`;




function showPosition(position) {
    // console.log(position.coords.latitude);
    // console.log(position.coords.longitude);
    let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(currentTemp);
  }
function currentTemp(response) {
    let temperature = Math.round(response.data.main.temp);
    let tempCurrent = document.querySelector("#temperature");
    let FtemperatureElement=document.querySelector("#fTemp");
    let CtemperatureElement=document.querySelector("#cTemp");
    let icon=document.querySelector("#icon")
    tempCurrent.innerHTML = `${temperature}`;
    CtemperatureElement.addEventListener("click",tempFunc)
    FtemperatureElement.addEventListener("click",tempFunc2)
    function tempFunc(){
      tempCurrent.innerHTML = `${temperature}`;
  
    }
  function tempFunc2(){
    //console.log("clicked F");
    let fahValue=Math.round(temperature*1.8+32);
    tempCurrent.innerHTML=fahValue;
  }
    let h1 = document.querySelector("#city").innerHTML=`${response.data.name}`;  
    let weatherAppDescription = response.data.weather[0].description;
    let temperature_description = document.querySelector("#temperature_description");
    temperature_description.innerHTML = `${weatherAppDescription}`;
    icon.setAttribute("src",`https://www.openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    let wind = response.data.wind.speed;
    let windSpeed = Math.round(wind * 2.24);
    let details = document.querySelector("#wind");
    details.innerHTML = `Wind: ${windSpeed} mph`;
  
    let humidity = response.data.main.humidity;
    let rain = document.querySelector("#rain");
    rain.innerHTML = ` Humidity: ${humidity}%`;
  }
  
  function currentWeather(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  let currentButton = document.querySelector("#current");
  currentButton.addEventListener("click", currentWeather);
  