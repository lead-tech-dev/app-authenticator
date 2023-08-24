import {Text, TouchableOpacity} from "react-native";
import {Icon} from "@rneui/themed";


const Button = ({containerStyle,  iconStyle, iconName, iconSize, iconColor, onPress, icon, label, labelStyle}) => {
    return (
        <TouchableOpacity
            style={{
                ...containerStyle,
            }}
            onPress={onPress}
        >
            {icon && (
                <Icon
                    name={iconName}
                    size={iconSize}
                    color={iconColor}
                    style={{...iconStyle}}
                />
            )}
            {label && <Text style={{...labelStyle}}>{label}</Text>}
        </TouchableOpacity>
    )
}

export default Button;