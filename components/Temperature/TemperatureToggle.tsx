import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useTemperature } from '../../hooks/useTemperature';
import { TemperatureConfig } from '../../config/temperature';
import TemperatureButton from './TemperatureButton';


// TemperatureToggle component that displays and allows switching between temperature units
export default function TemperatureToggle({ temp }: { temp: number }) {

     // Destructure the temperature unit, toggle function, and conversion logic from the custom hook
    const { unit, toggleUnit, convertTemp } = useTemperature(); 
    const [convertedTemp, setConvertedTemp] = useState(temp) // State to store and display the converted temperature
    

    // if the temperature unit changed to Fahrenheit, it will call the function that converts Celsius to Farenheit
    // if the selected temperature unit is celsuis,
    //  it will return the temp props since it is already a celsius when receiving it from react-query fetch
    useEffect(() => {
        if(unit === TemperatureConfig.Units.Fahrenheit){
            const convertedTempRes = convertTemp(temp)
            setConvertedTemp(convertedTempRes)
        }else{
            setConvertedTemp(temp)
        }
    }, [unit])
    
    // displays the Temperature with the C | F  temperature toggle button
    return (
        <View className='flex flex-row items-center relative'>
            <Text className='text-center text-white font-bold text-[50px] font-psemibold'>{Math.trunc(convertedTemp)}</Text>
            <View className='flex flex-row justify-center gap-1 absolute -right-[55px] top-[10px]'>
                <TemperatureButton 
                    unit={unit} 
                    btnUnit={TemperatureConfig.Units.Celsius} 
                    pressFn={() => toggleUnit(TemperatureConfig.Units.Celsius)} 
                    dispalyedText='&#8451;' 
                    />
                <Text className='text-[20px] text-textprimary font-psemibold'>|</Text>
                <TemperatureButton 
                    unit={unit} 
                    btnUnit={TemperatureConfig.Units.Fahrenheit} 
                    pressFn={() => toggleUnit(TemperatureConfig.Units.Fahrenheit)} 
                    dispalyedText='&#x2109;' 
                />
            </View>
        </View>
    )
}