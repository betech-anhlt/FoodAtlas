import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { fetchSerpFoodPlaces } from '../../services/apiSerpapi';
import type { SerpLocalResult } from '../../types/serpapi';

const ResultSearchFoodScreen: React.FC = () => {
  const route = useRoute<any>();
  const params = route.params || {};
  const foodName = (params as any).foodName || 'Food';

  const [places, setPlaces] = useState<SerpLocalResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const searchPlaces = async () => {
      try {
        setLoading(true);
        setError('');
        console.log('Searching for:', foodName, params); // Debug log
        // Pass city/country if available from params, default Hanoi
        const { city = 'Hanoi', country = 'Vietnam' } = params;
        const results = await fetchSerpFoodPlaces(foodName, city, country);
        console.log('SerpAPI results:', results.length); // Debug log
        setPlaces(results);
      } catch (err) {
        console.error('Search error:', err);
        setError(`Failed to fetch: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    searchPlaces();
  }, [foodName, params]);

  const renderPlace = ({ item }: { item: SerpLocalResult }) => (
    <TouchableOpacity style={styles.placeItem}>
      <Text style={styles.placeTitle}>{item.title}</Text>
      <Text style={styles.placeAddress}>{item.address || 'No address'}</Text>
      {item.rating && (
        <Text style={styles.rating}>{item.rating}⭐ ({item.reviews || 0} reviews)</Text>
      )}
      {item.type && <Text style={styles.type}>{item.type}</Text>}
      {item.website && (
        <Text style={styles.website} numberOfLines={1}>{item.website}</Text>
      )}
      {item.thumbnail && (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#F97316" />
        <Text style={styles.loadingText}>Searching "{foodName}"...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{foodName} ({places.length} places)</Text>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={places}
          renderItem={renderPlace}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: 'white',
  },
  list: {
    padding: 16,
  },
  rating: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 2,
  },
  type: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginTop: 4,
  },
  placeItem: {
    backgroundColor: 'white',
    padding: 16,
    margin: 8,
    borderRadius: 12,
    elevation: 2,
  },
  placeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  placeAddress: {
    fontSize: 14,
    color: '#666',
  },
  website: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#f31',
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});

export default ResultSearchFoodScreen;
