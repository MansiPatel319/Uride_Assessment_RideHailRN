// navigation/MainStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RequestRideScreen from '../screens/RequestRideScreen';
import RideDetailsScreen from '../screens/RideDetailsScreen';
import RideActiveScreen from '../screens/RideActiveScreen';

import { RootStackParamList } from '../utils/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RequestRide" component={RequestRideScreen} />
      <Stack.Screen name="RideDetails" component={RideDetailsScreen} />
      <Stack.Screen name="RideActive" component={RideActiveScreen} />
    </Stack.Navigator>
  );
}
