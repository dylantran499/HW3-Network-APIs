import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, onSnapshot, query } from 'firebase/firestore';

export default function FavoriteScreen() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'favorites'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
        const favs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
            setFavorites(favs);
        });
        return unsubscribe;
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorites</Text>

            {favorites.length === 0 ? (
                <Text style={styles.info}>No favorites yet. Try adding some!</Text>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.photoContainer}>
                            <Image source={{ uri: item.imageUrl }} style={styles.photo} />
                            <Text style={styles.photographer}> {item.photographer}</Text>
                        </View>
                    )}
                />
                )}
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
        color: '#ff1493',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 12,
    },
    info: {
        color: '#aaa',
        textAlign: 'center',
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
