// Replace with your OpenWeather API key
const apiKey = '8265f4e8017b4ee0c4428e7556349e35';

// Set default background image when the app loads
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.backgroundImage = "url('images/default.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
});

// Event listener for the search button
document.getElementById('searchBtn').addEventListener('click', function () {
    const city = document.getElementById('cityInput').value;
    getWeather(city);
});

// Event listener for the reset button
document.getElementById('resetBtn').addEventListener('click', function () {
    resetWeatherDisplay(); // Reset weather display
});

function getWeather(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Log the entire response to see what's happening
            if (data.cod === "404") {
                alert('City not found. Please try again.');
            } else {
                displayWeather(data);
            }
        })
        .catch(error => {
            alert('An error occurred. Please try again.');
            console.log(error);
        });
}

function displayWeather(data) {
    const cityName = data.name;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed; // Get wind speed
    const weatherConditions = data.weather; // Get weather conditions

    // Display weather details
    document.getElementById('cityName').textContent = `Weather in ${cityName}`;
    document.getElementById('temperature').textContent = `Temperature: ${temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${windSpeed} m/s`; // Display wind speed

    // Change background image based on weather conditions
    changeBackground(temp, weatherConditions);
}

// Reset weather display
function resetWeatherDisplay() {
    document.getElementById('cityInput').value = ''; // Clear the input field
    document.getElementById('cityName').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('wind').textContent = ''; // Clear wind speed display
    document.body.style.backgroundImage = "url('images/default.png')"; // Reset to default background image
}

// Change background based on temperature and weather conditions
function changeBackground(temp, weatherConditions) {
    const body = document.body;

    // Check for rain in weather conditions
    const isRaining = weatherConditions.some(condition => condition.main.toLowerCase() === 'rain');

    if (isRaining) {
        body.style.backgroundImage = "url('images/rain.png')"; // Set rain background
    } else if (temp < 5) {
        body.style.backgroundImage = "url('images/snowy.png')";
    } else if (temp >= 5 && temp < 15) {
        body.style.backgroundImage = "url('images/cloudy.png')";
    } else if (temp >= 15 && temp < 25) {
        body.style.backgroundImage = "url('images/mild.png')";
    } else if (temp >= 25 && temp < 35) {
        body.style.backgroundImage = "url('images/sunny.png')";
    } else {
        body.style.backgroundImage = "url('images/hot.png')";
    }

    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
}
