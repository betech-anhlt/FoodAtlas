import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import TabNavigator from './TabNavigator';
import ResultSearchFoodScreen from '../screens/ResultSearch/ResultSearchFoodScreen';
import CommonHeader from '../components/CommonHeader';

const Stack = createStackNavigator();

const AppNavigatorContent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => ({
        headerShown: true,

        headerTitle: () => (
          <CommonHeader
            title={route.name === 'Main' ? 'Home' : route.name}
            showBack={route.name !== 'Main'}
          />
        ),

        headerLeft: () => null,

        headerStyle: {
          backgroundColor: '#F97316',
        },
      })}
    >
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen
        name="ResultSearchFoodScreen"
        component={ResultSearchFoodScreen}
      />
    </Stack.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AppNavigatorContent />
    </NavigationContainer>
  );
}