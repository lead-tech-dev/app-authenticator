import {ScannerScreen} from "../screens/scanner.screen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {TokenListScreen} from "../screens/token-list.screen";
import {MoptTokenContextProvider} from "../services/mopt-token.context";


const Stack = createNativeStackNavigator();
export const AppNavigator = () => {
  return(

      <MoptTokenContextProvider>
        <Stack.Navigator initialRouteName="TokenList">
          <Stack.Screen name="TokenList" component={TokenListScreen} options={{headerShown: false}} />
          <Stack.Screen name="Scanner" component={ScannerScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </MoptTokenContextProvider>

);
};

