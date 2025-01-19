import React from 'react'
import { View } from 'react-native'
import { IconButton, List, useTheme } from 'react-native-paper'
import { FavoriteBoxProp } from '../../types'


// Favorite city box that wrap the city name and delete button
export default function FavoriteBox({ city, handleRemoveFav, handleSelectCity } : FavoriteBoxProp) {
    const { colors } = useTheme()
    
  return (
    <View className='w-full mt-2 bg-[#010101b0] rounded-[30px] overflow-hidden pl-2 pr-1'>
        <List.Item
            key={city}
            title={city}
            left={props => <List.Icon {...props} icon="map-marker" color={colors.secondary} />}
            style={{ paddingVertical: 5 }}
            titleStyle={{ color: colors.secondary }}
            right={
                props => 
                    <IconButton                 // Delete city button
                        icon="trash-can"
                        size={25}
                        iconColor={colors.secondary}
                        onPress={() => handleRemoveFav(city)}
                    /> 
            }
            onPress={() => handleSelectCity(city)}
        /> 
    </View>
  )
}