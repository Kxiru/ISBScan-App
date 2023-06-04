import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome Screen" options={{title:'', headerStyle:{backgroundColor:'#FADCD2'}, headerTintColor:'#fff', headerTitleAlign:'center'}} component={WelcomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;