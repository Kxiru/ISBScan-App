import {createStackNavigator} from '@react-navigation/stack';
import BookScreen from '../screens/BookScreen';
import DrawerNavigator from './DrawerNavigator';
const Stack = createStackNavigator();

const ContentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home Screen" options={{headerShown: false}} component={DrawerNavigator}/>
      <Stack.Screen name='Book' options={{headerStyle:{backgroundColor:'#f6b092'}, headerTintColor:'#fff', headerTitleAlign:'center'}} component={BookScreen} />
    </Stack.Navigator>
  );
};

export default ContentStack;