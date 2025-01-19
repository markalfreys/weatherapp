import { Alert, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { addFavorite, fetchFavorites, removeFavorite } from '../../api/favoritesAPI';
import { FAVORITES_KEY } from '../../constants';
import { useEffect, useState } from 'react';


// The Heath Icon on HomeScreen that can add and remove city from favorite list, 
// if heart is color red, it means it is on the favorite city list
export default function AddFavoriteButton({ city }: { city: string }) {

    const queryClient = useQueryClient();

    const [isFavorite, setIsFavorite] = useState(false); // State to track whether the city is a favorite


    // Fetch the current list of favorite cities using React Query
    const { data: favorites } = useQuery({
        queryKey: [FAVORITES_KEY],
        queryFn: fetchFavorites,
    })
    
    // Mutation for adding a city to the favorites list
    const { mutateAsync: addFavoriteMutation } = useMutation<string[], Error, string>({
        mutationFn: addFavorite,
        onSuccess: (data: string[]) => {
            queryClient.setQueryData<string[]>([FAVORITES_KEY], data);
        },
    });

    // Function to handle adding a city to favorites
    const handleAddFav = async () => {
        try {
            await addFavoriteMutation(city)
        } catch (error) {
            Alert.alert('Something went wrong when adding city')
        }  
    }

    // Mutation for removing a city from the favorites list
    const { mutateAsync: removeFavoriteMutation } = useMutation<string[], Error, string>({
        mutationFn: removeFavorite,
        onSuccess: (data: string[]) => {
            queryClient.setQueryData<string[]>([FAVORITES_KEY], data);
        },
    });

    // Function to handle removing a city from favorites
    const handleRemoveFav = async () => {
        try {
            await removeFavoriteMutation(city)
        } catch (error) {
            Alert.alert('Something went wrong when removing city')
        }  
    }

    // Update the `isFavorite` state whenever the list of favorites or the city changes
    useEffect(() => {
        if(favorites){
            setIsFavorite(favorites.includes(city)) // Check if the city is in the favorites list
        }
    }, [city, favorites])


    return (
        <View className='absolute left-0 -top-4'>
            <IconButton
                icon={isFavorite ? 'heart' : 'heart-outline'}
                iconColor={isFavorite ? '#B01E28' : '#F5F5F5'}
                size={35}
                onPress={isFavorite ? handleRemoveFav : handleAddFav} // if the city in on favorite list, it will call the removiFav city, if the city is not included, it will add the city to favorite lists
            />
        </View>
    )
}