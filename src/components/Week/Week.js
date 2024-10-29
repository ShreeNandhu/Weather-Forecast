import React, { useCallback, useEffect, useState } from "react";
import "./Week.css";
import getWeatherIcon from "../../utilities/getWeatherIcon"; 
import fetchWeekly from "../../utilities/fetchWeekly";

const Week = ({ city = "Delhi" }) => {
  const [weeklyWeather, setWeeklyWeather] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  const getWeeklyWeatherData = useCallback(async () => {
    setLoading(true); 
    try {
      const { data, error: fetchError } = await fetchWeekly(city);

      if (fetchError) {
        throw new Error(fetchError);
      }

      const isDaytime = new Date().getHours() >= 6 && new Date().getHours() < 18;

      // Process the data to get the forecast for the next 7 days (excluding today)
      const processedData = data.forecast.forecastday.slice(1, 7).map(day => {
        const weatherCondition = day.day.condition.text;
        const icon = getWeatherIcon(weatherCondition, isDaytime);
        return {
          date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          icon,
          temperature: `${day.day.avgtemp_c} °C`,
        };
      });

      setWeeklyWeather(processedData);
      setError(null); 
    } catch (error) {
      setError(error.message); // Handle errors
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  }, [city]); // Include city as a dependency

  useEffect(() => {
    getWeeklyWeatherData(); 
  }, [getWeeklyWeatherData]);

  return (
    <div className="week-container">
      {loading && <div className="loading-icon">Loading...</div>}
      {error && <p className="error-message">{error}</p>}
      {weeklyWeather.length > 0 && !loading ? (
        weeklyWeather.map((day, index) => (
          <div key={index} className="flex-item">
            <img src={day.icon} alt="Weather Icon" className="image" />
            <h2>{day.date}</h2>
            <h2 className="temp">{`${day.temperature}`}</h2>
          </div>
        ))
      ) : null}
    </div>
  );
};

export default Week;
