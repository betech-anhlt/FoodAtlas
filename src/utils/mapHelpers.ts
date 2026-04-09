import { Linking, Alert } from 'react-native';
import { mockLocations } from './mockMapData';
import { GOOGLE_MAPS_API_KEY, USE_NATIVE_MAP } from '../services/constants';

export const isNativeMapEnabled = (): boolean => {
  return !!GOOGLE_MAPS_API_KEY && USE_NATIVE_MAP === true;
};

export const getFirstLocationCoords = (foodId: string): { latitude: number; longitude: number } => {
  const location = mockLocations.find(loc => loc.foodId === foodId);
  if (location) {
    return { latitude: location.latitude, longitude: location.longitude };
  }
  // Default Hanoi center
  return { latitude: 21.0285, longitude: 105.8542 };
};

export const openExternalMap = async (foodName: string, address: string, latitude?: number, longitude?: number): Promise<void> => {
  const query = encodeURIComponent(`${foodName} near ${address}`);
  const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
  console.log('Opening external Google Maps with params:', { foodName, address, latitude, longitude, url });
  
  const supported = await Linking.canOpenURL(url);
  
  // Screen-visible demo (temp) - mimics console.log on screen
  Alert.alert(
    'Map Console Log (Screen)',
    `Food: ${foodName}\nAddress: ${address}\nURL: ${url}\nCan Open: ${supported ? 'Yes' : 'No'}\n\n(Terminal log also printed)`,
    [{ text: 'OK' }]
  );
  
  if (supported) {
    await Linking.openURL(url);
  } else {
    console.log("Cannot open Google Maps");
    Alert.alert('Map Error', 'Cannot open Google Maps');
  }
};

export const getFoodSearchQuery = (foodId: string): { foodName: string; address: string; latitude?: number; longitude?: number } => {
  // Find matching food from mock data by id
  // Since HomeScreen passes foodId from mockFeaturedFoods
  const foods = require('./mockHomeData').mockFeaturedFoods;
  const food = foods.find((f: any) => f.id === foodId);
  if (food) {
    const coords = getFirstLocationCoords(foodId);
    return {
      foodName: food.name,
      address: food.address,
      latitude: coords.latitude,
      longitude: coords.longitude
    };
  }
  return { foodName: 'Food', address: 'Hanoi', latitude: 21.0285, longitude: 105.8542 };
};

