import {Text} from "react-native";

const Title = ({title, titleStyle}) => {
    return (
        <Text style={{...titleStyle}}>{title}</Text>
    )
}

export default Title;