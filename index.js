const API_KEY = "c010e72b3e50cca725e0b2559b3e4ffe"; // Replace with your OpenWeather API key

function fetchWeather(city) {
  if (!city) {
    alert(
      "Phnom Penh",
      "New York",
      "London",
      "Tokyo",
      "Paris",
      "Sydney",
      "Dubai",
      "Bangkok",
      "Berlin",
      "Toronto",
      "Moscow",
      "Los Angeles",
      "Chicago",
      "Mexico City",
      "Hong Kong",
      "Seoul",
      "Singapore",
      "Rome",
      "Istanbul",
      "São Paulo",
      "Madrid",
      "Cairo",
      "Mumbai",
      "Jakarta",
      "Beijing",
      "Buenos Aires",
      "Kuala Lumpur",
      "Johannesburg",
      "Lagos",
      "Vienna"
    );
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`City "${city}" not found!`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Forecast Data:", data);

      const weatherContainer = document.getElementById("weather");
      weatherContainer.innerHTML = ""; // Clear previous content

      // Get data for the next 5 days (filter once per day)
      const dailyForecasts = {};
      data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0]; // Extract date (YYYY-MM-DD)
        if (!dailyForecasts[date]) {
          dailyForecasts[date] = item; // Store only one forecast per day
        }
      });

      const forecastDays = Object.values(dailyForecasts).slice(0, 5); // Get first 5 days

      forecastDays.forEach((day) => {
        const date = new Date(day.dt * 1000).toDateString();
        const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
        const temp = day.main.temp;
        const condition = day.weather[0].description;

        const forecastBox = `
                    <div class="weather-box">
                        <h3>${date}</h3>
                        <img src="${icon}" class="weather-icon" alt="Weather Icon">
                        <p><strong>${temp}°C</strong></p>
                        <p>${condition}</p>
                    </div>
                `;
        weatherContainer.innerHTML += forecastBox;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById(
        "weather"
      ).innerHTML = `<p style="color: red;">⚠️ ${error.message}</p>`;
    });
}

// Fetch default weather for Phnom Penh on page load
window.onload = () => fetchWeather("Phnom Penh");
