import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRide } from '../hooks/useRide';
import { api } from '../api/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'RideDetails'>;

export default function RideDetailsScreen({ route }: Props) {
  const { rideId } = route.params;
  const { data: ride, isLoading } = useRide(rideId);
  const navigation = useNavigation();

  if (isLoading) return <Text>Loading...</Text>;
  if (!ride) return <Text>Ride Not Found</Text>;

  const startRide = async () => {
    // call to start ride
    await api.post(`/rides/${ride.id}/start`);
    navigation.navigate('RideActive', { rideId: ride.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Status: {ride.status}</Text>
      <Text style={styles.label}>Driver: {ride.driver?.name}</Text>
      <Text style={styles.label}>
        Car: {ride.driver?.car.make} {ride.driver?.car.model}
      </Text>
      <Text style={styles.label}>Plate: {ride.driver?.car.plate}</Text>
      <Text style={styles.label}>Color: {ride.driver?.car.color}</Text>
      <Text style={styles.label}>Year: {ride.driver?.car.year}</Text>

      {ride.status === 'driver_arrived' && (
        <Button title="Start Ride" onPress={startRide} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, marginBottom: 8 },
});
