import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSettings } from '../../contexts/SettingsContext';
import { useTranslation } from 'react-i18next';


const countries = ['Vietnam', 'United States', 'Japan', 'France'];
const cities = {
  Vietnam: ['Hanoi', 'Ho Chi Minh City', 'Da Nang'],
  'United States': ['New York', 'Los Angeles', 'Chicago'],
  Japan: ['Tokyo', 'Osaka', 'Kyoto'],
  France: ['Paris', 'Marseille', 'Lyon'],
};
const languages = ['en', 'vi', 'ja'];

const SettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { settings, updateSettings } = useSettings();
  const [localSettings, setLocalSettings] = React.useState(settings);

  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    updateSettings(localSettings);
    Alert.alert('Success', 'Settings saved!');
  };

  const handleCountryChange = (country: string) => {
    setLocalSettings({ ...localSettings, country, city: cities[country as keyof typeof cities]?.[0] || '' });
  };

  const handleCityChange = (city: string) => {
    setLocalSettings({ ...localSettings, city });
  };

  const handleLanguageChange = (language: string) => {
    setLocalSettings({ ...localSettings, language });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('settings.title', 'Settings')}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Country</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={localSettings.country}
            onValueChange={handleCountryChange}
            style={styles.picker}
          >
            {countries.map(country => (
              <Picker.Item key={country} label={country} value={country} />
            ))}
          </Picker>
        </View>
        <Text style={styles.value}>{localSettings.country}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>City</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={localSettings.city}
            onValueChange={handleCityChange}
            style={styles.picker}
            enabled={!!cities[localSettings.country as keyof typeof cities]}
          >
            {cities[localSettings.country as keyof typeof cities]?.map(city => (
              <Picker.Item key={city} label={city} value={city} />
            )) || <Picker.Item label="Select country first" value="" />}
          </Picker>
        </View>
        <Text style={styles.value}>{localSettings.city}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Language</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={localSettings.language}
            onValueChange={handleLanguageChange}
            style={styles.picker}
          >
            {languages.map(lang => (
              <Picker.Item key={lang} label={lang.toUpperCase()} value={lang} />
            ))}
          </Picker>
        </View>
        <Text style={styles.value}>{localSettings.language.toUpperCase()}</Text>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    height: 50,
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#F97316',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  current: {
    marginTop: 30,
    fontSize: 12,
    color: '#999',
    fontFamily: 'monospace',
  },
});

export default SettingsScreen;

