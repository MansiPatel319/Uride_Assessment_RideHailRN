import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ route, navigation }: Props) {
  // Get rideId from route.params
  const rideId = route.params?.rideId ?? null;

  return (
    <View style={styles.container}>
      {rideId? <Text>Ride ID: {rideId ?? 'None'}</Text>: ''}
      <Button
        title="Request Ride"
        onPress={() => navigation.navigate('RequestRide')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
