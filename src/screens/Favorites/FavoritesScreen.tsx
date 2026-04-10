import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavoritesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Title moved to header */}
      <Text>(trái tim / ưa thích)</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});

export default FavoritesScreen;

