import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenLayout from '../ScreenLayout';
import Dailyforecast from '../../components/DailyForecast/Dailyforecast';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { fetchWeatherByCity } from '../../api/weatherAPI';
import { RouteParams } from '../../types';
import WeatherDetails from '../../components/WeatherComp/WeatherDetails';


// Component to display detailed weather info for a selected favorite city
export default function FavoriteCityWeatherScreen() {
    const { colors } = useTheme() //  react-native-paper theme colors
    const route = useRoute<RouteProp<RouteParams>>();
    const navigation = useNavigation()
    const { params } = route  // Extract city from the route params

    // Fetch weather data for the selected city using React Query
    const { status, data: weatherData, isError } = useQuery({
        queryKey: ['searchWeather', params?.city ],
        queryFn: () => fetchWeatherByCity(params?.city), // Fetch weather by city name
        enabled: !!params, // Only run query if parameters exist
    })
  
    return (
        <ScreenLayout>
            <View className='flex-1 w-full'>

            
              <View className='flex relative justify-center items-center w-full h-[40px]'>
                  <TouchableOpacity className='absolute w-full flex-1 top-[3]' onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={26} color={colors.secondary}/>
                  </TouchableOpacity>
                  <View className='flex-1 justify-center'>
                    <Text className='text-center text-textprimary text-[25px] font-pregular w-full'>Favorite</Text>
                  </View>
              </View>

            
              <View className='flex items-center flex-1 pt-[20px] pb-[100px] relative z-[2] w-full'>
                <ScrollView 
                    className='flex flex-1 relative z-[2] w-full' 
                    contentContainerStyle={{ alignItems: 'center'}}
                >
                {
                    params?.city && (  // Only render content if city parameter exists
                      status === 'pending' ?   // Show loading indicator while fetching data
                      <ActivityIndicator animating={true} color='#f5f5f5' size="large" /> :
                      
                      // Display error message if data fetching fails
                      isError ? 
                      <Text className='text-center text-lg text-white'>Error Fetching Weather</Text> :
                     
                      // Render weather details and daily forecast when data is available
                      weatherData?.cod &&
                      <View className='flex justify-between items-center flex-1 relative w-full'>
                          <WeatherDetails weatherData={weatherData} />
                          <Dailyforecast id={weatherData.id} lat={weatherData.coord.lat} lon={weatherData.coord.lon} units={'metric'} />
                      </View>
                    )
                }
                </ScrollView>
              </View>
            </View>
        </ScreenLayout>
    )
}