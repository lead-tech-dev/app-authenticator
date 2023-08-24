import styled from "styled-components/native";
export const CardContainer = styled.TouchableOpacity`
  padding: 10px 20px;
 
`;

export const Header = styled.View`
  border-radius: 5px;
  padding: 10px 5px;
  background-color: ${props => (props.isPressed ? `rgba(0, 128, 0, 0.1)` : `white`)};
`;
export const Inner = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  
`;

export const Icon = styled.Text`
  height: 45px;
  width: 45px;
  line-height: 45px;
  color: #FFF;
  text-align: center;
  border-radius: 100px;
  background-color: green;
  font-size: 30px;
  font-weight: normal;
  margin-right: 20px;
`;

export const Issuer = styled.Text`
  color: #000;
  border-radius: 100px;
  font-size: 25px;
  font-weight: bold;
`;

export const Auth = styled.Text`
  color: #000;
  font-size: 15px;
  font-weight: normal;
  text-align: center;
  
`;

export const Key = styled.Text`
  color: #000;
  font-weight: bold;
`;

export const ProgressBar = styled.View`
  height: 50px;
  width: 5px;
  background-color: green;
  position: absolute;
  right: 50px;
  top: 0;
  border-radius: 2px;
`;

export const Action = styled.View`
    display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const PinContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Label = styled.Text`
  width: 15%;
  font-size: 20px;
 
`;

export const Input = styled.TextInput`
  width: 30%;
  border-radius: 4px;
  margin-top: 2px;
  font-weight: bold;
`;