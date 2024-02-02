import React, { useState } from "react";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { WiNightAltSnowWind } from "react-icons/wi";
import { TiWeatherCloudy } from "react-icons/ti";
import "./WeatherForecast";
import WeatherForecast from "./WeatherForecast";
const API_KEY = "625023c8b35cda33d63e88971f9ecf94";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState(false);
  const [forecastCity, setForecastCity] = useState("");
  const [isCelcius, setIscelcius] = useState(true);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log(data);
      if (data.cod === "404" || city === "") {
        setError("No data Found");
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const handleToggleForecast = () => {
    if (!city) {
      setError("please enter the valid name in the search Box");
      return;
    }
    setForecast(!forecast);
    if (!forecast) {
      setForecastCity(city);
    } else {
      setForecastCity("");
    }
  };

  const toggleTemperatureUnit = () => {
    setIscelcius((prevValue) => !prevValue);
  };

  return (
    <div className="mainContainer">
      <div className="weather-app">
        <h1>Weather App</h1>
        <br></br>
        <img
          src="https://ayushkul.github.io/react-weather-app/icons/perfect-day.svg"
          alt="weatherimage"
          width={"150px"}
          height={"150px"}
        />
        <br></br>
        <div className="txt-field">
          <form onSubmit={handleSubmit}>
            <input
              className="input-box"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name (Ex:Delhi,London)"
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
        </div>
        <br></br>
        {error ? (
          <div>
            <h1>{error}</h1>
          </div>
        ) : (
          <div>
            {weatherData && (
              <div className="weather-details" id="txt">
                <center><span className="city-text">{weatherData.name.toUpperCase()}</span></center>
                <div className="weather-data">
                  <div className="column">
                    <FaTemperatureHigh className="image"/>
                    <span className="span">
                      {isCelcius
                        ? `${weatherData.main.temp}°C`
                        : `${(weatherData.main.temp * 9) / 5 + 32}°F`}
                      <span>Temperature</span>
                    </span>
                  </div>
                  <div className="column">
                  <FaTemperatureArrowUp className="image"/>
                    <span className="span">
                      {isCelcius
                        ? `${weatherData.main.temp_min}°C`
                        : `${(weatherData.main.temp_min * 9) / 5 + 32}°F`}
                      <span>Min Temperature</span>
                    </span>
                  </div>
                  <div className="column">
                    <FaTemperatureArrowDown className="image"/>
                    <span className="span">
                      {isCelcius
                        ? `${weatherData.main.temp_max}°C`
                        : `${(weatherData.main.temp_max * 9) / 5 + 32}°F`}

                      <span>Max Temperature</span>
                    </span>
                  </div>
                  <div className="column">
                  <WiHumidity className="image"/>
                    <span className="span">
                      {weatherData.main.humidity}%<span>Humidity</span>
                    </span>
                  </div>
                  <div className="column">
                  <WiNightAltSnowWind className="image"/>
                    <span className="span">
                      {weatherData.wind.speed} m/s
                      <span>Wind Speed </span>
                    </span>
                  </div>
                  <div className="column">
                    <TiWeatherCloudy className="image" />
                    <span className="span">
                      {weatherData.weather[0].description}
                      <span>Weather</span>
                    </span>
                  </div>
                  </div>
                  <div className="faren-button">
                    <button
                      onClick={toggleTemperatureUnit}
                      className="convert-button"
                    >
                      {isCelcius ? "Switch to Farenheit" : "Switch to Celcius"}
                    </button>
                  </div>
                  <div className="Forecast-text">
                    <label>Show 5-Day Forecast:</label>
                    <button
                      className={
                        forecast ? "toggle-button active" : "toggle-button"
                      }
                      onClick={handleToggleForecast}
                    >
                      
                    </button>
                  </div>
                
                <div>
                  <div>
                    {forecast && <WeatherForecast city={forecastCity} />}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* done the Main Component */}
      </div>
    </div>
  );
}

export default App;
