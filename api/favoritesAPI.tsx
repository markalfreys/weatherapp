import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAVORITES_KEY } from '../constants';


//Adds a city to the list of favorite cities in AsyncStorage.
export const addFavorite = async (city: string) => {

    // Retrieve the current list of favorites from AsyncStorage.
    const currentFavorites = JSON.parse(
        (await AsyncStorage.getItem(FAVORITES_KEY)) || '[]'
    );

    // Create a new array with the city added, ensuring no duplicates using Set.
    const updatedFavorites = [...new Set([...currentFavorites, city])];

    // Save the updated list of favorites back to AsyncStorage.
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return updatedFavorites;
}

//Removes a city from the list of favorite cities in AsyncStorage
export const removeFavorite = async (city: string) => {

    // Retrieve the current list of favorites from AsyncStorage.
    const currentFavorites = JSON.parse(
        (await AsyncStorage.getItem(FAVORITES_KEY)) || '[]'
    );

    // Filter out the city to be removed if it exists in the list.
    let updatedFavorites;
    if (currentFavorites.includes(city)) {
        updatedFavorites = currentFavorites.filter((item : string) => item !== city);
    }

    // Save the updated list of favorites back to AsyncStorage.
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return updatedFavorites;
}


//Fetches the list of favorite cities from AsyncStorage.
export const fetchFavorites = async () => {
    const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY); // Retrieve the current list of favorites from AsyncStorage.
   
    return JSON.parse(storedFavorites ?? '[]');
}