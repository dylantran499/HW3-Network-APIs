import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { searchPhotos } from '../pexels';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError(null);

    const results = await searchPhotos(searchTerm.trim());
    setPhotos(results);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photo Search</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for photos..."
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
        />
        <Pressable style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="white" />
        </Pressable>
      </View>

      {loading && <ActivityIndicator size="large" color="#00bfff" />}

      {!loading && photos.length === 0 && (
        <Text style={styles.info}>No results yet — try searching something!</Text>
      )}

      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.photoContainer}>
            <Image source={{ uri: item.src.medium }} style={styles.photo} />
            <Text style={styles.photographer}> {item.photographer}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    color: '#00bfff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#111',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#00bfff',
    padding: 10,
    borderRadius: 8,
  },
  info: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  list: {
    paddingBottom: 50,
  },
  photoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  photographer: {
    color: '#aaa',
    marginTop: 5,
  },
});
