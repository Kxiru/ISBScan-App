import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import ScanScreen from '../screens/ScanScreen';
import DrawerNavigator from './DrawerNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ContentStack from './ContentStack';


const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let currentPage = route.name;

                        if (currentPage === "Home") {
                            iconName = focused ? 'book-open-page-variant' : 'book-open-page-variant-outline';
                        } else if (currentPage === "Scan Book") {
                            iconName = 'barcode-scan';
                        }

                        return <MaterialCommunityIcons name={iconName} size={35} color={"#f6b092"} />
                    },
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        height:60,
                    }
                })}
            >
                <Tab.Screen name="Home" options={{ headerShown: false }} component={ContentStack} />
                <Tab.Screen name="Scan Book" component={ScanScreen} options={{headerStyle:{backgroundColor:'#fff'}, headerTintColor:'#f6a192', headerTitleAlign:'center'}}/>
            </Tab.Navigator>    
        </ NavigationContainer>
    )
}

export default TabNavigator;