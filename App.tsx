/**
 * FoodAtlas App with TabNavigator (similar to Citrine)
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SettingsProvider } from './src/contexts/SettingsContext';
import AppNavigator from './src/navigations/AppNavigator';
import './src/config/i18n'; // Init i18n

const App = () => {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <AppNavigator />
      </SettingsProvider>
    </SafeAreaProvider>
  );
};

export default App;

