import React, { useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

import {
  TAB_ICON_MAP,
  VISIBLE_TABS,
  TAB_BAR_HEIGHT,
  TAB_BAR_PADDING_TOP,
  TAB_BAR_PADDING_BOTTOM,
  TAB_ICON_SIZE,
} from './navigationConstants';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const totalTabBarHeight = TAB_BAR_HEIGHT + insets.bottom;

  const screenOptions = useCallback(
    ({ route }) => ({
      tabBarIcon: ({ focused }) => {
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
              name={iconName}
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
      tabBarButton: (props) => (
  <Pressable
    {...props}
    android_ripple={{ color: 'transparent' }}
    style={({ pressed }) => [
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
        // shadow đẹp hơn
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
      {VISIBLE_TABS.map(tab => (
        <Tab.Screen
          key={tab.key}
          name={tab.name}
          component={tab.component}
        />
      ))}
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
