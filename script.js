const cityInput = document.querySelector('.inp-city');
const searchButton = document.querySelector('.srch-button');
const apiKey = `f75a076ddfd3036a93271f06bccada56`
const weatherInfo = document.querySelector('.weather-info');
const notFound = document.querySelector('.not-found');
const searchCity = document.querySelector('.search-city');

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
async function updateWeather(Weather,city) {
    const weatherData = await getFetchData(Weather,city);

    if(weatherData.cod !== '200') {
        showDislplaySection(notFound)
    }
    
      else{
          showDislplaySection(weatherInfo);
        console.log(weatherData);
      }
      
        
    
  
}

function showDislplaySection(section) {
    [weatherInfo,searchCity,notFound].forEach(section => section.style.display = "none");

    section.style.display = "flex";
}