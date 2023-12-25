var apiKey = 'b70804e39be9e864cf9755c6056c4418';
var latitude = "";
var longitude = "";

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Handle the weather data here
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occur during the request
    console.error(error);
  });