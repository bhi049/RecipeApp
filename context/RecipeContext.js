import React, { createContext, useState, useContext } from 'react';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([
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

  const addRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: Date.now().toString(), // Generate a unique ID
    };
    setRecipes([...recipes, newRecipe]);
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
}; 