import React, { createContext, useState, useEffect, ReactNode, ReactElement } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TemperatureContextProps, TemperatureUnit } from '../types';
import { TemperatureConfig } from '../config/temperature';

// Create a context for managing temperature unit preferences
export const TemperatureContext = createContext<TemperatureContextProps | undefined>(undefined);

export const TemperatureProvider = (props: { children: ReactNode }): ReactElement => {

    // State to track the current temperature unit (Celsius or Fahrenheit)
    const [unit, setUnit] = useState<TemperatureUnit>(TemperatureConfig.Default);


    // Load the saved temperature unit preference from AsyncStorage when the component mounts
    useEffect(() => {
        const loadUnitPreference = async () => {
            
            // Retrieve the stored unit
            const savedUnit = await AsyncStorage.getItem('temperatureUnit');
            if (savedUnit) {
                setUnit(savedUnit as TemperatureUnit); // Update state with the saved unit
            }
        };
        loadUnitPreference();
    }, []);

    // Function to toggle and persist the selected temperature unit
    const toggleUnit = (selectedUnit: TemperatureUnit) => {
        if (unit !== selectedUnit) {                            // Only update if the selected unit is different
            AsyncStorage.setItem('temperatureUnit', selectedUnit); // Save the selected unit to AsyncStorage
            setUnit(selectedUnit); // Update state with the new unit
        }
    };

     // Provide the current unit and toggle function to context consumers
    return <TemperatureContext.Provider {...props} value={{ unit, toggleUnit }} />;
};