import { useContext } from 'react';
import { TemperatureConfig } from '../config/temperature';
import { TemperatureContext } from '../context/TemperatureContext';


export const useTemperature = () => {  // Custom hook to manage temperature-related logic
   
    // Access the TemperatureContext
    const context = useContext(TemperatureContext);  
    
    // If the context is not available, return default values temperature to use
    if (!context) {
        console.warn('TemperatureContext is missing. Using default unit as Celsius.');
        return {
            unit: TemperatureConfig.Units.Celsius,
            toggleUnit: () => console.warn('Cannot toggle unit. TemperatureContext is missing.'),
            convertTemp: (temp: number) => temp,
        };
    }

    // Convert temperature based on the current unit (Celsius to Fahrenheit if needed)
    const convertTemp = (temp: number) => {

        // Convert the temperature from Celsius to Farenheit
        if (context?.unit === TemperatureConfig.Units.Fahrenheit) return TemperatureConfig.Conversion.CtoF(temp);
    
        return temp // Return unmodified temperature if unit is Celsius
    }

    // Return the context values and the temperature conversion function
    return { 
        unit: context.unit, // Current temperature unit (Celsius or Fahrenheit)
        toggleUnit: context.toggleUnit, // Function to toggle between units
        convertTemp, // Function to convert temperatures based on the selected unit
    }
};