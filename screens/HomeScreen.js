import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen; 