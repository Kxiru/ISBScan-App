import 'react-native-gesture-handler';
import React, { useEffect, useState, useMemo, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import * as NavigationBar from 'expo-navigation-bar';
import AuthStack from './navigation/AuthStack';
import { ActivityIndicator, View} from 'react-native';
import { AuthContext } from './context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage'

NavigationBar.setBehaviorAsync("overlay-swipe");
NavigationBar.setVisibilityAsync('hidden');

export default function App() {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async(userName, password) => {
      let userToken = null;
      //If the user has matched credentials, their token is set in local storage.
      if( userName == 'User1' && password == 'Password'){
        try{
          userToken = 'temp'
          await AsyncStorage.setItem('userToken', userToken);
        } catch(e) {
          console.log(e);
        }
      } else {
        alert('These are not the accepted Login Details.')
      }
      dispatch({type:'LOGIN', id:userName, token:userToken})
    },
    signOut: async() => {
      try{
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({type:'LOGOUT'})
    },
    // signUp: () => {
    //   // setUserToken('temp');
    //   // setIsLoading(false);
    // },

    //Provides global access to the book Array by putting it in Context.
    bookArray: ['9780008420383','9780140326710','9781409180074','9781784871444','9780007326792'],
    addToBookArray:async (isbn) => {
      //Adds a book to the book array via array destructuring
      authContext.bookArray = [...authContext.bookArray, isbn];
      console.log(authContext.bookArray);
    },
    removeFromBookArray: async(isbn) => {
      //Removes an item from the array via ISBN using array destructuring and splicing.
      let tempArray = authContext.bookArray;
      const index = tempArray.indexOf(isbn);
      tempArray.splice(index,1);
      authContext.bookArray = tempArray;
    },
    clearBookArray: async() => {
      authContext.bookArray = [];
    }
  }), []);

  useEffect(() => {
    //If there exists a token in local storage, load it into userToken.
    setTimeout(async() => {
      let userToken = null;

      try{
        userToken = await AsyncStorage.getItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      dispatch({type:'RETRIEVE_TOKEN', token:userToken})
    }, 1000)
    
  }, []);

  if (loginState.isLoading) { //A loading screen whilst the system is verifying to see if a user's token exists locally.
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  
  return (
    // Allows authContext (Lowercase) to be the context provider for the app.
    <AuthContext.Provider value={authContext}> 
      <NavigationContainer>
        {
          //Is there is a token loaded in loginState.userToken, the user can access the system (Tab Navigator), otherwise, they need to go through the Authentication stack (The login screens).
          loginState.userToken == null ? <AuthStack /> : <TabNavigator />
        }
      </NavigationContainer>
    </AuthContext.Provider>
    
  );
}
