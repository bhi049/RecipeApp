import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_MEALS_KEY = 'savedMeals';

const useSavedMeals = () => {
    const [savedMeals, setSavedMeals] = useState([]);

    useEffect(() => {
        const loadSavedMeals = async () => {
            try {
                const saved = await AsyncStorage.getItem(SAVED_MEALS_KEY);
                if (saved) {
                    setSavedMeals(JSON.parse(saved));
                }
            } catch (error) {
                console.error('Error loading saved meals:', error);
            }
        };
        loadSavedMeals();
    }, []);

    const saveMeals = async (meals) => {
        try {
            await AsyncStorage.setItem(SAVED_MEALS_KEY, JSON.stringify(meals));
            setSavedMeals(meals);
        } catch (error) {
            console.error('Error saving meals:', error);
        }
    };

    const removeMeal = async (mealId) => {
        try {
            const updatedMeals = savedMeals.filter(meal => meal.idMeal !== mealId);
            await saveMeals(updatedMeals);
        } catch (error) {
            console.error('Error removing meal:', error);
        }
    }; 
    return { savedMeals, saveMeals, removeMeal };
};

export default useSavedMeals;