import { useState, useContext, useRef } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Searchbar, useTheme } from 'react-native-paper';
import { SearchResultBox } from './SearchResultBox';
import { WeatherContext } from '../../context/WeatherContext';
import { fetchWeatherByCity } from '../../api/weatherAPI';
import { WeatherContextType } from '../../types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as NavigationBar from 'expo-navigation-bar';


export const SearchBar = () => { // SearchBar component for searching city in HomeScreen

    const { colors } = useTheme()
    const [search, setSearch] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const searchBarRef = useRef<TextInput | null>(null);

    // Access `handleSetWeatherData` from the WeatherContext, so user can select the result and update the Weather data diplayed
    const { handleSetWeatherData } = useContext(WeatherContext) || ({} as WeatherContextType);
    

    // Use React Query to fetch weather data based on the city name
    const { isLoading, data: searchResult, error } = useQuery({
        queryKey: ['searchWeather', search ],
        queryFn: () => fetchWeatherByCity(search),
        enabled: search.trim().length > 0,
        retry: false,
        gcTime: 0
    })

     // if the user press the search result, the search input will be cleared and blur the input, 
     // and set the weatherData to this new search city weather
    const handleSelectSearch = () => {
        setSearch('')
        handleSetWeatherData(searchResult)
        searchBarRef.current?.blur();
    }

    // Function to dismiss the keyboard if press outside the input while search inpur is focused
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

     // Function to handle search bar focus
    const onFocusSearch = async () =>{
        setIsFocus(true)

        await NavigationBar.setBehaviorAsync('inset-swipe');
        await NavigationBar.setVisibilityAsync('visible');
    }

    // Function to handle search bar blur
    const onBlurSearch = async () => {
        setIsFocus(false)
        Keyboard.dismiss();
        await NavigationBar.setBehaviorAsync('overlay-swipe');
        await NavigationBar.setVisibilityAsync('hidden');
    }

    return (
        <View className={`flex w-full flex-1 absolute top-0 left-0 right-0 h-full`} >
            <View className={`flex w-full ${isFocus ? 'h-full' : 'h-[60px]' }`}>
                <TouchableWithoutFeedback onPress={dismissKeyboard}>
                    <View className='flex-1 w-full relative z-10'>
                        <Searchbar
                            ref={searchBarRef}
                            placeholder="Search City"
                            onChangeText={setSearch}
                            value={search}
                            style={{ backgroundColor: 'rgba(1,1,1,0.3)', height: 60, width: '100%', color: 'white' }}
                            clearIcon={() => search ? <MaterialIcons name="clear" size={20} color={colors.primary} onPress={() => setSearch('')} /> : ''}
                            onFocus={onFocusSearch}
                            onBlur={onBlurSearch}
                            placeholderTextColor={isFocus ? colors.primary : colors.secondary}
                            iconColor={isFocus ? colors.primary : colors.secondary}
                            inputStyle={{ color: colors.primary }}
                        />
                        { search && <SearchResultBox error={error} isLoading={isLoading} searchResult={searchResult} handleSelectSearch={handleSelectSearch} /> }
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}
