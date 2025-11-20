import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { api } from '../api/client';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';

type RequestRideScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RequestRide'
>;

type Props = {
  navigation: RequestRideScreenNavigationProp;
};

interface RideResponse {
  id: number;
  passenger: string;
  pickup: string;
  dropoff: string;
  status: string;
  driver?: {
    id: number;
    name: string;
    car: {
      plate: string;
      model: string;
      make: string;
      color: string;
      year: number;
    };
  };
}

export default function RequestRideScreen({ navigation }: Props) {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  const requestRideMutation = useMutation<RideResponse, any, { passenger: string; pickup: string; dropoff: string }>({
    mutationFn: (body) => api.post('/rides', body).then(res => res.data.ride),
    onSuccess: (ride) => {
      if (ride && ride.id) {
        navigation.navigate('RideDetails', { rideId: ride.id });
      } else {
        Alert.alert('Error', 'No ride created');
      }
    },
    onError: (err: any) => {
      const message = err?.response?.data?.message || 'Something went wrong';
      Alert.alert('Error', message);
    },
  });

  const handleRequestRide = () => {
    if (!pickup || !dropoff) {
      Alert.alert('Error', 'Please enter pickup and dropoff locations');
      return;
    }

    requestRideMutation.mutate({
      passenger: 'John Doe', // replace with real user if needed
      pickup,
      dropoff,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request a Ride</Text>

      <TextInput
        style={styles.input}
        placeholder="Pickup Location"
        value={pickup}
        onChangeText={setPickup}
      />

      <TextInput
        style={styles.input}
        placeholder="Dropoff Location"
        value={dropoff}
        onChangeText={setDropoff}
      />

      <Button
        title={requestRideMutation.isLoading ? 'Requesting...' : 'Request Ride'}
        onPress={handleRequestRide}
        disabled={requestRideMutation.isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});
