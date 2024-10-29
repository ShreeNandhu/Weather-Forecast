const getWeatherIcon = (weatherCondition, isDaytime) => {
  const icons = {
      // WeatherAPI conditions
      "Sunny": isDaytime ? "/animated/day.svg" : "/animated/night.svg",
      "Clear": isDaytime ? "/animated/day.svg" : "/animated/night.svg",
      "Partly cloudy": isDaytime ? "/animated/cloudy-day-1.svg" : "/animated/cloudy-night-1.svg",
      "Overcast": "/animated/day.svg",
      "Rain": isDaytime ? "/animated/rainy-1.svg" : "/animated/rainy-7.svg",
      "Light rain": isDaytime ? "/animated/rainy-1.svg" : "/animated/rainy-2.svg",
      "Heavy rain": isDaytime ? "/animated/rainy-3.svg" : "/animated/rainy-4.svg",
      "Thunderstorm": '/animated/thunder.svg',
      "Snow": "/animated/snowy-6.svg",
      "Fog": "/animated/snowy-1.svg",
      "Mist": "/animated/snowy-6.svg",

      // OpenWeather API conditions
      "Clear Sky": isDaytime ? "/animated/day.svg" : "/animated/night.svg",
      "Few Clouds": isDaytime ? "/animated/cloudy-day-2.svg" : "/animated/cloudy-night-3.svg",
      "Scattered Clouds": isDaytime ? "/animated/cloudy-day.svg" : "/animated/cloudy-night.svg",
      "Broken Clouds": "/animated/cloudy-day.svg",
      "Shower Rain": isDaytime ? "/animated/rainy-5.svg" : "/animated/rainy-6.svg",

  };

  return icons[weatherCondition] || "/animated/day.svg"; 
};

export default getWeatherIcon;
