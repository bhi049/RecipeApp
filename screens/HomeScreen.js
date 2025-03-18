import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';

const HomeScreen = ({ navigation }) => {
  const { recipes } = useRecipes();

  const handleRecipePress = (recipe) => {
    // We'll implement navigation to recipe details later
    console.log('Recipe pressed:', recipe.title);
  };

  const handleAddRecipe = () => {
    navigation.navigate('AddRecipe');
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
      <TouchableOpacity style={styles.fab} onPress={handleAddRecipe}>
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>
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
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#ff6b6b',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default HomeScreen; 