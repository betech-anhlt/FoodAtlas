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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

import FoodCard from '../../components/FoodCard';
import { mockFeaturedFoods, mockCategories } from '../../utils/mockHomeData';

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

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
    return <FoodCard {...item} />;
  };

  // Recommended card nhỏ hơn
  const renderRecommendedCard = ({ item }: any) => {
    return (
      <View style={styles.recommendedWrapper}>
        <FoodCard {...item} />
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
         <Icon name="microphone" size={18} color="#666" style={styles.micIcon} />
      </View>

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
    paddingBottom: 80, // để scroll thoải mái
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

  // 🔽 Recommended wrapper để làm card nhỏ hơn
  recommendedWrapper: {
    flex: 1,
    margin: 6,
    transform: [{ scale: 0.9 }], // 👈 làm nhỏ card
  },
});