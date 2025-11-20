import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './../RideHailRN/src/navigation/MainStack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
