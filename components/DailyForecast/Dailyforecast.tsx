import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import { fetch5WeatherDayForecast } from '../../api/weatherAPI';
import { DailyforecastProps } from '../../types';
import DailyforcastDayBox from './DailyforcastDayBox';
import { useTemperature } from '../../hooks/useTemperature';
import { TemperatureConfig } from '../../config/temperature';


// Dailyforecast component that display the 5days forecast
export default function Dailyforecast({ id, lat, lon, units }: DailyforecastProps) {
    
    const { colors } = useTheme()
    const [dailyWeathers, setDailyWeathers] = useState<Array<any>>([]) // State to store converted daily forecasts
    
    const [filteredWeathers, setFilteredWeathers] = useState<Array<any>>([]); // State to store raw filtered daily forecasts
    const { unit, convertTemp } = useTemperature();

    // Fetch 5day forecast weather data using React Query
    const { status, isError, data } = useQuery({
        queryKey: ['forecast', { id, lat, lon, units }],
        queryFn: () => fetch5WeatherDayForecast({ lat, lon, units }),
    })

     // Extract daily forecasts from the data (specifically at 12:00 PM), 
     // because the response of OpenWeathermap API are the 5 day / 3 hour
    useEffect(() => {
        if(data){
            let filteredDailyWeather = data?.list.filter((item: { dt_txt: string }) =>
                item.dt_txt.includes('12:00:00')
            );
            setFilteredWeathers(filteredDailyWeather);
        }
    }, [data])

    // Function to convert all temperatures in the forecast list based on the selected unit
    const convertAllTemp = (weatherList: Array<any>) => {
        
        if (unit === TemperatureConfig.Units.Celsius) return weatherList;

        return weatherList.map((weather) => ({
            ...weather,
            main: {
              ...weather.main,
              temp: convertTemp(weather.main.temp),
            },
        }));
    }
    
     // Update the displayed daily forecasts whenever the temperature unit or filtered forecasts change
    useEffect(() => {
        if (filteredWeathers.length > 0) {
          const convertedWeather = convertAllTemp(filteredWeathers);
          setDailyWeathers(convertedWeather);
        }
      }, [unit, filteredWeathers]);

    return (
        <View className='flex w-full h-full flex-1 mt-3 gap-1'>
            <Text className='text-left text-white mb-1'>Daily Forecast</Text>
            <View className='flex-1 items-center justify-center'>
            {
                // Display a loading indicator while fetching data
                status === 'pending' ? 
                <ActivityIndicator animating={true} color={colors.secondary} size="large" /> :
                
                // Display an error message if data fetching fails
                isError ?
                <Text className='text-center text-textsecondary'>Unable to load the weather data. Please try again later.</Text> :
                
                // Display the daily forecast in a horizontal scroll view
                <ScrollView className='flex gap-1 flex-row flex-1 w-full' horizontal={true} contentContainerStyle={{ alignItems: 'center', gap: 10 }}>
                {
                    dailyWeathers?.length > 0 && dailyWeathers.map((dailyWeather) => 
                        <DailyforcastDayBox 
                            day={dailyWeather.dt_txt} 
                            weatherIcon={dailyWeather.weather[0].icon} 
                            temp={dailyWeather.main.temp} 
                            key={dailyWeather.dt_txt}
                        />
                    )     
                }
                </ScrollView>
            }
            </View>
        </View>
    )
}