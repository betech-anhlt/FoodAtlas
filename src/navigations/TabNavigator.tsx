import React, { useCallback } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

import {
  TAB_ICON_MAP,
  VISIBLE_TABS,
} from './navigationConstants';

import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import FavoritesScreen from '../screens/Favorites/FavoritesScreen';
import MapScreen from '../screens/Map/MapScreen';

const TAB_BAR_HEIGHT = 60;
const TAB_BAR_PADDING_TOP = 8;
const TAB_BAR_PADDING_BOTTOM = 8;
const TAB_ICON_SIZE = 20;

const Tab = createBottomTabNavigator();

const SCREEN_MAP: Record<string, React.ComponentType> = {
  Home: HomeScreen,
  Search: SearchScreen,
  Favorites: FavoritesScreen,
  Map: MapScreen,
};

const TabNavigator: React.FC = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const totalTabBarHeight = TAB_BAR_HEIGHT + insets.bottom;

  const screenOptions = useCallback(
    ({ route }: { route: any }) => ({
      tabBarIcon: ({ focused }: { focused: boolean }) => {
        const config =
          TAB_ICON_MAP[route.name as keyof typeof TAB_ICON_MAP] || {};

        const iconName =
          focused ? config.icon : config.unfocusedIcon || config.icon;

        const label = config.labelKey ? t(config.labelKey) : '';

        return (
          <View
            style={[
              styles.container,
              focused ? styles.activeContainer : styles.inactiveContainer,
            ]}
          >
            <Icon
              name={iconName as string}
              size={TAB_ICON_SIZE}
              color={focused ? '#FFFFFF' : '#1F2937'}
            />

            <Text
              style={[
                styles.label,
                { color: focused ? '#FFFFFF' : '#1F2937' },
              ]}
              numberOfLines={1}
            >
              {label}
            </Text>
          </View>
        );
      },
      tabBarButton: (props: any) => (
        <Pressable
          {...props}
          android_ripple={{ color: 'transparent' }}
          style={({ pressed }: { pressed: boolean }) => [
            props.style,
            {
              transform: [{ scale: pressed ? 0.95 : 1 }],
            },
          ]}
        />
      ),
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        height: totalTabBarHeight,
        paddingBottom: TAB_BAR_PADDING_BOTTOM + insets.bottom,
        paddingTop: TAB_BAR_PADDING_TOP,
        borderTopWidth: 0,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      tabBarItemStyle: {
        flex: 1,
      },
      tabBarLabel: () => null,
      headerShown: false,
    }),
    [t, insets.bottom, totalTabBarHeight],
  );

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {VISIBLE_TABS.map(tab => {
        const Component = SCREEN_MAP[tab.name];
        return (
          <Tab.Screen
            key={tab.key}
            name={tab.name}
            component={Component}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 24,
    minWidth: 80,
  },

  activeContainer: {
    backgroundColor: '#F97316',
    paddingVertical: 6,
    minHeight: 40,
    minWidth: 96,
  },

  inactiveContainer: {
    backgroundColor: 'transparent',
  },

  label: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
  },
});