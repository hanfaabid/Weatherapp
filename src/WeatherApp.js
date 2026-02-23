// Importing required components from react-native
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

// Importing custom components
import Cards from '../src/Cards';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dimensions} from 'react-native';

import React, {useState} from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Details from '../src/Details';

// Getting device width and height
const {width, height} = Dimensions.get('window');

// Main WeatherApp component
const WeatherApp = props => {
  
  // State to store user input location
  const [location, setLocation] = useState('');

  // Array of predefined cities with images
  const cities = [
    {
      name: 'Karachi',
      image: require('./assets/imageE.png'),
    },
    {
      name: 'Islamabad',
      image: require('./assets/imageA.png'),
    },
    {
      name: 'Gujranwala',
      image: require('./assets/imagew.png'),
    },
    {
      name: 'Lahore',
      image: require('./assets/imaget.png'),
    },
  ];

  return (
    // Main container view
    <View style={styles.mainContainer}>
      
      {/* Background image for entire screen */}
      <ImageBackground
        source={require('./assets/imageB.png')}
        style={styles.background}>

        {/* Header section */}
        <View style={styles.header}>
          <View style={styles.card}>
            <View style={styles.rowContainer}>

              {/* Left circular menu button */}
              <View style={styles.circleContainer}>
                <TouchableOpacity>
                  <Image
                    source={require('./assets/Lines.png')}
                    style={styles.Lines}
                  />
                </TouchableOpacity>
              </View>

              {/* App logo on right side */}
              <TouchableOpacity>
                <Image
                  source={require('./assets/logo.png')}
                  style={styles.logo}
                />
              </TouchableOpacity>

            </View>
          </View>
        </View>

        {/* Search title text */}
        <View style={styles.Textcontainer}>
          <Text style={styles.Text}> Search here </Text>
        </View>

        {/* Input field container */}
        <View style={styles.inputContainer}>

          {/* TextInput to type location */}
          <TextInput
            value={location} // Controlled input value
            onChangeText={setLocation} // Updates state when typing
            placeholder="Type location..."
            placeholderTextColor="#ccc"
            style={styles.input}
          />

          {/* Search button */}
          <TouchableOpacity
            onPress={() =>
              // Navigate to Details screen and send city name as parameter
              props.navigation.navigate('Details', {city: {name: location}})
            }>
            <AntDesign
              name="search1"
              size={20}
              color="#FFFFFF"
              style={styles.icon}
            />
          </TouchableOpacity>

        </View>

        {/* Horizontal list of city cards */}
        <FlatList
          horizontal // Makes list scroll horizontally
          data={cities} // Data source
          renderItem={({item}) => 
            <Cards name={item.name} image={item.image} />
          }
        />

      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
  },

  header: {
    width: '100%',
    height: 70,
  },
  card: {
    width: '100%',
    height: 75,
  },
  rowContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  circleContainer: {
    height: moderateScale(30),
    width: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20), // Half of width/height
    backgroundColor: '#F2F2F2',
    marginLeft: moderateScale(18),
    marginVertical: verticalScale(13),
  },
  Lines: {
    width: moderateScale(25),
    height: verticalScale(12),
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
    marginTop: 15,
    marginBottom: 2,
  },
  Textcontainer: {
    marginTop: 35,
  },
  Text: {
    fontSize: scale(20),

    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
    marginTop: verticalScale(10),
    backgroundColor: 'transparent', // optional
  },

  input: {
    flex: 1,
    fontSize: scale(14),
    color: '#fff',
    paddingVertical: 8,
  },
  icon: {
    marginLeft: 8,
  },
});

export default WeatherApp;
