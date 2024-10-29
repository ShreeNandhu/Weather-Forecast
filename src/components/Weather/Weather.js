import React, { useEffect, useState, useCallback } from "react";
import useCurrentDate from "../../hooks/useCurrentDate";
import fetchWeather from "../../utilities/fetchWeather";
import CurrentTime from "../../utilities/CurrentTime";
import getWeatherIcon from "../../utilities/getWeatherIcon";
import "./Weather.css";

const Weather = ({ city = "Delhi" }) => {
  const currentDate = useCurrentDate();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = useCallback(async () => {
    try {
      const { data, error } = await fetchWeather(city);
      if (error) {
        setError(error);
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      setError(err.message);
    }
  }, [city]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const weatherCondition = weatherData?.weather[0]?.main;
  const isDaytime = new Date().getHours() >= 6 && new Date().getHours() < 18;
  const rainIntensity = weatherData?.rain
    ? weatherData.rain["1h"] > 2.5
      ? "high"
      : "low"
    : null;

  const icon = getWeatherIcon(weatherCondition, isDaytime, rainIntensity);

  return (
    <div className="flex-container">
      {error && <p>{error}</p>}
      {weatherData ? (
        <>
          <div className="flex-item">
            <h2 id="datetime">{currentDate}</h2>
            {icon && <img src={icon} alt={weatherCondition} className="weather-icon" />}
          </div>

          <div className="flex-item">
            <h2>{weatherData.name}</h2>
            <div className="temp_hum">
              <h2 className="temperature">{`${weatherData.main.temp} °C`}</h2>
              <h2 className="temperature">{`${weatherData.main.humidity} %`}</h2>
            </div>
          </div>

          <div className="flex-item">
            <CurrentTime />
            <img
              src="/animated/wind-svgrepo-com.svg"
              alt={weatherData.weather[0].description}
              className="windspeed"
            />
            <h2>{`${weatherData.wind.speed} m/s`}</h2>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
