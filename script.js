const cityInput = document.querySelector('.inp-city');
const searchButton = document.querySelector('.srch-button');
const apiKey = `f75a076ddfd3036a93271f06bccada56`

const weatherInfo = document.querySelector('.weather-info');
const notFound = document.querySelector('.not-found');
const searchCity = document.querySelector('.search-city');

const Countrytxt = document.querySelector('.country-txt');
const Temptxt = document.querySelector('.temp-txt');
const Conditiontxt = document.querySelector('.condition-text');
const Humiditytxt = document.querySelector('.Humidity-value-txt');
const Pressuretxt = document.querySelector('.Pressure-value-txt');
const Windtxt = document.querySelector('.Wind-value-txt');
const weathjerSummaryImg = document.querySelector('.weather-summ-img');
const currentDateTxt = document.querySelector('.current-date-txt');
const forecastItems = document.querySelector('.forecast-item-cont');

searchButton.addEventListener('click', () => {
    if(cityInput.value.trim() === '') {
        alert('Please enter a city name')
    }
    else{
       
        cityInput.blur();
        updateWeather(cityInput.value);
         cityInput.value = ''
    }   
});

cityInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        if(cityInput.value.trim() === '') {
            alert('Please enter a city name');
        } else {
            cityInput.blur();
            updateWeather(cityInput.value);
            cityInput.value = '';
        }
    }
});

 async function getFetchData(endPoint, city) {
     endPoint = endPoint === 'weather' ? 'weather' : 'forecast';
     city= cityInput.value.trim();
    const apiURL= `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiURL)
        return response.json()


}

function getWeatherIcon(id) {
    if(id >= 200 && id <= 232) {
        return 'thunderstorm';
    } else if(id >= 300 && id <= 321) {
        return 'drizzle';
    } else if(id >= 500 && id <= 531) {
        return 'rain';
    } else if(id >= 600 && id <= 622) {
        return 'snow';
    } else if(id >= 701 && id <= 781) {
        return 'atmosphere';
    } else if(id === 800) {
        return 'clear';
    } else if(id >= 801 && id <= 804) {
        return 'clouds';
    } else {
        return 'unknown';
    }
}

function getcurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'short', month: 'short', day: '2-digit', year: '2-digit' };
    return(currentDate.toLocaleDateString('en-GB', options));
}

async function updateWeather(endPoint,city) {
    const weatherData = await getFetchData(endPoint,city);

    if(weatherData.cod !== '200') {
        showDislplaySection(notFound)
        return;
    }
         console.log(weatherData);
      const {
       city: { name: cityName },
       list :[{main: { temp, humidity, pressure },
               weather: [{ id, main: weatherMain, description }],
               wind: { speed }}]
} = weatherData;

       Countrytxt.textContent = cityName;
       Temptxt.textContent = `${Math.round(temp)}°C`;
       Conditiontxt.textContent = weatherMain;
       Humiditytxt.textContent = `${humidity}%`;
       Pressuretxt.textContent = `${pressure} hPa`;
       Windtxt.textContent = `${Math.round(speed)} m/s`;
       currentDateTxt.textContent = getcurrentDate()
       weathjerSummaryImg.src = `assets/assets/weather/${getWeatherIcon(id)}.svg`;
         
       
                 const TimeTaken = "12:00:00";
                 const TodayDate = new Date().toISOString().split('T')[0];
                 forecastItems.innerHTML = ''; // Clear previous forecast items
             weatherData.list.forEach(forecastWeather =>{
                if(forecastWeather.dt_txt.includes(TimeTaken) && !forecastWeather.dt_txt.includes(TodayDate)) {
                    console.log(forecastWeather);
                     updateForecastItems(forecastWeather)
                }
    })
       
        showDislplaySection(weatherInfo);
  
}

function updateForecastItems(weatherData) {
    console.log(weatherData);
    const {
        dt_txt = date,
        main: { temp, },
        weather: [{ id }],
        wind: { speed }
    } = weatherData;
    
const DateTaken = new Date(dt_txt);
    const options = {  month: 'short', day: '2-digit' };
    const formattedDate = DateTaken.toLocaleDateString('en-US', options);

    const forecastItem = `
            <div class="forecast-item">
                    <h5 class="forecast-item-date regular-txt">${formattedDate}</h5>
                    <img src="assets/assets/weather/${getWeatherIcon(id)}.svg" class="forecast-item-image">
                    <h5 class="forecast-item-temp">${Math.round(temp)}°C</h5>
            </div>
    `

    forecastItems.insertAdjacentHTML('beforeend', forecastItem);
}

function showDislplaySection(section) {
    [weatherInfo,searchCity,notFound].forEach(section => section.style.display = "none");

    section.style.display = "flex";
}