import { ReactNode } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';


export default function ScreenLayout({ children }: { children: ReactNode }) {
  
    // Wrapper for Home, Favorite, and Favorite City Screens
    return (
        <SafeAreaProvider className='flex-1 relative'> 
            <LinearGradient
                colors={['#77b0d8', '#000363']}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
            <StatusBar style="auto" />
            <SafeAreaView className="flex flex-1 px-4 pt-5">
                <View className='flex flex-1 relative'>
                    { children }
                </View>
            </SafeAreaView>
            </LinearGradient>
        </SafeAreaProvider>
    )
}