import "../App.css";
import React, { useEffect, useState } from "react";
import { useWeather } from "../contextApi/weatherContext"; // Import the useWeather hook
import Forecast from "./forecast";
import ReactAnimatedWeather from "react-animated-weather"; // Import ReactAnimatedWeather

export default function Data() {
  const { weather } = useWeather(); // Destructure the weather data from the context
  const [weatherCondition, setWeatherCondition] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("CLEAR_DAY"); // Default icon name

  // Function to set the weather condition and corresponding icon
  const setWeatherInfo = () => {
    if (weather) {
      const weatherMain = weather.weather[0].main;
      setWeatherCondition(weatherMain);

      // Determine the appropriate icon name based on the weather condition and time
      const isDay = isDayTime(weather);
      switch (weatherMain) {
        case "Clear":
          setWeatherIcon(isDay ? "CLEAR_DAY" : "CLEAR_NIGHT");
          break;
        case "Clouds":
          setWeatherIcon(isDay ? "CLOUDY" : "CLOUDY_NIGHT");
          break;
        case "Rain":
        case "Drizzle":
        case "Thunderstorm":
          setWeatherIcon("RAIN");
          break;
        case "Snow":
          setWeatherIcon("SNOW");
          break;
        default:
          setWeatherIcon(isDay ? "CLEAR_DAY" : "CLEAR_NIGHT");
          break;
      }
    }
  };

  // Function to check if it is day or night based on sunrise and sunset time
  const isDayTime = (weatherData) => {
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    const sunrise = weatherData.sys.sunrise;
    const sunset = weatherData.sys.sunset;
    return currentTime >= sunrise && currentTime < sunset;
  };

  useEffect(() => {
    setWeatherInfo();
  }, [weather]); // Update weather info when weather data changes

  return (
    <>
      <div className="h-[600px] relative flex flex-col items-center justify-center backdrop-blur-sm bg-black bg-opacity-75 rounded-r-xl">
        <div className="text-gray w-[400px] h-[350px] relative flex flex-col items-center justify-center">
          <ReactAnimatedWeather
            icon={weatherIcon}
            color={"#FFFFFF"}
            size={150}
            animate={true}
          />
        </div>
        <div className="text-white h-screen w-[370px]">
          <h1 className="text-7xl text-white border-b border-gray-500 pb-4 mb-3">{weatherCondition}</h1>
          <Forecast />
        </div>
      </div>
    </>
  );
}
