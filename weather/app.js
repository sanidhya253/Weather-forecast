const apiKey = 'bcfde293d8611c70cabade1b057cc4ea'; // Replace with your OpenWeatherMap API key
const weatherContainer = document.getElementById('weather');
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');


const defaultCity = 'Montgomery';


searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});


window.addEventListener('load', () => {
    fetchWeather(defaultCity);
    locationInput.value = defaultCity;
});

async function fetchWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('API Response:', data);
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    if (data.cod === 200) {
        const city = data.name;
        const temperature = Math.round(data.main.temp) + '°C';
        const description = data.weather[0].description;
        const humidity = `Humidity: ${data.main.humidity}%`;
        const pressure = `Pressure: ${data.main.pressure} hPa`;
        const visibility = `Visibility: ${(data.visibility / 1000).toFixed(1)} km`;
        const wind = `Wind: ${data.wind.speed} m/s`;
        const date = `Date: ${new Date().toLocaleDateString()}`;

        document.querySelector('.city').textContent = city;
        document.querySelector('.temperature').textContent = temperature;
        document.querySelector('.description').textContent = description;
        document.querySelector('.humidity').textContent = humidity;
        document.querySelector('.pressure').textContent = pressure;
        document.querySelector('.visibility').textContent = visibility;
        document.querySelector('.wind').textContent = wind;
        document.querySelector('.date').textContent = date;
    } else {
        console.error('Error in API response:', data.message);
        alert('City not found!');
    }
}
