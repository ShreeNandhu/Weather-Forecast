
const fetchWeather = async (city) => {
  const apiKey = 'd51754c62a43e41fc17e694b7d25be20'; 

  if (!city) {
    throw new Error("City is required to fetch weather data.");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Error fetching weather data. Please try again."); 
    }

    const data = await response.json(); 
    return { data, error: null }; 
  } catch (err) {
    return { data: null, error: err.message || "Error fetching weather data. Please try again." }; 
  }
};

export default fetchWeather;
