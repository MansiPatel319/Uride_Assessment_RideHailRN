import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';
import { useRide } from '../hooks/useRide';

type Props = NativeStackScreenProps<RootStackParamList, 'RideActive'>;

export default function RideActiveScreen({ route, navigation }: Props) {
  const rideId = route?.params?.rideId;
  
  const { data: ride, isLoading } = useRide(rideId);

  if (!rideId) return <Text style={styles.message}>Ride ID not provided</Text>;
  if (isLoading) return <Text style={styles.message}>Loading...</Text>;
  if (!ride) return <Text style={styles.message}>Ride not found</Text>;

  return (
    <View style={styles.container}>

      <Text style={styles.message}>Ride started</Text>

      {/* Ride details */}
      <Text style={styles.label}>Passenger: {ride.passenger}</Text>
      <Text style={styles.label}>Pickup: {ride.pickup}</Text>
      <Text style={styles.label}>Dropoff: {ride.dropoff}</Text>
      <Text style={styles.label}>Driver: {ride.driver?.name}</Text>
      <Text style={styles.label}>Car: {ride.driver?.car.make} {ride.driver?.car.model}</Text>
      <Text style={styles.label}>Plate: {ride.driver?.car.plate}</Text>
      <Text style={styles.label}>Price: ${ride.price}</Text>
      <Text style={styles.label}>Status: {ride.status}</Text>

      <Button title="End Ride" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  message: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 16, marginBottom: 8 },
});
