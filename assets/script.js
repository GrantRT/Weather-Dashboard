// storing API Key in a global variable
var apiKey = '6b1a2201b5db8a2ed60768e430f6c667';

var cityFormEl = document.getElementById('cityForm');

// getting City name element
var cityNameEl = document.getElementById('cityName');

// getting date elements
var dateEl0 = document.getElementById('date0');
var dateEl1 = document.getElementById('date1');
var dateEl2 = document.getElementById('date2');
var dateEl3 = document.getElementById('date3');
var dateEl4 = document.getElementById('date4');
var dateEl5 = document.getElementById('date5');

// getting temperature elements
var tempEl0 = document.getElementById('temp0');
var tempEl1 = document.getElementById('temp1');
var tempEl2 = document.getElementById('temp2');
var tempEl3 = document.getElementById('temp3');
var tempEl4 = document.getElementById('temp4');
var tempEl5 = document.getElementById('temp5');

// getting windspeed elements
var windEl0 = document.getElementById('wind0');
var windEl1 = document.getElementById('wind1');
var windEl2 = document.getElementById('wind2');
var windEl3 = document.getElementById('wind3');
var windEl4 = document.getElementById('wind4');
var windEl5 = document.getElementById('wind5');

// getting humidity elements
var humidEl0 = document.getElementById('humid0');
var humidEl1 = document.getElementById('humid1');
var humidEl2 = document.getElementById('humid2');
var humidEl3 = document.getElementById('humid3');
var humidEl4 = document.getElementById('humid4');
var humidEl5 = document.getElementById('humid5');

// getting UV elements
var uvIndexEL0 = document.getElementById('uvIndex0');
var uvIndexEL1 = document.getElementById('uvIndex1');
var uvIndexEL2 = document.getElementById('uvIndex2');
var uvIndexEL3 = document.getElementById('uvIndex3');
var uvIndexEL4 = document.getElementById('uvIndex4');
var uvIndexEL5 = document.getElementById('uvIndex5');

// getting icon elements
var iconEl0 = document.getElementById('icon0');
var iconEl1 = document.getElementById('icon1');
var iconEl2 = document.getElementById('icon2');
var iconEl3 = document.getElementById('icon3');
var iconEl4 = document.getElementById('icon4');
var iconEl5 = document.getElementById('icon5');

// getting the weather cards element
var weatherCardsEl = document.getElementById('weather-cards');

var dateArray = [];
var tempArray = [];
var windArray = [];
var humidArray = [];
var uvArray = [];
var iconArray = [];

cityFormEl.addEventListener('submit', function (event) {
  event.preventDefault();
  clearPreviousData();

  var cityLocation = document.getElementById('cityLocation').value.trim();

  // fetch that gets the location's coordiantes
  fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityLocation + '&limit=5&appid=' + apiKey)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var coordinates = data[i];

        // displaying the city name
        var cityName = coordinates.name;
        cityNameEl.textContent = cityName;

        var latCoordinates = coordinates.lat;
        var lonCoordinates = coordinates.lon;
        console.log(cityName);
        console.log(latCoordinates);
        console.log(lonCoordinates);

        // fetch using the coordinates obtained from the previous api fetch. I could only search by coordinates not by location name
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latCoordinates + '&lon=' + lonCoordinates + '&exclude=minutely,hourly,alerts=&units=metric&appid=' + apiKey)
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            console.log(data);

            // looping 6 times as I want the current day and the next 5 days forecast
            for (var i = 0; i < 6; i++) {
              var weatherInfo = data.daily[i];

              var date = weatherInfo.dt;
              // convert the date from unix to a more user friendly format
              var unixFormat = moment.unix(date).format('MMM Do YYYY');
              dateArray.push(unixFormat);

              var temp = weatherInfo.temp.day;
              tempArray.push(temp);

              var windspeed = weatherInfo.wind_speed;
              windArray.push(windspeed);

              var humidity = weatherInfo.humidity;
              humidArray.push(humidity);

              var uvIndex = weatherInfo.uvi;
              uvArray.push(uvIndex);

              var weatherIcon = weatherInfo.weather[0].icon;
              iconArray.push(weatherIcon);
            }

            weatherCardsEl.classList.remove('hide');

            updateWeatherBoxes();
            console.log(dateArray);
            console.log(tempArray);
            console.log(windArray);
            console.log(humidArray);
            console.log(uvArray);
            console.log(iconArray);
          });
      }
    });
});

// function to update the weather boxes with the data
function updateWeatherBoxes() {
  // displaying the date
  dateEl0.textContent = dateArray[0];
  dateEl1.textContent = dateArray[1];
  dateEl2.textContent = dateArray[2];
  dateEl3.textContent = dateArray[3];
  dateEl4.textContent = dateArray[4];
  dateEl5.textContent = dateArray[5];
  // displaying the temperature
  tempEl0.textContent = 'Temp: ' + tempArray[0] + '°C';
  tempEl1.textContent = 'Temp: ' + tempArray[1] + '°C';
  tempEl2.textContent = 'Temp: ' + tempArray[2] + '°C';
  tempEl3.textContent = 'Temp: ' + tempArray[3] + '°C';
  tempEl4.textContent = 'Temp: ' + tempArray[4] + '°C';
  tempEl5.textContent = 'Temp: ' + tempArray[5] + '°C';
  // displaying the windspeed
  windEl0.textContent = 'Windspeed: ' + windArray[0] + 'm/s';
  windEl1.textContent = 'Windspeed: ' + windArray[1] + 'm/s';
  windEl2.textContent = 'Windspeed: ' + windArray[2] + 'm/s';
  windEl3.textContent = 'Windspeed: ' + windArray[3] + 'm/s';
  windEl4.textContent = 'Windspeed: ' + windArray[4] + 'm/s';
  windEl5.textContent = 'Windspeed: ' + windArray[5] + 'm/s';
  // displaying the humidity
  humidEl0.textContent = 'Humidity: ' + humidArray[0] + '%';
  humidEl1.textContent = 'Humidity: ' + humidArray[1] + '%';
  humidEl2.textContent = 'Humidity: ' + humidArray[2] + '%';
  humidEl3.textContent = 'Humidity: ' + humidArray[3] + '%';
  humidEl4.textContent = 'Humidity: ' + humidArray[4] + '%';
  humidEl5.textContent = 'Humidity: ' + humidArray[5] + '%';
  // displaying the UV Index
  uvIndexEL0.textContent = 'UV Index: ' + uvArray[0];
  uvIndexEL1.textContent = 'UV Index: ' + uvArray[1];
  uvIndexEL2.textContent = 'UV Index: ' + uvArray[2];
  uvIndexEL3.textContent = 'UV Index: ' + uvArray[3];
  uvIndexEL4.textContent = 'UV Index: ' + uvArray[4];
  uvIndexEL5.textContent = 'UV Index: ' + uvArray[5];
  // displaying the icons
  iconEl0.src = 'http://openweathermap.org/img/wn/' + iconArray[0] + '@2x.png';
  iconEl1.src = 'http://openweathermap.org/img/wn/' + iconArray[1] + '@2x.png';
  iconEl2.src = 'http://openweathermap.org/img/wn/' + iconArray[2] + '@2x.png';
  iconEl3.src = 'http://openweathermap.org/img/wn/' + iconArray[3] + '@2x.png';
  iconEl4.src = 'http://openweathermap.org/img/wn/' + iconArray[4] + '@2x.png';
  iconEl5.src = 'http://openweathermap.org/img/wn/' + iconArray[5] + '@2x.png';
}

function clearPreviousData() {
  if (dateArray.length !== 0) {
    dateArray = [];
  }
  if (tempArray.length !== 0) {
    tempArray = [];
  }
  if (windArray.length !== 0) {
    windArray = [];
  }
  if (humidArray.length !== 0) {
    humidArray = [];
  }
  if (uvArray.length !== 0) {
    uvArray = [];
  }
  if (iconArray.length !== 0) {
    iconArray = [];
  }
}
