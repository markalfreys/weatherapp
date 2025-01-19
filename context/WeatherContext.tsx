import React, { createContext, ReactElement, ReactNode, useEffect, useState, useContext } from "react";
import { Alert } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { WeatherContextType, WeatherData, WeatherParams } from "../types";
import { fetchWeatherByGeoCode } from "../api/weatherAPI";
import { defaultCity } from "../constants";
import { checkLocationServices, getUserLocation } from "../utils";
import { NetworkContext } from "./NetworkContext";


// Create a context for weather-related data and actions
export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);


// WeatherProvider component to manage weather-related state and provide context
const WeatherProvider = (props: { children: ReactNode }): ReactElement => {

    const { isConnected } = useContext(NetworkContext); // Get network status from the network context
    const [currentGeoCode, setCurrentGeoCode] = useState<WeatherParams | undefined>(undefined);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
    const [isLocationEnabled, setIsLocationEnabled] = useState(true);


     // React Query to fetch weather data based on geocode
    const {  isLoading, isError, data: fetchedCurrentWeather, status } = useQuery({
        queryKey: ['currentWeather', currentGeoCode ],
        queryFn: () => fetchWeatherByGeoCode(currentGeoCode as WeatherParams),
        enabled: !!currentGeoCode && isConnected, // Fetch only if location is available and connected to the internet
        retry: 2, 
    })

    // Function to get the user's geocode location
    const getGEOCodeLocation = async () => {
        const getGEOCode = await getUserLocation() // Retrieve user's location
      
        if(getGEOCode?.lat){
            setCurrentGeoCode(getGEOCode) // Update the current geocode
        }
    };

     // Function to update weather data, this function is created so the state can accept weather data search using geocode and city
    const handleSetWeatherData = (w: WeatherData | null) => {
        if(w) setWeatherData(w);
    }
    
    // Update weather data whenever new weather data is fetched from react-query
    useEffect(() => {
        if(fetchedCurrentWeather){
            handleSetWeatherData(fetchedCurrentWeather)
        }
    }, [fetchedCurrentWeather]);


     // Check location services status every second,
    useEffect(() => {
        const interval = setInterval(async () => {
            const getIsLocationEnabled = await checkLocationServices();
            setIsLocationEnabled(getIsLocationEnabled);
        }, 1000); // Check every second
              
        return () => clearInterval(interval);
    }, []);

     // for the first time the user open the app, 
     // if the location is off, it will use the default city, if the user on it later, the Alert will shown to refresh the data
     // if the location is on, it will search for the geocode of the user current location and used it to fetch the current weather
    useEffect(() => {
        if (isLocationEnabled) {
            if(weatherData?.cod){
                Alert.alert(
                    "Location Enabled",
                    `Would you like to refresh the page?`,
                    [
                        { text: "No", style: "cancel" },
                        { text: "Yes", onPress: () => getGEOCodeLocation() },
                    ]
                );
            }else{
                getGEOCodeLocation();
            }
        } else {
            if(!weatherData?.cod) setCurrentGeoCode(defaultCity);

            Alert.alert("Location is OFF", "Unable to get user location.");
        }
    }, [isLocationEnabled]);

    // just alert the user that there is no internet connection
    useEffect(() => {
        if (!isConnected) {
            Alert.alert("No Internet", "Please check your internet connection.");
        }
    }, [isConnected]);

    return <WeatherContext.Provider {...props} value={{ weatherData, isLoading, isError, status, handleSetWeatherData }} />;
};

export { WeatherProvider };