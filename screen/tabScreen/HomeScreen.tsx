import { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { WeatherContext } from '../../context/WeatherContext';
import ScreenLayout from '../ScreenLayout';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import Dailyforecast from '../../components/DailyForecast/Dailyforecast';
import { WeatherContextType } from '../../types';
import AddFavoriteButton from '../../components/Favorite/AddFavoriteButton';
import WeatherDetails from '../../components/WeatherComp/WeatherDetails';


export default function HomeScreen() { // HomeScreen component: Displays the main weather dashboard

     // Access weather data, error status, and loading status from WeatherContext
    const { weatherData, isError, status } = useContext(WeatherContext) || ({} as WeatherContextType);
    
    //Note: OpenWeathermap API allow 5day forecast for free account, 
    //to be able to get forecast more 5 days, it needs paid subscription 
    return (
        <ScreenLayout>
            <SearchBar />
            <View className='flex items-center flex-1 mt-20 pt-[20px] pb-[100px] relative z-[2] w-full'>
                <ScrollView 
                    className='flex flex-1 relative w-full pt-2' 
                    contentContainerStyle={{ alignItems: 'center'}}
                >
                {
                    // Display a loading indicator while data is being fetched
                    status === 'pending' ? 
                    <ActivityIndicator animating={true} color='#f5f5f5' size="large" /> : 
                    
                    // Display an error message if there's an issue fetching data
                    isError ?
                    <Text className='text-center text-lg text-white'>Error Fetching Weather</Text> :
                    
                    // Display weather information if data is successfully fetched
                    weatherData?.cod &&
                    <View className='flex justify-between items-center flex-1 relative w-full'>
                        <AddFavoriteButton city={weatherData?.name} />
                        <WeatherDetails weatherData={weatherData} />  
                        <Dailyforecast id={weatherData.id} lat={weatherData.coord.lat} lon={weatherData.coord.lon} units={'metric'} />
                    </View>
                }
                </ScrollView>
            </View>
        </ScreenLayout>
    )
}