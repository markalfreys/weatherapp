import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoriteCityWeatherScreen from "../screen/favoritesStack/FavoriteCityWeatherScreen";
import FavoritesScreen from "../screen/tabScreen/FavoritesScreen";

const FavoriteStack = createNativeStackNavigator()

export const FavoriteStackGroup = () => {
    return (
        <FavoriteStack.Navigator>
            <FavoriteStack.Screen  name="Favorite" component={FavoritesScreen} options={{ headerShown: false }} />
            <FavoriteStack.Screen  name="FavoriteCityWeatherScreen" component={FavoriteCityWeatherScreen} options={{ headerShown: false }}/>
        </FavoriteStack.Navigator>
    )
}