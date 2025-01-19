import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "./actions";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("celsius");
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loading);
  const weather = useSelector((state) => state.weather);
  const error = useSelector((state) => state.error);

  const handleSearch = () => {
    if (city) {
      dispatch(fetchWeather(city));
    }
  };

  const convertTemperature = (temp) => {
    if (unit === "celsius") {
      return `${temp}°C`;
    } else {
      return `${((temp * 9) / 5 + 32).toFixed(2)}°F`;
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <button
        onClick={() => setUnit(unit === "celsius" ? "fahrenheit" : "celsius")}
      >
        Switch to {unit === "celsius" ? "Fahrenheit" : "Celsius"}
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>
            {weather.location.name}, {weather.location.country}
          </h2>
          <p>Temperature: {convertTemperature(weather.current.temperature)}</p>
          <p>Weather: {weather.current.weather_descriptions[0]}</p>
          <img src={weather.current.weather_icons[0]} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
};

export default Weather;
