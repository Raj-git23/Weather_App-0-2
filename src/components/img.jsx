import React, { useState, useEffect } from "react";
import { useWeather } from "../contextApi/weatherContext"; // Import the useWeather hook
import axios from "axios";
import cardImage from '../image/card_img.jpg';

function Img() {
  const { weather } = useWeather(); // Destructure the weather data from the context

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [temperature, setTemperature] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(""); // State to store background image URL

  console.log(import.meta.env.VITE_REACT_APP_KEY);

  useEffect(() => {
    if (weather) {
      // Update state with weather data from context
      setCity(weather.name);
      setCountry(weather.sys.country);
      setTemperature(weather.main.temp);
  
      // Fetch timezone information based on city's coordinates
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${weather.coord.lat}&lon=${weather.coord.lon}&appid=${import.meta.env.VITE_REACT_APP_KEY}`
        )
        .then((response) => {
          const timezoneOffsetSeconds = response.data.timezone; // Timezone offset in seconds
  
          // Create a new Date object with the adjusted time based on timezone offset
          const currentTimeInCity = new Date(Date.now() + timezoneOffsetSeconds * 1000);
  
          // Format the date and time
          setDate(
            currentTimeInCity.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          );
          setTime(
            currentTimeInCity.toLocaleTimeString("en-US", {
              hour12: true,
              hour: "numeric",
              minute: "numeric",
            })
          );
        })
        .catch((error) => {
          console.error("Error fetching timezone data:", error);
        });
  
      // Fetch background image using latitude and longitude coordinates and city name
      axios
        .get(`https://api.unsplash.com/photos/random?query=${city} landmarks&client_id=K6vwzbgIRyV_qlc4_shNFnl2n2MIyTXILesj_ZuXRlQ`)
        .then((response) => {
          setBackgroundImage(response.data.urls.regular);
        })
        .catch((error) => {
          console.error("Error fetching background image:", error);
        });
    }
  }, [weather]); // Trigger effect when weather data changes

  
  return (
    <div className="relative w-[560px] h-[600px] overflow-hidden rounded-l-xl">
      <img
        className="absolute w-full h-full object-cover saturate-50 brightness-75 hover:saturate-100"
        src={backgroundImage || cardImage}
        alt="background"
      />

      <div className="absolute text-white left-4 top-1 text-4xl z-10 p-2">
        <h2 className="text-4xl flex">{city}</h2>
        <p className="text-xl flex flex-start">{country}</p>
      </div>

      <div className="absolute text-white left-4 bottom-4 text-4xl z-10 p-2">
        <h2 className="text-4xl flex">{time}</h2>
        <p className="text-base">{date}</p>
      </div>

      <div className="absolute bottom-4 right-10 text-7xl z-10 p-2">
        <h1 className="right-0 text-white">{temperature}° c</h1>
      </div>
    </div>
  );
}

export default Img;
