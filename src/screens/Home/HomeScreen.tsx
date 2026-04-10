import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

import FoodCard from '../../components/FoodCard';
import { mockFeaturedFoods, mockCategories } from '../../utils/mockHomeData';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleFoodPress = (foodId: string, foodName: string) => {
    navigation.navigate('ResultSearchFoodScreen' as never, { foodName });
  };

  const renderCategory = ({ item }: any) => (
    <View style={styles.categoryCard}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText} numberOfLines={2}>
        {item.title}
      </Text>
    </View>
  );

  const renderFoodCard = ({ item }: any) => (
    <FoodCard {...item} onPress={handleFoodPress} />
  );

  const renderRecommendedCard = ({ item }: any) => (
    <View style={styles.recommendedWrapper}>
      <FoodCard {...item} onPress={handleFoodPress} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#333" style={{ flex: 1 }} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* SEARCH */}
          <View style={styles.searchBar}>
            <Icon name="search" size={18} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search dishes, restaurants..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
              onSubmitEditing={() =>
                searchQuery.trim() &&
                navigation.navigate('ResultSearchFoodScreen' as never, {
                  foodName: searchQuery.trim(),
                })
              }
            />
            <Icon name="microphone" size={18} color="#666" />
          </View>

          {/* WRAPPER CHUNG -> FIX LỆCH LỀ */}
          <View style={styles.content}>
            {/* CATEGORIES */}
            <Text style={styles.sectionTitle}>
              {t('home.categories')}
            </Text>

            <FlatList
              data={mockCategories}
              renderItem={renderCategory}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />

            {/* POPULAR */}
            <Text style={styles.sectionTitle}>
              {t('home.popularMenu')}
            </Text>

            <FlatList
              data={mockFeaturedFoods.slice(0, 8)}
              renderItem={renderFoodCard}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />

            {/* RECOMMENDED */}
            <Text style={styles.sectionTitle}>
              {t('home.recommended')}
            </Text>

            <FlatList
              data={mockFeaturedFoods.slice(8)}
              renderItem={renderRecommendedCard}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.gridList}
            />
          </View>
        </ScrollView>
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

  content: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 12,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 10,
  },

  horizontalList: {
    paddingRight: 16,
  },

  gridList: {
    paddingBottom: 20,
  },

  categoryCard: {
    width: 80,
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
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
    margin: 4,
    transform: [{ scale: 0.9 }],
  },
});