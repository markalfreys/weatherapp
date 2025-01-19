import HomeScreen from "../screen/tabScreen/HomeScreen";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavoriteStackGroup } from "./FavoriteStackGroup";
import { useTheme } from "react-native-paper";


const Tab = createBottomTabNavigator();

export default function MyTabs() {  // Bottom Tabs
	const { colors } = useTheme();

  return (
    <Tab.Navigator
		screenOptions={{
			headerShown: false,
			title: '',
			tabBarActiveTintColor: 'tomato',
			tabBarInactiveTintColor: 'gray',
			tabBarLabelStyle: {
				fontSize: 12,
			},
			tabBarStyle: {
				height: 70,
				width: '90%',
				paddingHorizontal: 5,
				paddingTop: 13,
				borderRadius:50,
				position: 'absolute',
				left: '50%',
				bottom: 20,
				borderTopWidth: 0,
				backgroundColor: 'rgba(1,1,1,0.3)', 
				elevation: 0,
				shadowColor: 'transparent',
				alignSelf: 'center',
				justifyContent: 'center',
				transform: [{ translateX: '5%' }],
			},
			animation: 'shift',
		}}
	>
		<Tab.Screen 
			name="Home" 
			component={HomeScreen} 
			options={{
				tabBarIcon: ({ color, size, focused }) => (
					<Ionicons name={`${focused ? "home" : "home-outline"}`} color={colors.secondary} size={30} />
				),
			}}
		/>
		<Tab.Screen 
			name="Favorites" 
			component={FavoriteStackGroup} 
			options={{
				tabBarIcon: ({ color, size, focused }) => (
					<MaterialIcons name={`${focused ? 'favorite' : 'favorite-border'}`} color={colors.secondary} size={30}  />
				),
			}}
		/>
    </Tab.Navigator>
  );
}
