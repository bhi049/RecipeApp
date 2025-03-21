import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [savedMeals, setSavedMeals] = useState([]);

  const loadSavedMeals = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedMeals');
      if (saved) {
        setSavedMeals(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved meals:', error);
    }
  };

  const removeMeal = async (mealId) => {
    try {
      const updatedMeals = savedMeals.filter(meal => meal.idMeal !== mealId);
      setSavedMeals(updatedMeals);
      await AsyncStorage.setItem('savedMeals', JSON.stringify(updatedMeals));
    } catch (error) {
      console.error('Error removing meal:', error);
    }
  };

  useEffect(() => {
    loadSavedMeals();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Feather name="user" size={32} color="#ff6b6b" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>My Kitchen</Text>
            <Text style={styles.savedCount}>{savedMeals.length} saved recipes</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Saved Recipes</Text>
        <FlatList
          data={savedMeals}
          keyExtractor={(item) => `profile_${item.idMeal}`}
          renderItem={({ item }) => (
            <View style={styles.recipeCard}>
              <Image 
                source={{ uri: item.strMealThumb }} 
                style={styles.recipeImage}
                resizeMode="cover"
              />
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeName}>{item.strMeal}</Text>
                <Text style={styles.recipeCategory}>
                  {item.strCategory} • {item.strArea}
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeMeal(item.idMeal)}
              >
                <Feather name="trash-2" size={20} color="#ff6b6b" />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.recipeList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <Feather name="bookmark" size={48} color="#ccc" />
              <Text style={styles.emptyText}>No saved recipes yet</Text>
              <Text style={styles.emptySubtext}>
                Your saved recipes will appear here
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 4,
  },
  savedCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    padding: 16,
  },
  recipeList: {
    padding: 16,
    paddingTop: 0,
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  recipeImage: {
    width: 80,
    height: 80,
    backgroundColor: '#f1f1f1',
  },
  recipeInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  recipeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 4,
  },
  recipeCategory: {
    fontSize: 13,
    color: '#666',
  },
  removeButton: {
    padding: 12,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default ProfileScreen;