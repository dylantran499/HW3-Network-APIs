import React, { useState } from 'react';
import {View, Text, TextInput, FlatList, Image, Pressable, ActivityIndicator, StyleSheet} from 'react-native';
import { searchPhotos } from '../pexels';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [photos, setPhotos] = useState([]);
    const [favorites, setFavorites] = useState([]); // local favorites
    const [loading, setLoading] = useState(false);

const handleSearch = async () => {
    if (!searchTerm.trim()) return;
        setLoading(true);
        const results = await searchPhotos(searchTerm.trim());
        setPhotos(results);
        setLoading(false);
};

const toggleFavorite = (photo) => {
    const exists = favorites.find((p) => p.id === photo.id);
        if (exists) {
            setFavorites(favorites.filter((p) => p.id !== photo.id));
        } else {
            setFavorites([...favorites, photo]);
        }
};

React.useEffect(() => {
    navigation.setParams({ favorites });
}, [favorites]);

const renderPhoto = ({ item }) => {
    const isFavorite = favorites.some((p) => p.id === item.id);
        return (
            <View style={styles.photoContainer}>
            <Image source={{ uri: item.src.medium }} style={styles.photo} />
                <View style={styles.row}>
                    <Text style={styles.photographer}>📷 {item.photographer}</Text>
                        <Pressable onPress={() => toggleFavorite(item)}>
                            <Ionicons
                                name={isFavorite ? 'heart' : 'heart-outline'}
                                size={28}
                                color={isFavorite ? '#ff1493' : '#aaa'}
                            />
                        </Pressable>
                </View>
            </View>
        );
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
                renderItem={renderPhoto}
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
    list: {
        paddingBottom: 50,
    },
    photoContainer: {
        marginBottom: 20,
    },
    photo: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    photographer: {
        color: '#aaa',
    },
    info: {
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
});
