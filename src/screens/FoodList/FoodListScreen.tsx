import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import FoodCard from '../../components/FoodCard';
import { mockFeaturedFoods } from '../../utils/mockHomeData';

const FoodListScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleFoodPress = (foodId: string, foodName: string) => {
    navigation.navigate('ResultSearchFoodScreen', { foodName } as any);
  };

  const renderFoodCard = ({ item }: any) => (
    <FoodCard {...item} onPress={handleFoodPress} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Food List</Text>
        <Text style={styles.subtitle}>Tap any food to search nearby restaurants</Text>
      </View>
      <FlatList
        data={mockFeaturedFoods}
        renderItem={renderFoodCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  list: {
    padding: 16,
  },
});

export default FoodListScreen;

