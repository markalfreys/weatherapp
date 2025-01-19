import { View, Text, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import TemperatureToggle from '../Temperature/TemperatureToggle';
import WeatherAddInfoBox from './WeatherAddInfoBox';
import { capitalizeWords } from '../../utils';
import { WeatherData } from '../../types';

// WeatherDetails component, which receives `weatherData` as a prop and display the weather details
export default function WeatherDetails({ weatherData }: { weatherData: WeatherData }) {
  
    return (
        <View className='items-center gap-3  w-full relative'>
            <Text className='text-center text-textprimary text-3xl font-pregular'>{weatherData?.name}, {weatherData?.sys.country}</Text>
            <TemperatureToggle temp={weatherData?.main.temp} />
            <View className='flex justify-center'>
                <Image source={{ uri: `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png` }} className='w-52 h-[100px]' />
            </View>
            <Text className='text-textsecondary text-2xl text-center font-pregular'>{capitalizeWords(weatherData?.weather[0].description ?? '')}</Text>
            <View className='py-2 flex justify-between items-center flex-row gap-16 mt-3'>
                <WeatherAddInfoBox  
                    title='Humidity' 
                    value={weatherData?.main.humidity}
                    type="%" 
                    icon={
                        <Ionicons name="water" size={24} color="#F5F5F5" />
                    } 
                />
                <WeatherAddInfoBox  
                    title='Wind Speed' 
                    value={weatherData?.wind.speed}
                    type="m/s" 
                    icon={
                        <Fontisto name="wind" size={24} color="#F5F5F5" />
                    } 
                />
            </View>
        </View>
    )
}