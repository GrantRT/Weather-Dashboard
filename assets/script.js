// storing API Key in a global variable
var apiKey = '1ed16faaaf4ec7519219183d278b85c8';

// getting cityForm element
var cityFormEl = document.getElementById('cityForm');

// getting cityName element
var cityNameEl = document.getElementById('cityName');

// getting previous searches element
var previousSearchEl = document.getElementById('previous-searches');

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
var uvIndexEl0 = document.getElementById('uvIndex');

// getting icon elements
var iconEl0 = document.getElementById('icon0');
var iconEl1 = document.getElementById('icon1');
var iconEl2 = document.getElementById('icon2');
var iconEl3 = document.getElementById('icon3');
var iconEl4 = document.getElementById('icon4');
var iconEl5 = document.getElementById('icon5');

// getting the weather cards element
var weatherCardsEl = document.getElementById('weather-cards');

// empty arrays for the different types of data
var dateArray = [];
var tempArray = [];
var windArray = [];
var humidArray = [];
var uvArray = [];
var iconArray = [];

// using local storage to save past searches
var pastSearches = JSON.parse(localStorage.getItem('city'));

if (!pastSearches) {
  pastSearches = [];
  previousSearchEl.classList.add('hide');
}
// calls the renderPastSearches function so that they are viewable on page load
renderPastSearches(pastSearches);

// function to render the past searches
function renderPastSearches(pastSearches) {
  previousSearchEl.textContent = '';

  for (var i = 0; i < pastSearches.length; i++) {
    var pastSearchesLi = pastSearches[i];

    if (pastSearchesLi == '') {
      return;
    } else {
      var li = document.createElement('li');
      li.textContent = pastSearchesLi;

      previousSearchEl.appendChild(li);
    }
  }
}

// function to run the fetch when a city is searched
function citySearch() {
  var cityLocation = document.getElementById('cityLocation').value.trim();

  function saveSearch() {
    pastSearches.push(cityLocation);
    localStorage.setItem('city', JSON.stringify(pastSearches));

    console.log(pastSearches);
  }
  saveSearch(pastSearches);

  if (cityLocation == '') {
    alert('Please enter a location');
    return;
  } else {
    // fetch that gets the location's coordiantes
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + cityLocation + '&limit=5&appid=' + apiKey)
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

              uvRiskColour();
              updateWeatherBoxes();
            });
        }
      });
  }
}

// event listener for clicking the search history list
previousSearchEl.addEventListener('click', selectCity);

// function to run fetch if the city is selected from history
function selectCity(event) {
  if (event) {
    var searchHistorySelect = event.target.textContent;

    // fetch that gets the location's coordiantes
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + searchHistorySelect + '&limit=5&appid=' + apiKey)
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
              uvRiskColour();
              clearPreviousData();
            });
        }
      });
  }
}

// event listener for clicking the search button
cityFormEl.addEventListener('submit', function (event) {
  event.preventDefault();

  citySearch();
  clearPreviousData();
  renderPastSearches(pastSearches);
  previousSearchEl.classList.remove('hide');
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
  tempEl0.textContent = 'Temp: ' + tempArray[0] + '??C';
  tempEl1.textContent = 'Temp: ' + tempArray[1] + '??C';
  tempEl2.textContent = 'Temp: ' + tempArray[2] + '??C';
  tempEl3.textContent = 'Temp: ' + tempArray[3] + '??C';
  tempEl4.textContent = 'Temp: ' + tempArray[4] + '??C';
  tempEl5.textContent = 'Temp: ' + tempArray[5] + '??C';
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
  uvIndexEl0.textContent = uvArray[0];

  // displaying the icons
  iconEl0.src = 'https://openweathermap.org/img/wn/' + iconArray[0] + '@2x.png';
  iconEl1.src = 'https://openweathermap.org/img/wn/' + iconArray[1] + '@2x.png';
  iconEl2.src = 'https://openweathermap.org/img/wn/' + iconArray[2] + '@2x.png';
  iconEl3.src = 'https://openweathermap.org/img/wn/' + iconArray[3] + '@2x.png';
  iconEl4.src = 'https://openweathermap.org/img/wn/' + iconArray[4] + '@2x.png';
  iconEl5.src = 'https://openweathermap.org/img/wn/' + iconArray[5] + '@2x.png';
}

// function to clear the previous data before rendering the new
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

// function that applies a coloured background to the uv index
function uvRiskColour() {
  if (uvIndexEl0.textContent <= 2.99) {
    uvIndexEl0.setAttribute('class', 'lowRisk');
  } else if (uvIndexEl0.textContent >= 3 && uvIndexEl0.textContent <= 5.99) {
    uvIndexEl0.setAttribute('class', 'moderateRisk');
  } else if (uvIndexEl0.textContent >= 6 && uvIndexEl0.textContent <= 7.99) {
    uvIndexEl0.setAttribute('class', 'highRisk');
  } else if (uvIndexEl0.textContent >= 8 && uvIndexEl0.textContent <= 10.99) {
    uvIndexEl0.setAttribute('class', 'veryHighRisk');
  } else if (uvIndexEl0.textContent >= 11) {
    uvIndexEl0.setAttribute('class', 'extremeRisk');
  }
}
