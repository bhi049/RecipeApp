import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DiscoveryScreen = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [savedMeals, setSavedMeals] = useState([]); // Local storage for now

    const fetchRandomMeals = async () => {
        setLoading(true);
        try {
            const request = Array.from({ length: 10 }).map(() =>
                axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
            );
            const response = await Promise.all(request);
            const randomMeals = response.map(res => res.data.meals[0]);
            setMeals(randomMeals);
        } catch (error) {
            console.error('Error fetching meals:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveMeal = (meal) => {
        const updatedSavedMeals = [...savedMeals, meal];
        setSavedMeals(updatedSavedMeals);
        AsyncStorage.setItem('savedMeals', JSON.stringify(updatedSavedMeals));
    };

    useEffect(() => {
        fetchRandomMeals();
    }, []);
      
    return (
        <View style={styles.container}>
            <Button title="🔁 Refresh" onPress={fetchRandomMeals} disabled={loading} />
            {loading ? (
                <ActivityIndicator style={{ marginTop: 20 }} size="large" />
            ) : (
                <FlatList
                    data={meals}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
                            <Text style={styles.title}>{item.strMeal}</Text>
                            <TouchableOpacity style={styles.saveBtn} onPress={() => handleSaveMeal(item)}>
                                <Text style={styles.saveText}>❤️ Save</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};
    
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 10, 
        backgroundColor: '#fff' 
    },
    card: {
        backgroundColor: '#f9f9f9',
        marginVertical: 8,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
    },
    image: { 
        width: '100%', 
        height: 200 
    },
    title: { 
        padding: 10, 
        fontSize: 18, 
        fontWeight: 'bold' 
    },
    saveBtn: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#ffeaea',
    },
    saveText: { 
        color: 'red', 
        fontWeight: 'bold' 
    },
});
    
export default DiscoveryScreen;