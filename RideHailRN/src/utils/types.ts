// src/utils/types.ts

export interface Car {
  plate: string;
  make: string;
  model: string;
  color: string;
  year: number;
}

export interface Driver {
  id: number;
  name: string;
  car: Car;
}

export type RideStatus = 'driver_assigned' | 'driver_arrived' | 'ongoing' | 'completed';

export interface Ride {
  id: number;
  pickup: string;
  dropoff: string;
  status: 'requested' | 'driver_arrived' | 'in_progress' | 'completed';
  driver: {
    name: string;
    car: {
      make: string;
      model: string;
    };
  };
}
export interface RideRequest {
  passenger: string;
  pickup: string;
  dropoff: string;
}

// What you get back from the API after requesting a ride
export interface RideResponse {
  id: number;
  passenger: string;
  pickup: string;
  dropoff: string;
  status: 'pending' | 'accepted' | 'completed';
  driver?: {
    id: number;
    name: string;
    car: {
      plate: string;
      model: string;
      color: string;
    };
  };
}
export type RootStackParamList = {
  Home: { rideId: number | null } | undefined;  // Home receives rideId (optional)
  RequestRide: undefined;                       // RequestRide doesn't need params
  RideDetails: { rideId: number };             // RideDetails requires rideId
};




export interface Ride {
  id: number;
  status: 'requested' | 'driver_arrived' | 'in_progress' | 'completed';
  driver: {
    name: string;
    car: {
      make: string;
      model: string;
    };
  };
}