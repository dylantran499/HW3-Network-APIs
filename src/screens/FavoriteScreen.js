import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FavoriteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Screen</Text>
      <Text style={styles.info}>Your favorited photos will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#ff1493',
    marginBottom: 10,
  },
  info: {
    color: '#aaa',
    fontSize: 16,
  },
});
