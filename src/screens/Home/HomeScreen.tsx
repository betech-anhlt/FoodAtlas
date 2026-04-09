import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import { mockFeaturedFoods } from '../../utils/mockHomeData';

import FoodCard from '../../components/FoodCard';
import { mockCategories } from '../../utils/mockHomeData';
import { isNativeMapEnabled, getFoodSearchQuery, openExternalMap } from '../../utils/mapHelpers';



const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

 const handleFoodPress = async (foodId: string, foodName: string) => {
  if (isNativeMapEnabled()) {
    navigation.navigate('Map', { foodId, foodName });
  } else {
      const { foodName: fn, address, latitude, longitude } = getFoodSearchQuery(foodId);
      await openExternalMap(fn, address, latitude, longitude);
  }
 };

 const testMapLog = () => {
   const firstFood = mockFeaturedFoods[0];
   handleFoodPress(firstFood.id, firstFood.name);
 };

  useEffect(() => {
    setLoading(false);
  }, []);

  const renderCategory = ({ item }: any) => (
    <View style={styles.categoryCard}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText} numberOfLines={2}>
        {item.title}
      </Text>
    </View>
  );

  // Popular & Recommended card
  const renderFoodCard = ({ item }: any) => {
    return <FoodCard {...item} onPress={handleFoodPress} />;
  };

  // Recommended card 
  const renderRecommendedCard = ({ item }: any) => {
    return (
      <View style={styles.recommendedWrapper}>
        <FoodCard {...item} onPress={handleFoodPress} />
      </View>
    );
  };

  const Header = () => (
    <View>
      <Text style={styles.title}>{t('nav.home') || 'Home'}</Text>

      {/* Search */}
      <View style={styles.searchBar}>
        <Icon name="search" size={18} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search dishes, restaurants..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Icon name="microphone" size={18} color="#666" />
      </View>

      {/* Test Map Log Button */}
      <TouchableOpacity style={styles.testButton} onPress={testMapLog}>
        <Icon name="map-marker" size={16} color="#fff" />
        <Text style={styles.testButtonText}>Test Map Log (Screen Alert + Terminal)</Text>
      </TouchableOpacity>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={mockCategories}
        renderItem={renderCategory}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

      {/* Popular */}
      <Text style={styles.sectionTitle}>Popular Menu</Text>
      <FlatList
        data={mockFeaturedFoods.slice(0, 8)}
        renderItem={renderFoodCard}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

      {/* Recommended Title */}
      <Text style={styles.sectionTitle}>★ Recommended</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#333" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={mockFeaturedFoods.slice(8)}
          ListHeaderComponent={Header}
          renderItem={renderRecommendedCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  scroll: {
    padding: 16,
    paddingBottom: 80, 
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
  },

  testButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  testButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  horizontalList: {
    paddingRight: 16,
  },

  categoryCard: {
    width: 80,
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    elevation: 2,
  },

  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },

  categoryText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },

  recommendedWrapper: {
    flex: 1,
    margin: 6,
    transform: [{ scale: 0.9 }], 
  },
});

