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
import { mockFeaturedFoods } from '../../utils/mockHomeData';

import FoodCard from '../../components/FoodCard';
import { useSettings } from '../../contexts/SettingsContext';
import { mockCategories } from '../../utils/mockHomeData';




const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { settings } = useSettings();

 const handleFoodPress = (foodId: string, foodName: string) => {
  navigation.navigate('ResultSearchFoodScreen' as never, { foodName });
 };


// const testMapLog = () => {
//   navigation.navigate('ResultSearchFoodScreen', { foodName: 'coffee', city: 'Hanoi', country: 'Vietnam' }); // Test SerpAPI Coffee example from TODO.md
// };

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



  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#333" style={{ flex: 1 }} />
      ) : (
        <View>
          <View style={styles.searchBar}>
            <Icon name="search" size={18} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search dishes, restaurants..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => searchQuery.trim() && navigation.navigate('ResultSearchFoodScreen' as never, { foodName: searchQuery.trim() })}
              returnKeyType="search"
            />
            <Icon name="microphone" size={18} color="#666" />
          </View>
          <ScrollView style={styles.scroll}>
            {/* Categories */}
            <Text style={styles.sectionTitle}>{t('home.categories')}</Text>
            <FlatList
              data={mockCategories}
              renderItem={renderCategory}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />

            {/* Popular */}
            <Text style={styles.sectionTitle}>{t('home.popularMenu')}</Text>
            <FlatList
              data={mockFeaturedFoods.slice(0, 8)}
              renderItem={renderFoodCard}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />

            {/* Recommended */}
            <Text style={styles.sectionTitle}>{t('home.recommended')}</Text>
            <FlatList
              data={mockFeaturedFoods.slice(8)}
              renderItem={renderRecommendedCard}
              keyExtractor={(item) => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            />
          </ScrollView>
        </View>
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
    paddingTop: 8,
    paddingBottom: 100,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  settingsDisplay: {
    backgroundColor: '#f0f8ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  settingsText: {
    fontSize: 14,
    color: '#333',
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
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
    marginTop: 16,
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
    margin: 4,
    transform: [{ scale: 0.9 }], 
  },
  scrollContent: {
    paddingBottom: 20,
  },
});

