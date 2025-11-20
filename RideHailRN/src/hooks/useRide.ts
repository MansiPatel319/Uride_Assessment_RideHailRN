import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';

export const useRide = (rideId: number) => {
  return useQuery({
    queryKey: ['ride', rideId],
    queryFn: async () => {
      const res = await api.get(`/rides/${rideId}`);
      return res.data;
    },
    enabled: !!rideId, // only fetch if rideId exists
    refetchInterval: 5000, // poll every 5 seconds
    refetchIntervalInBackground: true, // optional: keep polling in background
  });
};
