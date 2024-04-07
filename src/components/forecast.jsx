import React, { useState } from "react";
import apiKeys from "./apiKeys";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { useWeather } from '../contextApi/weatherContext';

export default function Forecast() {
  const { weather, setWeather } = useWeather();
  const [query, setQuery] = useState('');

  const search = async (query) => {
    try {
      // Make a GET request to the Geocoding API
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${apiKeys.key}`
      );

      console.log(geoResponse.data);

      // Extract latitude and longitude from the response data
      const { lat, lon } = geoResponse.data[0];

      // Use lat and lon for further processing
      console.log("Latitude:", lat);
      console.log("Longitude:", lon);
      // Fetch weather data using latitude and longitude coordinates
      const weather = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKeys.key}`
      );
      setWeather(weather.data);
      console.log(weather)

      setQuery("");
    } catch (error) {
      console.error("Error fetching geolocation data:", error);
    }

    setQuery(query);
    console.log(query);
  };

  return (
    <div className="text-gray-500 relative">
      <div className="flex text-base mb-3 mt-0 justify-center">
        <input
          type="text"
          className="bg-transparent mb-4 mr-2 border-b border-gray-500 text-white px-3 py-2 placeholder-gray-500 focus:outline-none enabled:hover:border-gray-400 disabled:opacity-100 hover:scale-105 hover:transition-transform duration-300 ease-in"
          placeholder="Search any city"
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex item-center relative top-2">
          <SearchIcon
            className="hover:pointer-events-auto hover:scale-105 hover:transition-transform duration-300 ease-in enabled:hover:border-opacity-100 disabled:opacity-500"
            style={{ fontSize: "2rem", top: "3px", cursor: "pointer" }}
            onClick={() => search(query)}
          />
        </div>
      </div>

      <div className="text-lg">
        {query && weather && Object.keys(weather).length > 0 ?  (
          <ul className="flex flex-col leading-8 gap-1">
            <li className="flex justify-between border-b border-gray-500 py-1">
              <span className="w-1/3">Temperature</span>
              <span className="text-white">
                {weather.main.temp || "-"}°C,{" "}
                {weather.weather[0].main || "-"}
              </span>
            </li>
            <li className="flex justify-between border-b border-gray-500 py-1">
              <span className="w-1/4">Humidity</span>
              <span className="text-white">{weather.main.humidity || "-"}%</span>
            </li>
            <li className="flex justify-between border-b border-gray-500 py-1">
              <span className="w-1/4">Visibility</span>
              <span className="text-white">{weather.visibility || "-"} mi</span>
            </li>
            <li className="flex justify-between py-1">
              <span className="w-1/3">Wind Speed</span>
              <span className="text-white">{weather.wind.speed || "-"} km/h</span>
            </li>
          </ul>
        ) : (
          <p className="text-white mt-24 opacity-50">
            Search for a city to see weather details.
          </p>
        )}
      </div>
    </div>
  );
}
