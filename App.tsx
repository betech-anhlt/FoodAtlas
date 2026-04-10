/**
 * FoodAtlas App with TabNavigator (similar to Citrine)
 */

import React, { useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SettingsProvider, useSettings } from './src/contexts/SettingsContext';
import AppNavigator from './src/navigations/AppNavigator';
import './src/config/i18n'; // Init i18n

const AppContent = () => {
  const { settings } = useSettings();
  return <AppNavigator key={`app-${settings.language}`} />;
};

const App = () => {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </SafeAreaProvider>
  );
};


export default App;

