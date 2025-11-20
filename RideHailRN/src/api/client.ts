// src/api/client.ts
import axios from 'axios';
import { Platform } from 'react-native';

let baseURL = '';

if (Platform.OS === 'web') {
  // Expo Web
  baseURL = 'http://localhost:3000';
} else if (Platform.OS === 'android') {
  // Android Emulator
  baseURL = 'http://10.0.2.2:3000';
} else {
  // iOS simulator OR real devices
  // 👉 Replace with your computer's LAN IP
  baseURL = 'http://192.168.0.xxx:3000';
}

export const api = axios.create({
  baseURL,
  timeout: 5000,
});

// Debug logs
api.interceptors.request.use((config) => {
  console.log('API Request →', config.method?.toUpperCase(), config.url, config.data);
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log('API Error →', err.message);
    return Promise.reject(err);
  }
);
