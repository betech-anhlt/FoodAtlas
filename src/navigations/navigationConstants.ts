import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import FavoritesScreen from '../screens/Favorites/FavoritesScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

export interface TabIconConfig {
  icon: string;
  unfocusedIcon: string;
  labelKey: string;
}

export const TAB_ICON_MAP: Record<string, TabIconConfig> = {
  Home: { icon: 'home', unfocusedIcon: 'home', labelKey: 'nav.home' },
  Search: { icon: 'search', unfocusedIcon: 'search', labelKey: 'nav.search' },
  Favorites: { icon: 'heart', unfocusedIcon: 'heart', labelKey: 'nav.favorites' },
  Settings: { icon: 'cog', unfocusedIcon: 'cog', labelKey: 'nav.settings' },
};

export interface TabType {
  key: string;
  name: string;
  component: React.ComponentType;
}

export const ALL_TABS: TabType[] = [
  { key: 'home', name: 'Home', component: HomeScreen },
  { key: 'search', name: 'Search', component: SearchScreen },
  { key: 'favorites', name: 'Favorites', component: FavoritesScreen },
  { key: 'settings', name: 'Settings', component: SettingsScreen },
];

export const VISIBLE_TABS: TabType[] = ALL_TABS;

export const TAB_BAR_HEIGHT = 60;
export const TAB_BAR_PADDING_TOP = 8;
export const TAB_BAR_PADDING_BOTTOM = 8;
export const TAB_ICON_SIZE = 20;
