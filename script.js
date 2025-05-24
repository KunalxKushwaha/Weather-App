const cityInput = document.querySelector('.inp-city');
const searchButton = document.querySelector('.srch-button');

searchButton.addEventListener('click', () => {
    if(cityInput.value.trim() === '') {
        alert('Please enter a city name')
    }
    else{
       
        cityInput.blur();
        console.log(cityInput.value);
         cityInput.value = ''
    }
    
});
