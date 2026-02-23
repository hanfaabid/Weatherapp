// App.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeatherApp from './src/WeatherApp'
import Details from './src/Details'

// 1️⃣ Stack Create
const Stack = createNativeStackNavigator();
// 4️⃣ App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WeatherApp">
        <Stack.Screen 
          name="WeatherApp" 
          component={WeatherApp} 
  options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Details" 
          component={Details} 
  options={{ headerShown: false }}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// 5️⃣ Styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});