const search = document.querySelector('.search-tab')
const country = document.querySelector('.place .country')
const city = document.querySelector('.place .city')
const temperature = document.querySelector('.temperate span')
const weatherStatus = document.querySelector('.weather-status h1')
const sight = document.querySelector('.sight p')
const wind = document.querySelector('.wind p')
const cloud = document.querySelector('.wet p')
const box = document.querySelector('.container')
const body = document.querySelector('body')
const time = document.querySelector('.time span')



function changeWeather(cityName) {
    var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=d78fd1588e1b7c0c2813576ba183a667`

    fetch(apiUrl).then(res => res.json())
    .then(
        function(test) {
            city.innerText = test[0].name
            country.innerText = test[0].country
            var lon = test[0].lon
            var lat = test[0].lat
            
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d78fd1588e1b7c0c2813576ba183a667`)
            .then(res => res.json())
            .then(
                function(value){
                    temperature.innerText = Math.floor(value.main.temp - 273.15) 
                    weatherStatus.innerText = value.weather[0].main
                    sight.innerText = value.visibility + ' (m)'
                    wind.innerText = value.wind.speed + ' (m/s)'
                    cloud.innerText = value.clouds.all + ' (%)'

                    if (temperature.innerText < 18)
                    {
                        box.style.backgroundImage = 'url(./assets/cold.png)'
                        body.className = 'cold'
                    }
                    else
                    {
                        box.style.backgroundImage = 'url(./assets/hot.png)'
                        body.className = 'hot'
                    }
                }
            )
            
            fetch(`https://api.ipgeolocation.io/timezone?apiKey=06a77590884d46b4b3608c31aee56176&lat=${lat}&long=${lon}`)
                .then(response => response.json())
                .then(response => {
                    time.innerText = response.date_time
                })
                
                
        }
    )
}

search.addEventListener('keydown', function(e) {
    if(e.key == 'Enter'){
        changeWeather(e.target.value.trim())
        search.value = ''
    }
})

changeWeather('Hanoi')