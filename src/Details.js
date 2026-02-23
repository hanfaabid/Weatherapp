// Importing React hooks
import React, {useEffect, useState} from 'react';

// Importing required components from react-native
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

// Importing icons
import AntDesign from 'react-native-vector-icons/AntDesign';

// Getting device dimensions
import {Dimensions} from 'react-native';

// Importing scaling functions for responsive design
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

// Importing API key from constants file
import {API_KEY} from '../src/Constant';

// Getting screen width and height
const {width, height} = Dimensions.get('window');

// Details screen component
const Details = props => {

  // State to store weather API response data
  const [data, setData] = useState();

  // Getting city object from navigation params
  const {city} = props.route.params || {};

  // If no city is passed, show message
  if (!city) {
    return <Text>No city found.</Text>;
  }

  // Fetch weather data when component mounts
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}`,
    )
      .then(res => res.json()) // Convert response to JSON
      .then(res => setData(res)) // Save data in state
      .catch(err => console.log(err)); // Handle error
  }, []);

  // Reusable component to display weather details row
  const Data = ({title, value}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      
      {/* Title (e.g., Pressure, Humidity) */}
      <Text
        style={{
          color: 'white',
          fontSize: scale(20),
        }}>
        {title}
      </Text>

      {/* Value (e.g., 1012, 60%) */}
      <Text
        style={{
          color: 'white',
          fontSize: scale(20),
        }}>
        {value}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      
      {/* Background image (city image or default image) */}
      <ImageBackground
        source={city.image ? city.image : require('./assets/defaultBg.png')}
        style={styles.image}
        imageStyle={styles.imageStyle}>

        {/* Header section */}
        <View style={styles.header}>
          
          {/* Menu button */}
          <TouchableOpacity style={styles.circleContainer}>
            <Image
              source={require('./assets/Lines.png')}
              style={styles.Lines}
            />
          </TouchableOpacity>

          {/* Logo */}
          <TouchableOpacity>
            <Image source={require('./assets/logo.png')} style={styles.logo} />
          </TouchableOpacity>

        </View>

        {/* Show weather data only when API data is available */}
        {data ? (
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: verticalScale(100),
            }}>

            {/* City Name and Weather Type */}
            <View>
              <Text style={{color: 'white', fontSize: scale(40)}}>
                {city.name}
              </Text>

              <Text style={{color: 'white', fontSize: scale(20)}}>
                {data.weather[0].main}
              </Text>
            </View>

            {/* Temperature (converted from Kelvin to Celsius) */}
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: scale(30),
                marginTop: verticalScale(30),
              }}>
              {(data.main.temp - 273.15).toFixed(2)}°C
            </Text>

            {/* Weather Details Section */}
            <View>
              <Text style={{color: '#FFFFFF', fontSize: scale(25)}}>
                Weather details
              </Text>

              {/* Details container */}
              <View style={{width: width * 0.8, marginTop: verticalScale(10)}}>

                {/* Pressure */}
                <Data value={data['main']['pressure']} title="pressure" />

                {/* Humidity */}
                <Data value={`${data['main']['humidity']}%`} title="Humidity" />

                {/* Wind Speed */}
                <Data value={data['wind']['speed']} title="wind" />

                {/* Visibility */}
                <Data value={data['visibility']} title="Visibility" />

              </View>
            </View>

          </View>
        ) : null}

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    //  justifyContent:'center',
    alignItems: 'center', // centers children horizontally
    resizeMode: 'contain',
  },
  imageStyle: {
    borderRadius: 1,
  },
  // overlay: {
  //   backgroundColor: 'rgba(0,0,0,0.5)', // optional: dark overlay
  //   padding: 10,
  //   borderRadius: 10,
  //   marginTop: verticalScale(40), // Add this line

  // },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  header: {
    position: 'absolute',
    top: verticalScale(10),
    left: 0,
    right: 0,
    paddingHorizontal: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  circleContainer: {
    height: moderateScale(30),
    width: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20), // Half of width/height
    backgroundColor: '#F2F2F2',
    marginLeft: moderateScale(1),
    marginVertical: verticalScale(10),
  },
  Lines: {
    width: moderateScale(29),
    height: verticalScale(17),
    resizeMode: 'contain',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default Details;
