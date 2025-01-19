import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { View, Text } from 'react-native';
import { ActivityIndicator, List, useTheme } from 'react-native-paper';
import { SearchResultBoxProps } from '../../types';


// Define the SearchResult component that displays the result when searching for city
export const SearchResultBox = ({ error, isLoading, searchResult, handleSelectSearch }: SearchResultBoxProps) => {
    const { colors } = useTheme();
    const [errorMess, setErrorMess] = useState('');

    // handles error, openweathermap api dont have a Wildcard Search, 
    // if you want to search for 'New York' city, you need to complete the city name, 
    // searching 'New' will not work and OpenWeathermap API will return 404 not found status 
    useEffect(() => {
        if (error) {
            if(error instanceof AxiosError){
                if (error.response?.status === 404) { // if search city is 404, removing error to display 'Not Result'
                  setErrorMess('')
                }else{ // set error for not 404 status
                    setErrorMess('Something went wrong. Please try again.')
                }
            }else {
                setErrorMess('Something went wrong. Please try again.')
            }
        } else {
          setErrorMess('')
        }
    }, [error]);

    return (       
        <View className='w-full absolute top-16 z-10'>
            <View className='w-full mt-2 bg-[#010101b0] rounded-[20px] overflow-hidden py-2'>
            {
                isLoading ?  // Display a loading indicator while data is being fetched
                <View className='py-2'>
                    <ActivityIndicator color={colors.primary} />
                </View> :
                
                errorMess ?  // Display an error message if an error exists
                <View className='p-3'>
                    <Text className='text-textprimary text-center text-lg'>{errorMess}</Text>
                </View> :
                
                searchResult ? // Display the search result if available, displays only one city, since you need to complete the city name
                <List.Item
                    key={searchResult?.id}
                    title={`${searchResult?.name}, ${searchResult?.sys?.country}`}
                    left={props => <List.Icon {...props} icon="map-marker" color={colors.primary} />}
                    style={{ paddingVertical: 5 }}
                    onPress={() => handleSelectSearch()}
                    titleStyle={{ color: colors.primary }}
                /> :
                
                // Display a "No result" message if there's no search result
                <List.Item key={1} title='No result' titleStyle={{ color: colors.secondary }} style={{ paddingVertical: 5, paddingLeft: 35 }} />
            }
            </View>
        </View>
                    
    )
}
