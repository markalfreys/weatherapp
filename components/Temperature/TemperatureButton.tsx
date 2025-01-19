import { Text, TouchableNativeFeedback } from 'react-native';
import { TemperatureButtonProps } from '../../types';

export default function TemperatureButton({ unit, btnUnit, pressFn, dispalyedText }: TemperatureButtonProps) {
    
    return (
        <TouchableNativeFeedback onPress={pressFn}>
            <Text 
                className={
                    `text-[20px] font-psemibold 
                    ${
                        unit === btnUnit ? 'text-textprimary' :'text-textsecondary' 
                    }`
                }
            >
                { dispalyedText }
            </Text>
        </TouchableNativeFeedback>
    )
}