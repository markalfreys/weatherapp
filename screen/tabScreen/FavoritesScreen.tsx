import { View, Text, FlatList, Alert } from 'react-native';
import ScreenLayout from '../ScreenLayout';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FAVORITES_KEY } from '../../constants';
import { fetchFavorites, removeFavorite } from '../../api/favoritesAPI';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import FavoriteBox from '../../components/Favorite/FavoriteBox';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { FavoriteStackParamList } from '../../types';
import * as NavigationBar from 'expo-navigation-bar';

// Favorite screen component to displays the list of Favorite city
export default function FavoritesScreen() {
    const { colors } = useTheme() //  react-native-paper theme colors
    const queryClient = useQueryClient();
    const { navigate } = useNavigation<NavigationProp<FavoriteStackParamList>>()

    // Query to fetch favorite cities from API
    const { data: favorites, isLoading, error } = useQuery({
        queryKey: [FAVORITES_KEY],
        queryFn: fetchFavorites,
    });

     // Mutation to handle removing a city from favorites
    const { mutateAsync: removeFavoriteMutation } = useMutation<string[], Error, string>({
        mutationFn: removeFavorite,
        onSuccess: (data: string[]) => {
            queryClient.setQueryData<string[]>([FAVORITES_KEY], data);
        },
    });

    // Handles the actual removal of a city from favorites
    const handleRemoveFav = async (selectedCity: string) => {
        try {
            await removeFavoriteMutation(selectedCity)
            await NavigationBar.setVisibilityAsync('hidden');

        } catch (error) {
            Alert.alert('Something went wrong when removing city')
        }  
    }

   // Confirm removal of a city with an alert dialog
    const confirmRemoveFav = (city : string) => {
        NavigationBar.setBackgroundColorAsync("dark");
        Alert.alert(
            "Remove Favorite",
            `Are you sure you want to remove ${city} from your favorites?`,
            [
                { text: "Cancel", style: "cancel" },
                { text: "Remove", onPress: () => handleRemoveFav(city) },
            ]
        );
    };

    // Navigate to the weather screen for a selected city
    const handleSelectCity = (city : string) => {
        navigate('FavoriteCityWeatherScreen', { city })
    }

    return (
         <ScreenLayout>
            <View className='flex-1 w-full pb-[100px]'>
                <Text className='text-center text-textprimary text-3xl font-pregular'>Favorite Cities</Text>
                <View className='flex flex-1 items-center justify-center'>
                {
                    // Display loading indicator when fetching data
                    isLoading ? <ActivityIndicator size='large' animating={true} color={colors.secondary} /> :
                    
                    // Show error message if there's an error
                    error ? <Text className='text-center text-textsecondary text-2xl font-pregular'>Error fetching favorites!</Text> :
                    
                    // Show message if no favorites exist
                    favorites.length === 0 ? <Text className='text-center text-textsecondary text-2xl font-pregular'>No favorites yet!</Text> : 
                    
                    // else show list of favorites using FlatList
                    <View className='flex-1 w-full mt-5'>
                        <FlatList
                            data={favorites}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <FavoriteBox city={item} handleRemoveFav={confirmRemoveFav} handleSelectCity={handleSelectCity} />}
                        />
                    </View>
                }
                </View>
            </View>
         </ScreenLayout>
    )
}