import { useMutation } from "@tanstack/react-query";
import {api} from "../api/client";

export interface RideRequest {
  pickup: string;
  dropoff: string;
}

export interface RideResponse {
  id: number;
  status: string;
  driver: any;
}

export const useCreateRide = () => {
  return useMutation({
    mutationFn: (body: RideRequest) =>
      api.post("/rides", body).then((r) => r.data),

    onSuccess: (data) => {
      console.log("Ride created successfully:", data);
    },

    onError: (err) => {
      console.log("Ride creation failed:", err);
    },
  });
};
