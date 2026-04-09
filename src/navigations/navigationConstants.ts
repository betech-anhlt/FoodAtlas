
import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import FavoritesScreen from '../screens/Favorites/FavoritesScreen';
import MapScreen from '../screens/Map/MapScreen';

// Tab Configuration (fixed for FoodAtlas)
export const TAB_ICON_MAP = {
  Home: { icon: 'home', unfocusedIcon: 'home', labelKey: 'nav.home' },
  Search: { icon: 'search', unfocusedIcon: 'search', labelKey: 'nav.search' },
  Favorites: { icon: 'heart', unfocusedIcon: 'heart', labelKey: 'nav.favorites' },
  Map: { icon: 'map-marker', unfocusedIcon: 'map-marker', labelKey: 'nav.map' },
} as const;

export const ALL_TABS = [
  { key: 'home', name: 'Home', component: HomeScreen },
  { key: 'search', name: 'Search', component: SearchScreen },
  { key: 'favorites', name: 'Favorites', component: FavoritesScreen },
  { key: 'map', name: 'Map', component: MapScreen },
];

// Fixed tabs (no role logic)
export const VISIBLE_TABS = ALL_TABS;

// Tab bar sizing constants (adapted from citrine)
export const TAB_BAR_HEIGHT = 60;
export const TAB_BAR_PADDING_TOP = 8;
export const TAB_BAR_PADDING_BOTTOM = 8;
export const TAB_ICON_SIZE = 20;

