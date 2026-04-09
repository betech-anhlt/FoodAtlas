import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { mockLocations, hanoiRegion } from '../../utils/mockMapData';
import { styles } from './styles';

interface RouteParams {
  foodId: string;
  foodName: string;
}

const MapScreen: React.FC = () => {
  const route = useRoute();
  const params = route.params as RouteParams | undefined;

  const foodId = params?.foodId;
  const foodName = params?.foodName || 'Selected Food';

  const locations = useMemo(() => {
    if (!foodId) return [];
    return mockLocations.filter(loc => loc.foodId === foodId);
  }, [foodId]);

  const initialRegion = hanoiRegion;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{foodName}</Text>
        <Text style={styles.subtitle}>
          {locations.length} locations nearby
        </Text>
      </View>
      {locations.length > 0 ? (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation
          showsMyLocationButton
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.title}
              description={location.address}
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.noLocations}>
          <Text style={styles.noLocationsText}>
            No locations found for {foodName}
          </Text>
          {foodId && (
            <Text style={styles.noLocationsText}>
              Food ID: {foodId}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default MapScreen;


