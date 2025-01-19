import { TemperatureUnit } from "../types";
import { convertTemp } from "../utils";

export const TemperatureConfig = { // Configuration object for temperature-related settings and operations
    
    // Supported temperature units (Celsius and Fahrenheit)
    Units: {
        Celsius: 'C' as TemperatureUnit,
        Fahrenheit: 'F' as TemperatureUnit,
    },
    Default: 'C' as TemperatureUnit,  // Default temperature unit (Celsius)
    Conversion: {
        CtoF: (temp: number) => convertTemp(temp, 'F'), // Convert Celsius to Fahrenheit using the utility function
        FtoC: (temp: number) => convertTemp(temp, 'C'), // Convert Fahrenheit to Celsius using the utility function
    },
};