import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import SearchBar from '../components/SearchBar';
import { api } from '../api/client';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'RideRequest'>;

export default function RequestRideScreen() {
  const [passenger, setPassenger] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  const navigation = useNavigation<NavigationProp>();

  const requestRide = async () => {
    if (!passenger || !pickup || !dropoff) {
      Alert.alert('Please enter passenger name and select pickup & drop-off');
      return;
    }

    try {
      const res = await api.post('/rides', { passenger, pickup, dropoff });
      const rideId = res.data.ride.id;
      navigation.navigate('RideDetails', { rideId });
    } catch (err) {
      Alert.alert('Failed to request ride');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request a Ride</Text>

      <TextInput
        placeholder="Passenger Name"
        value={passenger}
        onChangeText={setPassenger}
        style={styles.input}
      />

      <SearchBar placeholder="Pickup Location" onSelectLocation={setPickup} />
      <SearchBar placeholder="Drop-off Location" onSelectLocation={setDropoff} />

      <Button title="Request Ride" onPress={requestRide} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 16 },
});
