import React from 'react';
import {createDrawerNavigator, DrawerToggleButton} from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen'
import ContentStack from './ContentStack';
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import { AuthContext } from '../context/AuthContext';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
      <Drawer.Navigator
        initialRouteName='My Books'
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="My Books" options={{headerStyle:{backgroundColor:'#f6b092'}, headerTintColor:'#fff', headerTitleAlign:'center'}} component={HomeScreen} />
        <Drawer.Screen name="My Profile" options={{headerStyle:{backgroundColor:'#f6b092',}, headerTintColor:'#fff', headerTitleAlign:'center'}} component={ProfileScreen} />
      </Drawer.Navigator>
  );
};

function CustomDrawerContent({navigation}) {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.drawer}>
      <Image
        source={require('../assets/Images/isbscanLogo.png')}
        style={styles.img}
      />

      <TouchableOpacity
        style={styles.drawerButtons}
        onPress={() => {
          navigation.navigate("My Books");
        }}
      >
        <Text style={styles.drawerButtonText}>My Books</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerButtons}
        onPress={() => {
          navigation.navigate("My Profile");
        }}
      >
        <Text style={styles.drawerButtonText}>My Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerButtons}
        onPress={() => {
          signOut();
        }}
      >
        <Text style={styles.drawerButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default DrawerNavigator;

const styles = StyleSheet.create({
  drawerButtons: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f6b092',
    borderColor: '#de7e5d',
    borderWidth: 2,
    borderRadius: 10,
    elevation: 5,
  },
  drawerButtonText:{
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  img: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  drawer: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'center'
  }
})