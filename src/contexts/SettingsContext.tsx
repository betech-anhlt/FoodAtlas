import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Settings = {
  country: string;
  city: string;
  language: string;
};

type SettingsAction = {
  type: 'UPDATE_SETTINGS';
  payload: Partial<Settings>;
};

const SETTINGS_STORAGE_KEY = 'settings_v1';

const initialState: Settings = {
  country: 'Vietnam',
  city: 'Hanoi',
  language: 'en',
};

const settingsReducer = (state: Settings, action: SettingsAction): Settings => {
  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

interface SettingsContextType {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, dispatch] = useReducer(settingsReducer, initialState);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
        if (stored) {
          const parsed: Partial<Settings> = JSON.parse(stored);
          dispatch({ type: 'UPDATE_SETTINGS', payload: parsed });
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
      } catch (error) {
        console.error('Failed to save settings:', error);
      }
    };
    saveSettings();
  }, [settings]);

  const updateSettings = (updates: Partial<Settings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: updates });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

