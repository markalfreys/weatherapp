import axios from "axios";
import { APIURL, APIKEY } from '@env';
import { WeatherParams } from "../types"; // Import the WeatherParams type for defining the expected parameters
<<<<<<< HEAD
=======
import { APIURL, APIKEY } from '@env';
>>>>>>> c781817ecc0c62439f0c9f9ff297547333f58a88

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


