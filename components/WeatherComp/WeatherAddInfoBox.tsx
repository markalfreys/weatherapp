import { View, Text } from 'react-native';
import { WeatherAddInfoBoxProps } from '../../types';


// Component for displaying Humidity and Wind Speed Box
export default function WeatherAddInfoBox({ icon, value, type, title }: WeatherAddInfoBoxProps) {

    return (
        <View className='flex items-center gap-1'>
            { icon }
            <View className='flex mt-2'>
                <View className='flex flex-row gap-1 justify-center'>
                    <Text className='text-textprimary text-center text-3xl font-psemibold'>{typeof value === 'undefined' ? 0 : value}</Text>
                    <Text className='text-textprimary text-center text-xl font-psemibold'>{type}</Text>
                </View>
                <Text className='text-textsecondary text-center text-lg font-pregular'>{title}</Text>
            </View>
        </View>
    )
}