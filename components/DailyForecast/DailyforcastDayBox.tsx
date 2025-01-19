import { View, Text, Image } from 'react-native';
import { DailyforecastDayBoxProps } from '../../types';


// component for display the day forecast
export default function DailyforcastDayBox({ day, weatherIcon, temp }: DailyforecastDayBoxProps) {

    let shortDayName = new Date(day).toLocaleDateString('en-US', { weekday: 'short' })

    return (
        <View className='w-auto flex flex-1 items-center py-5 px-2 rounded-[30px] bg-[rgba(1,1,1,0.3)] gap-1'>
            <Text className='text-textsecondary text-center'>{shortDayName}</Text>
            <View className='flex justify-center'>
                <Image source={{ uri: `https://openweathermap.org/img/wn/${weatherIcon}@4x.png` }} className='w-20 h-12' />
            </View>
            <Text className='text-textprimary text-center'>{Math.trunc(temp)}°</Text>
        </View>
    )
}