import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import TabNavigator from './TabNavigator';
import ResultSearchFoodScreen from '../screens/ResultSearch/ResultSearchFoodScreen';
import CommonHeader from '../components/CommonHeader';

const Stack = createStackNavigator();

const AppNavigatorContent = () => {
  const { t } = useTranslation();
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

        headerTitle: () => {
          if (route.name === 'Main') {
            return <CommonHeader title={t('nav.home')} showBack={false} />;
          }
          if (route.name === 'ResultSearchFoodScreen') {
            const foodName = (route.params as any)?.foodName || '';
            return <CommonHeader title={t('screen.resultSearch', { food: foodName })} showBack={true} />;
          }
          return <CommonHeader title={route.name} showBack={true} />;
        },


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