import React, { useCallback, useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import fetchWeekly from "../../utilities/fetchWeekly";
import getWeatherIcon from "../../utilities/getWeatherIcon";
import "./Charts.css";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ city = "Delhi" }) => {
  const [weeklyWeather, setWeeklyWeather] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getWeeklyWeatherData = useCallback(async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const { data, error: fetchError } = await fetchWeekly(city);

      if (fetchError) {
        throw new Error(fetchError);
      }

      // Check if the data structure is valid
      if (
        !data ||
        !data.forecast ||
        !Array.isArray(data.forecast.forecastday)
      ) {
        throw new Error("Invalid data structure");
      }

      const processedData = data.forecast.forecastday
        .slice(1, 8)
        .map((day) => ({
          date: new Date(day.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          temperature: day.day.avgtemp_c, // Use average temperature for the chart
          humidity: day.day.avghumidity, // Use average humidity
          weatherCondition: day.day.condition.text,
          icon: getWeatherIcon(day.day.condition.text, true), // Assuming it's daytime for simplicity
        }));

      setWeeklyWeather(processedData);
      setError(null); // Clear error if fetch is successful
    } catch (error) {
      setError(error.message); // Handle errors
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  }, [city]); // Include city as a dependency

  useEffect(() => {
    getWeeklyWeatherData(); // Fetch data when the component mounts
  }, [getWeeklyWeatherData]);

  const labels = weeklyWeather.map((day) => day.date);
  const temperatures = weeklyWeather.map((day) => parseFloat(day.temperature));
  const humidities = weeklyWeather.map((day) => day.humidity);

  const temperatureData = {
    labels,
    datasets: [
      {
        label: "Average Temperature (°C)",
        data: temperatures,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const humidityData = {
    labels,
    datasets: [
      {
        label: "Average Humidity (%)",
        data: humidities,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Weekly Weather Visualization for {city}</h2>
      {loading && <div className="loading-icon">Loading...</div>}
      {error && <p className="error-message">{error}</p>}
      {weeklyWeather.length > 0 && !loading ? (
        <>
          <div className="chart-container">
            
            <div className="chart">
            <h3>Temperature Forecast</h3>
              {" "}
              <Line
                data={temperatureData}
                options={{ responsive: true }}
              />{" "}
            </div>
            
            <div className="chart">
            <h3>Humidity Forecast</h3>
              <Bar data={humidityData} options={{ responsive: true }} />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Charts;
