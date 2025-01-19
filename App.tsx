import { useEffect } from "react";
import "./styles/global.css";
import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as NavigationBar from 'expo-navigation-bar';
import { PaperProvider } from "react-native-paper";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font'
import Navigation from "./routes";
import { WeatherProvider } from "./context/WeatherContext";
import { TemperatureProvider } from "./context/TemperatureContext";
import { PaperTheme } from "./constants/theme";
import NetworkProvider from "./context/NetworkContext";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient()

export default function App() {

  const [fontsLoaded] = useFonts({
    "NTR-Regular": require("./assets/fonts/NTR-Regular.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });


  useEffect(() => {
    const configureNavigationBar = async () => {
      try {
        // Set navigation bar behavior to overlay-swipe
        NavigationBar.setBackgroundColorAsync("dark");
        await NavigationBar.setBehaviorAsync('overlay-swipe');

        // hide the navigation bar
        await NavigationBar.setVisibilityAsync('hidden');
      } catch (error) {
        console.error('Error configuring navigation bar:', error);
      }
    };

    configureNavigationBar();

    const handleSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync(); // Hide splash screen when fonts are loaded
      }
    };

    handleSplashScreen();

  }, [fontsLoaded]);

  if (!fontsLoaded) {
		return null;
	}

  return (
    <QueryClientProvider client={queryClient}> 
      <NetworkProvider>  
        <WeatherProvider> 
          <TemperatureProvider> 
            <PaperProvider theme={PaperTheme}>
              <Navigation />
            </PaperProvider>
          </TemperatureProvider>
        </WeatherProvider>
      </NetworkProvider>
    </QueryClientProvider>
  );
}
