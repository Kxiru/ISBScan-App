import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useIsFocused } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'

const UserStatistics = () => {
  const {bookArray} = useContext(AuthContext);
  const {clearBookArray} = useContext(AuthContext);
  
  const [bookNum, setBookNum] = useState(bookArray.length);
  const [favourite, setFavBook] = useState("'I don't have one yet!'");
  const [tempfav, setTempFav] = useState("");

  const handleSetBook = async(value) => {
    setTempFav(value);
  }

  useEffect(()=>{
    setBookNum(bookArray.length);

    const getBook = async() => {
      try{
        let tempBook = await AsyncStorage.getItem('userFavBook');
        // console.log(tempBook)
        setFavBook(tempBook);
      } catch(e) {
        setFavBook("'I don't have one yet!'");
        console.log(e);
      }
    }

    getBook();
    
  });

  const clearBooks = () => {
    Alert.alert('Are you sure?', `Are you sure you want to clear all books from your collection?`,
    [{
      text: "Yes",
      onPress:()=> {
        clearBookArray();
        alert(`All books been removed from your collection.`)
      }
    },
    {
      text:"No",
    }
  ]);
  }
  
  return(
    <View style={{minWidth:'90%'}}>
      <View>
        <Text style={styles.subtext}>Let's see your statistics, today...</Text>
        <Text style={styles.infostyle}>Total books in Collection: <Text style={{fontWeight:'normal'}}>{bookNum}</Text></Text>
        <Text style={styles.infostyle}>My current favourite Book: <Text style={{fontWeight:'normal'}}>{favourite}</Text></Text>
      </View>

      <View>
        <View style={{flexDirection:'row'}}>
          <MaterialCommunityIcons name={'keyboard-variant'} size={35} color={"#f6b092"} style={{padding:10}} />
          <TextInput style={styles.inputButton}
            placeholder = 'My favourite book is...'
            onChangeText = {val => {handleSetBook(val)}}
          />
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={async()=>{
              setFavBook(tempfav); 
              alert(`Your new favourite book is: ${tempfav}!`);
              try{
                await AsyncStorage.setItem('userFavBook', tempfav);
              } catch(e) {
                console.log(e);
              }
            }}>
            <Text style={{textAlign:'center', color:'#fff'}}>Set Favourite Book</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {clearBooks()}}>
            <Text style={{textAlign:'center', color:'#fff'}}>Clear all Books</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

function ProfileScreen({navigation}) {
  const isFocused = useIsFocused();

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <Text style={styles.title}>Nice to see you, User1!</Text>
      <Image
        source={require('../assets/Images/temp_profile_icon.jpg')}
        style={styles.img}
      />
      {isFocused
        ? <UserStatistics />
        : <View>
            <Text style={styles.subtext}>Let's see your statistics, today...</Text>
            <Text>Loading...</Text>
          </View>
      }
    </ScrollView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 20,
    color:'#DE7E5D',
  },
  subtext:{
    fontSize: 20,
    paddingVertical: 10,
    color:'#DE7E5D',
  },
  infostyle: {
    marginVertical: 10,
    color:'#DE7E5D',
    fontWeight: 'bold',
    fontSize: 16
  },
  backButton: {
    backgroundColor:"#f6b092",
    padding: 10,
    borderRadius:15,
    alignSelf: 'center',
    elevation: 2,
    width: '40%',
    margin: 10,

    borderColor: '#DE7E5D',
    borderWidth: 1
  },
  inputButton: {
    borderColor:"#DE7E5D",
    borderWidth:1,
    borderRadius:10,
    padding:10,
    marginBottom:20,
    width:'80%'
  },
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#fff',
    height:'100%'
  },
})