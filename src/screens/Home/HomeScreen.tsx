import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

// const { width: screenWidth } = Dimensions.get('window');
const horizCardWidth = 120;

interface MenuItem {
  id: string;
  title: string;
  image: string;
}

const categories = [
  { id: '1', title: 'Burger', image: require('../../assets/images/food/burger.png') },
  { id: '2', title: 'Hot Pot', image: require('../../assets/images/food/hot-pot.png') },
  { id: '3', title: 'Dish', image: require('../../assets/images/food/dish.png') },
];

const popular: MenuItem[] = [
  { id: '1', title: 'Shrimp', image: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Mushroom', image: 'https://via.placeholder.com/150' },
  { id: '3', title: 'Beef', image: 'https://via.placeholder.com/150' },
  { id: '4', title: 'Vegetables', image: 'https://via.placeholder.com/150' },
];

const recommended: MenuItem[] = [
  { id: '1', title: 'Carbonara', image: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Ramen', image: 'https://via.placeholder.com/150' },
];

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const renderCategory = ({ item }: { item: typeof categories[0] }) => (
    <View style={styles.categoryCard}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.title}</Text>
    </View>
  );

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuCard}>
      <Image source={{ uri: item.image }} style={styles.menuImage} />
      <Text style={styles.menuText}>{item.title}</Text>
    </View>
  );

  const getRecommendedItemLayout = (_data: any, _index: number) => ({
    length: 140,
    offset: 140 * _index,
    index: _index,
  });

  const HeaderComponent = () => (
    <>
      <Text style={styles.title}>{t('nav.home') || 'Home'}</Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search dishes, ingredients, restaurants"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Icon name="microphone" size={20} color="#666" style={styles.searchMic} />
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        horizontal={false}
        numColumns={3}
        style={styles.categoryList}
        scrollEnabled={false}
      />

      {/* Popular */}
      <Text style={styles.sectionTitle}>Popular Menu</Text>
      <FlatList
        data={popular}
        renderItem={renderMenuItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.grid}
      />

      {/* Recommended Title */}
      <Text style={styles.sectionTitle}>★ Recommended</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recommended}
        ListHeaderComponent={HeaderComponent}
        renderItem={renderMenuItem}
        numColumns={2}
        keyExtractor={(item) => item.id}
        getItemLayout={getRecommendedItemLayout}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  searchMic: {
    fontSize: 20,
    marginLeft: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  categoryList: {
    marginBottom: 20,
  },
  categoryCard: {
    flex: 1,
    alignItems: 'center',
    margin: 4,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  grid: {
    gap: 10,
    paddingBottom: 20,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    minWidth: horizCardWidth,
    flex: 1,
    margin: 2,
  },
  menuImage: {
    width: '100%',
    height: horizCardWidth * 0.75,
  },
  menuText: {
    fontSize: 12,
    padding: 5,
    textAlign: 'center',
  },
});

export default HomeScreen;

