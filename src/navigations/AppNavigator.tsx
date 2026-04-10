import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/Splash/SplashScreen';
import TabNavigator from './TabNavigator';

import ResultSearchFoodScreen from '../screens/ResultSearch/ResultSearchFoodScreen';

const Stack = createStackNavigator();

const AppNavigatorContent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate load (env, etc.)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />

      <Stack.Screen name="ResultSearchFoodScreen" component={ResultSearchFoodScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppNavigatorContent />
    </NavigationContainer>
  );
};

export default AppNavigator;

