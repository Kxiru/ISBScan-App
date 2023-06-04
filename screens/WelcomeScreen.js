import React, { useState, useContext } from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';

function WelcomeScreen({navigation}) {

  const { signIn } = useContext(AuthContext);

  const [data, setData] = useState({
    username: '',
    password: '',
    check_textInputChange: false,
  })

  const loginHandle = (username, password) => {
    console.log(username+' '+password+'');
    signIn(username, password);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#FADCD2' }}>
      <View style={styles.imgBg}>
        <Image
          source={require('../assets/Images/isbscanLogo.png')}
          style={styles.img}
        />
        <Text style={styles.altText}>ISBSCAN</Text>
      </View>

      <TextInput style = {styles.input}
        underlineColorAndroid = "transparent"
        placeholder = "Username"
        placeholderTextColor = "#DE7E5D"
        autoCapitalize = "none"
        onChangeText = {(newText) => setData({...data, username:newText})}/>
            
      <TextInput style = {styles.input}
        underlineColorAndroid = "transparent"
        placeholder = "Password"
        placeholderTextColor = "#DE7E5D"
        autoCapitalize = "none"
        onChangeText = {(newPass) => setData({...data, password:newPass})}
        secureTextEntry = {true}/>

      <TouchableOpacity
        style = {styles.submitButton}
        onPress = {
          () => {loginHandle(data.username, data.password)}
        }>
        <Text style = {styles.submitButtonText}> Login </Text>
      </TouchableOpacity>

      <Text style={styles.altText}>Forgot Password?</Text>
      <Text style={styles.altText}>Register</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  input: {
     margin: 15,
     height: 40,
     borderColor: '#DE7E5D',
     borderWidth: 1,
     width: '60%',
     backgroundColor: '#fff',
     borderRadius: 15,
     textAlign: 'center',
  },
  submitButton: {
     backgroundColor: '#DE7E5D',
     padding: 10,
     margin: 15,
     height: 50,
     width: '30%',
     justifyContent: 'center',
     borderRadius: 15,
     elevation: 2,
  },
  submitButtonText:{
     color: 'white',
     textAlign: 'center',
  },
  altText: {
    color: '#DE7E5D',
    padding: 10,
    textAlign: 'center'
  },
  imgBg: {
    backgroundColor: '#fff',
    width: '100%',
    borderColor: '#DE7E5D',
    borderWidth: 1,
  }
})

export default WelcomeScreen;