import { Image, View, StyleSheet, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

// const bookArray = ['9780008420383','9780140326710','9781409180074','9781784871444','9780007326792'];

function BookComponent({navigation, temp, getNewIndex, bookArray, removeFromArray}){
  const [bookTitle, setBookTitle] = useState(null);
  const [bookURL, setBookURL] = useState(null);
  const [bookAuthor, setBookAuthor] = useState(null);

  useEffect( () => {
    const getBookComponents = async (data) => {
      try{
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${data}`, {
          headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json',
          }
        });
        const res = await response.json();
  
        setBookTitle(res.items[0].volumeInfo.title);
        setBookAuthor(res.items[0].volumeInfo.authors[0])
        setBookURL(`https://covers.openlibrary.org/b/isbn/${data}-S.jpg`);
  
      } catch (error) {
        console.log(error);
      }
    }

    getBookComponents(temp);
  }, []);

  return(
    <TouchableOpacity 
        key={temp}
        style={styles.bookButton}
        onPress={() => navigation.navigate('Book', {isbn:temp})}>
          <View>{(bookURL!=null) ? <Image style={styles.bookCover} source={{uri: bookURL}} /> : <Text>Loading...</Text>}</View>
          <View>
            <Text style={styles.bookButtonTitle}>{bookTitle}</Text>
            <Text style={styles.bookButtonAuthor}>{bookAuthor}</Text>
          </View>
    </TouchableOpacity>
  );
}

function HomeScreen({navigation, route}) {

  const {bookArray} = useContext(AuthContext)
  const isFocused = useIsFocused();
  
  return (
    <View style={{flex:1}}>
      <ScrollView contentContainerStyle={styles.contentContainer} >
          {isFocused 
          ? bookArray.length 
            ? bookArray.map((bookISBN) => <BookComponent key={bookISBN} navigation={navigation} temp={bookISBN}/> ) 
            : <View>
                <Text style={styles.alertText}>Your list is empty!</Text>
                <Text style={styles.alertText2}>Scan a new book to add it to your collection.</Text>
              </View>
          : <Text>Loading...</Text>}
          <StatusBar style='auto' />
      </ScrollView>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  bookButton: {
    padding: 10,
    borderColor: '#f6c492',
    borderRadius: 10,
    borderWidth: 3,
    marginVertical: 10,
    fontSize: 20,
    width: '90%',
    flexDirection: 'row',
  },
  contentContainer: {
    // flex: 1,
    alignItems: 'center',
    backgroundColor:'#fff',
    // height:'100%'
  },
  bookCover: {
    width: 80,
    height: 90,
    borderColor: '#f6b092',
    borderWidth: 2,
    borderRadius: 5,
    resizeMode:'contain',
  },
  bookButtonTitle: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DE7E5D',
    maxWidth: '90%'
  },
  bookButtonAuthor: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#DE7E5D',
  },
  alertText: {
    textAlign:'center',
    borderRadius: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth:1,
    borderColor:'#de7e5d',
    fontSize:16,
    marginTop: 30,
    color:'#de7e5d',
  },
  alertText2: {
    borderRadius: 10,
    padding: 10,
    borderColor:'#de7e5d',
    fontSize:14,
    marginTop: 10,
    color:'#de7e5d',
  }
})