import React, { useState, useEffect } from "react";

const WeatherForecast = ({ city }) => {
  const [error, setError] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [temperatureUnit, setTemperatureUnit] = useState("Celsius");

  const API_KEY = "625023c8b35cda33d63e88971f9ecf94";
  const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);
        if (data.cod === "404" || city === "") {
          setError("Please enter a valid city");
        } else {
          setForecastData(data.list);
        }
      } catch (error) {
        console.log("Error Fetching Forecast Data", error);
      }
    };
    if (city) {
      fetchForecastData();
    }
  }, [API_URL, city]);

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const kelvinToFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * 9) / 5 + 32;
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit((unit) =>
      unit === "Celsius" ? "Fahrenheit" : "Celsius"
    );
  };

  return (
    <div>
      {error ? (
        <div>
          <h1>{error}</h1>
        </div>
      ) : (
        <div>
          <div className="five-day">
            {" "}
            <span>
              5-Day Weather Forecast for{" "}
              <center>
                <span>{city.toUpperCase()}</span>
              </center>
            </span>
          </div>

          <center>
            <button onClick={toggleTemperatureUnit} className="convert-button">
              {temperatureUnit === "Fahrenheit"
                ? "Switch to Celcuis"
                : "Switch to Farenheit"}
            </button>
          </center>
          <div className="forecast-container">
            {forecastData.map((item) => (
              <div key={item.dt} className="forecast-item">
                <h2>Date: {item.dt_txt}</h2>
                <p>
                  Average Temperature:{" "}
                  {temperatureUnit === "Celsius"
                    ? kelvinToCelsius(item.main.temp).toFixed(2) + "°C"
                    : kelvinToFahrenheit(item.main.temp).toFixed(2) + "°F"}
                </p>
                <p>Description: {item.weather[0].description}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
