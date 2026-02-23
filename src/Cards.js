// Importing required components from react-native
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';

import React from 'react';

// Importing scaling functions for responsive design
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

// Importing navigation hook to navigate between screens
import {useNavigation} from '@react-navigation/native';

// Cards component receives city name and image as props
const Cards = ({name, image}) => {

  // Getting navigation object using hook
  const navigation = useNavigation(); // ✅ gets the nav

  return (
    // Main card container
    <View style={styles.cardContainer}>

      {/* Touchable area to navigate to Details screen */}
      <TouchableOpacity
        onPress={() => 
          // Navigate to Details screen and pass city name + image
          navigation.navigate('Details', {city: {name, image}})
        }>

        {/* Background image for the card */}
        <ImageBackground
          source={image} // City image
          style={styles.image}
          imageStyle={styles.imageStyle} // Enables borderRadius on image
        >

          {/* Overlay container for text */}
          <View style={styles.textContainer}>

            {/* City name text */}
            <Text style={styles.text}>{name}</Text>

          </View>
        </ImageBackground>

      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    marginRight: moderateScale(10), // space between cards horizontally
    marginTop: verticalScale(250),
  },
  image: {
    width: moderateScale(150),
    height: verticalScale(120),

    marginTop: verticalScale(20),
  },
  imageStyle: {
    borderRadius: 15,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30),
    marginLeft: moderateScale(20),
  },
  text: {
    fontSize: scale(16),
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 4,
    justifyContent: 'center',
  },
});

export default Cards;
