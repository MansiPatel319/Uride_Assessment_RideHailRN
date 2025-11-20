import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRide } from '../hooks/useRide';
import { api } from '../api/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RideDetails'>;

export default function RideDetailsScreen({ route }: Props) {
  const { rideId } = route.params;

  const { data: ride, isLoading } = useRide(rideId);

  if (isLoading) return <Text>Loading...</Text>;
  if (!ride) return <Text>Ride Not Found</Text>;

  const startRide = async () => {
    await api.post(`/rides/${ride.id}/start`);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Status: {ride.status}</Text>
      <Text>Driver: {ride.driver?.name}</Text>
      <Text>
        Car: {ride.driver?.car.make} {ride.driver?.car.model}
      </Text>

      {ride.status === 'driver_arrived' && (
        <Button title="Start Ride" onPress={startRide} />
      )}
    </View>
  );
}
