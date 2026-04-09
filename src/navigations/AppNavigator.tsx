import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import TabNavigator from './TabNavigator';

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
    </Stack.Navigator>
  );
};

const AppNavigator = () => (
  <View style={styles.appRoot}>
    <NavigationContainer>
      <AppNavigatorContent />
    </NavigationContainer>
  </View>
);

const styles = StyleSheet.create({
  appRoot: {
    flex: 1,
  },
});

export default AppNavigator;

