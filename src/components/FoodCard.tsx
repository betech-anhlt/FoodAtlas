import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const horizCardWidth = 95;

interface FoodCardProps {
  id: string;
  image: string | number;
  name: string;
  address: string;
  onSearchPress?: () => void;
  onPress?: (foodId: string, foodName: string) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ id, image, name, address, onSearchPress, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.touchableCard}
      activeOpacity={0.8}
      onPress={() => onPress?.(id, name)}
    >
      <View style={styles.card} key={id}>
<Image source={typeof image === 'string' ? { uri: image } : image} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Text style={styles.address} numberOfLines={1}>{address}</Text>
        </View>
        <TouchableOpacity style={styles.searchIconContainer} onPress={onSearchPress}>
          <Icon name="search" size={18} color="#666" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableCard: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    minWidth: horizCardWidth,
    flex: 1,
    margin: 2,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: horizCardWidth * 0.75,
  },
  info: {
    padding: 8,
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  address: {
    fontSize: 12,
    color: '#666',
  },
  searchIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default FoodCard;
