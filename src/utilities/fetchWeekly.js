
const fetchWeekly = async (city) => {
  const apiKey = 'a5bafb2b438041328ce112301242910'; 

  if (!city) {
      throw new Error("City is required to fetch weather data.");
  }

  // Fetch the forecast directly
  const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;
  
  try {
      const forecastResponse = await fetch(forecastUrl);
      console.log(forecastUrl);

      if (!forecastResponse.ok) {
          throw new Error("Error fetching weather forecast. Please try again.");
      }

      const forecastData = await forecastResponse.json(); 

      return { data: forecastData, error: null }; 
  } catch (err) {
      return { data: null, error: err.message || "Error fetching weather data. Please try again." }; 
  }
};

export default fetchWeekly;
