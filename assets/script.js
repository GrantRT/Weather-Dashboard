// storign API Key in a global variable
var apiKey = '6b1a2201b5db8a2ed60768e430f6c667';
var cityFormEl = document.getElementById('cityForm');

cityFormEl.addEventListener('submit', function (event) {
  event.preventDefault();

  var cityLocation = document.getElementById('cityLocation').value.trim();

  // fetch that gets the location's coordiantes
  fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityLocation + '&limit=5&appid=' + apiKey)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var coordinates = data[i];

        var latCoordinates = coordinates.lat;
        var lonCoordinates = coordinates.lon;
        console.log(latCoordinates);
        console.log(lonCoordinates);

        // fetch using the coordinates obtained from the previous api fetch. I could only search by coordinates not by location name
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latCoordinates + '&lon=' + lonCoordinates + '&exclude=minutely,hourly,alerts=&units=metric&appid=' + apiKey)
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            console.log(data);
            for (var i = 0; i < 6; i++) {
              var weatherInfo = data.daily[i];

              var date = weatherInfo.dt;
              var temp = weatherInfo.temp.day;
              var windspeed = weatherInfo.wind_speed;
              var humidity = weatherInfo.humidity;
              var uvIndex = weatherInfo.uvi;
              var weatherIcon = weatherInfo.weather[0].icon;

              console.log(date);
              console.log(temp);
              console.log(windspeed);
              console.log(humidity);
              console.log(uvIndex);
              console.log(weatherIcon);
            }
          });
      }
    });
});
