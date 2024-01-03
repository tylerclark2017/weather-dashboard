var apiKey = 'b70804e39be9e864cf9755c6056c4418';
var latitude = "";
var longitude = "";
var searchForm = document.querySelector("#search-form");
var currentWeatherContainer = document.querySelector("#current-weather-info")
var forecastWeatherContainer = document.querySelector("#forecast-cards")
searchForm.addEventListener("submit", function(event){
    event.preventDefault()
    var city = document.querySelector("#search-input").value;
    currentWeather(city)
    localStorage.setItem('city', city);
})
function render (data, container) {
    var div = document.createElement('div')
    var h2 = document.createElement('h2')
    h2.textContent = data.name
    var img = document.createElement ('img')
    img.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    h2.append(img)
    div.append(h2)
    var temp = document.createElement('p')
    temp.textContent = 'temp: ' + data.main.temp
    var humidity = document.createElement('p')
    humidity.textContent = 'humidity: ' + data.main.humidity
    var wind = document.createElement('p')
    wind.textContent = data.wind.speed + ' mph'
    div.append(temp, humidity, wind)
    container.append(div)
}
function currentWeather (city){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial' + '&appid=' + apiKey)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      
      console.log(data);
      render(data, currentWeatherContainer)
      fiveDayForecast(city)
     
    })
    .catch(function(error) {
      
      console.error(error);
    });  
}



function fiveDayForecast (city){
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial' + '&appid=' + apiKey)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      
      console.log(data);
      for (let i = 0; i < data.list.length; i+=8){
        render(data.list[i], forecastWeatherContainer)
      }
     
    })
    .catch(function(error) {
      
      console.error(error);
    });  
}

  function updateUI(weatherData) {
    var cityName = weatherData.city.name;
    var date = weatherData.list[0].dt_txt;
    var icon = weatherData.list[0].weather[0].icon;
    var temperature = weatherData.list[0].main.temp;
    var humidity = weatherData.list[0].main.humidity;
    var windSpeed = weatherData.list[0].wind.speed;
  
    document.getElementById('city-name').textContent = cityName;
    document.getElementById('date').textContent = date;
    document.getElementById('weather-icon').setAttribute('src', `https://openweathermap.org/img/w/${icon}.png`);
    document.getElementById('temperature').textContent = temperature;
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('wind-speed').textContent = windSpeed;
  }

  function addToSearchHistory(cityName) {
    var listItem = document.createElement('li');
    listItem.textContent = cityName;
  
    listItem.addEventListener('click', function() {
      currentWeather(cityName);
    });
  
    document.getElementById('search-history').appendChild(listItem);
  }

  window.addEventListener('load', function() {
    var city = localStorage.getItem('city');
    if (city) {
      currentWeather(city);
    }
  
    document.querySelectorAll('#search-history li').forEach(function(item) {
      item.addEventListener('click', function() {
        var cityName = this.textContent;
        getWeatherData(cityName);
      });
    });
  });