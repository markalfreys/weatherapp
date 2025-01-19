import axios from "axios";
import { WeatherParams } from "../types"; // Import the WeatherParams type for defining the expected parameters

const APIURL = 'https://api.openweathermap.org/data/2.5/' // Base URL for the OpenWeatherMap API
const APIKEY = '1804e10d69cb504b4844a3d4c9ec834c'         // API key for authenticating requests to the OpenWeatherMap API



//Fetch current weather data on openweathermap.org based on geographic coordinates.
export const fetchWeatherByGeoCode = async ({ lat, lon, units }: WeatherParams) => {
  const response = await axios.get(`${APIURL}weather`, {
    params: {
      lat,
      lon,
      units,
      appid: APIKEY,
    },
  });
  return response.data;
}

//Fetch current weather data on openweathermap.org based on city name.
export const fetchWeatherByCity = async (city: string) => {
    const response = await axios.get(
      `${APIURL}weather`,
      {
        params: {
          q: city,
          units: "metric",
          appid: APIKEY,
        },
      }
    );
    return response?.data
}

//Fetch a 5-day weather forecast based on geocode
export const fetch5WeatherDayForecast = async ({ lat, lon, units }: WeatherParams) => {
    const response = await axios.get(`${APIURL}forecast`, {
      params: {
        lat,
        lon,
        units,
        appid: APIKEY,
      },
    });
    return response.data;
}


