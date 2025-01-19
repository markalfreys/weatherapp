import * as Location from "expo-location";
import { defaultCity } from "../constants";


export const capitalizeWords = (str: string) => { // convert first letter of every words to a uppercase
    return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export const convertTemp = (temp: number, unit: string) => { // convert temperature
    if (unit === 'F') {
        return Math.round((temp * 9) / 5 + 32); // C to F
    } else {
        return Math.round(((temp - 32) * 5) / 9); // F to C
    }
}


export const checkLocationServices = async () => {  // check if location is on
    try {
        const isEnabled = await Location.hasServicesEnabledAsync();
        return isEnabled
    } catch (error) {
        console.error("Error checking location services:", error);
        return false
    }
};

export const getUserLocation = async () => { // get user GeoCode location, 
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        // returns default city if not granted permission
        if (status !== "granted") {
            return defaultCity;
        }
    
        // returns geocode of user location
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        return { lat: latitude, lon: longitude, units: 'metric' }
    
    } catch (error) {
        console.error(error);
        return defaultCity;   // returns default city if error getting location
    }
};