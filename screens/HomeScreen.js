import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import RecipeCard from '../components/RecipeCard';

const HomeScreen = () => {
  // Sample data - later we'll replace this with real data storage
  const [recipes] = useState([
    {
      id: '1',
      title: 'Spaghetti Carbonara',
      cookingTime: 30,
    },
    {
      id: '2',
      title: 'Classic Burger',
      cookingTime: 25,
    },
    {
      id: '3',
      title: 'Greek Salad',
      cookingTime: 15,
    },
    {
      id: '4',
      title: 'Chicken Stir Fry',
      cookingTime: 20,
    },
  ]);

  const handleRecipePress = (recipe) => {
    // We'll implement navigation to recipe details later
    console.log('Recipe pressed:', recipe.title);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            title={item.title}
            cookingTime={item.cookingTime}
            onPress={() => handleRecipePress(item)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Discover</Text>
            <Text style={styles.headerSubtitle}>Find your next favorite recipe</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
});

export default HomeScreen; 