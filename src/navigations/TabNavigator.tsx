import React, { useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
        const config = TAB_ICON_MAP[route.name as keyof typeof TAB_ICON_MAP] || {};
        const iconName = focused ? config.icon : config.unfocusedIcon || config.icon;
        const label = config.labelKey ? t(config.labelKey) : '';

        return (
          <View style={[styles.iconContainer, focused && styles.focusedContainer]}>
            <Icon
              name={iconName}
              size={TAB_ICON_SIZE}
              color={focused ? '#FFFFFF' : '#9CA3AF'}
            />
            {focused && (
              <Text style={styles.label} numberOfLines={1}>
                {label}
              </Text>
            )}
          </View>
        );
      },
      tabBarActiveTintColor: '#FFFFFF',
      tabBarInactiveTintColor: '#9CA3AF',
      tabBarStyle: {
        backgroundColor: '#1F2937', // Dark bg like citrine NAV_BAR_COLOR
        height: totalTabBarHeight,
        paddingBottom: TAB_BAR_PADDING_BOTTOM + insets.bottom,
        paddingTop: TAB_BAR_PADDING_TOP,
        borderTopWidth: 0,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      tabBarItemStyle: {
        flex: 1,
        paddingVertical: 4,
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

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  focusedContainer: {
    backgroundColor: '#3629B7', // Active pill like citrine
    minWidth: 70,
    shadowColor: '#3629B7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    color: '#FFFFFF',
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default TabNavigator;

