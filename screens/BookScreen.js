import React, { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';

function BookDetails({bookDescription, bookDetails, bookAuthor, bookURL, allISBNs}){
  return(
    <View>
      
      <View style={styles.bookIntro}>
        {(bookURL!=null) ? <Image style={styles.bookCover} source={{uri: bookURL}} /> : <Text>Loading...</Text>}
        <View>
          <Text style={styles.title}>{bookDetails.title}</Text>
          <Text style={styles.authorTitle}>{bookAuthor}</Text>
        </View>
      </View>

      <View style={styles.bookAdditionalDetails}>
        <Text style={styles.infostyle}>Description: </Text><Text>{bookDescription}</Text>
        <Text style={styles.infostyle}>ISBN number(s): </Text><Text>{allISBNs[0]}, {allISBNs[1]}</Text>
        <Text style={styles.infostyle}>Number of pages: </Text><Text>{bookDetails.pageCount}</Text>
        <Text style={styles.infostyle}>Publishers: </Text><Text>{bookDetails.publisher}</Text>
      </View>

    </View>
  )
}

function BookScreen({navigation, route}) {

  const [bookObject, setBookObject] = useState(null);
  const [bookURL, setBookURL] = useState(null);
  const [bookAuthor, setBookAuthor] = useState(null);
  const [bookDescription, setBookDescription] = useState(null);
  const [bookISBN, setISBN] = useState(null);
  const [allISBNs, setAllISBNs] = useState([]);

  const {removeFromBookArray} = useContext(AuthContext);
  const {addToBookArray} = useContext(AuthContext);
  const {bookArray} = useContext(AuthContext);

  const addToCollection = () => {
    alert('The book has been added to your collection!');
    addToBookArray(bookISBN);
  }

  const removeFromCollection = () => {
    Alert.alert('Are you sure?', `Are you sure you want to remove '${bookObject.title}' from your collection?`,
    [{
      text: "Yes",
      onPress:()=> {
        removeFromBookArray(bookISBN);
        alert(`${bookObject.title} has been removed from your collection.`)
      }
    },
    {
      text:"No",
    }
  ]);
  }

  useEffect(() => {
    // Book data retrieval functionality
    const getBookData = async (data) => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${data}`, {
          headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json',
          }
        });

        const res = await response.json();
        setBookObject(res.items[0].volumeInfo);

        //Cover URL retrieval functionality
        setBookURL(`https://covers.openlibrary.org/b/isbn/${data}-M.jpg`);

        // Author retrieval functionality
        setBookAuthor(res.items[0].volumeInfo.authors)

        // Description retrieval functionality
        setBookDescription(res.items[0].volumeInfo.description);

        setISBN(res.items[0].volumeInfo.industryIdentifiers[1].identifier);

        setAllISBNs([res.items[0].volumeInfo.industryIdentifiers[0].identifier,res.items[0].volumeInfo.industryIdentifiers[1].identifier])

      } catch (error) {
        alert(`That ISBN does not exist in our Book database!`)
        navigation.goBack();
        console.error(error);
      }
    }

    getBookData(route.params.isbn);
  }, []);
  
  return (
    <View style={{backgroundColor:'#fff', height:'100%'}}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
          <View>
            {(bookObject != null)
            ? <BookDetails bookDescription={bookDescription} bookAuthor={bookAuthor} bookDetails={bookObject} bookURL={bookURL} allISBNs={allISBNs}/>
            : <Text style={styles.loading}>Loading...</Text>}
          </View>
        
          {
          (bookArray.includes(allISBNs[0]) || bookArray.includes(allISBNs[1])) 
            ? <TouchableOpacity style={styles.backButton} onPress={() => removeFromCollection()}><Text style={{textAlign:'center', color:'#fff'}}>Remove from Collection</Text></TouchableOpacity>
            : <TouchableOpacity style={styles.backButton} onPress={() => addToCollection()}><Text style={{textAlign:'center', color:'#fff'}}>Add to Collection</Text></TouchableOpacity>
          }
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}><Text style={{textAlign:'center', color:'#fff'}}>Go Back</Text></TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  authorTitle:{
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color:'#DE7E5D',
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea"
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 20,
    color:'#DE7E5D',
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
  loading: {
    alignSelf: 'center',
    fontSize:20,
    padding:30,
  },
  bookIntro: {
    flexDirection:'row',
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderBottomColor:'#f6b092',
    borderBottomWidth:3,
    margin:20,
    alignSelf: 'center'
  },
  bookAdditionalDetails: {
    width: '90%',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bookCover: {
    width: 130,
    height: 200,
    borderColor: '#f6b092',
    borderWidth: 2,
    borderRadius: 5,
    resizeMode:'contain',
  },
  infostyle: {
    marginVertical: 10,
    color:'#DE7E5D',
    fontWeight: 'bold',
    fontSize: 16
  },
  contentContainer: {
    // flex: 1,
    justifyContent: 'center',
    backgroundColor:'#fff',
  }
});

export default BookScreen;