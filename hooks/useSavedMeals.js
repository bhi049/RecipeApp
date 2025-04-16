import { useState, useEffect, createContext } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';

export const SavedMealsContext = createContext();

export const SavedMealsProvider = ({ children }) => {
    const [savedMeals, setSavedMeals] = useState([]);

    useEffect(() => {
        if (!auth.currentUser) return;

        const userDocRef = doc(db, 'users', auth.currentUser.uid);

        // Reaaliaikainen kuuntelija Firestore-dokumentille
        const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                setSavedMeals(docSnapshot.data().savedMeals || []);
            } else {
                console.log('No saved meals found for this user.');
            }
        });

        return unsubscribe; // Poistaa kuuntelijan komponentin poistuessa
    }, [auth.currentUser]);

    const saveMealsToFirestore = async (meals) => {
        if (!auth.currentUser) {
            console.error('User is not authenticated.');
            return;
        }

        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        try {
            await setDoc(userDocRef, { savedMeals: meals }, { merge: true });
            setSavedMeals(meals);
        } catch (error) {
            console.error('Error saving meals to Firestore:', error);
        }
    };

    const addMeal = async (meal) => {
        const updatedMeals = [...savedMeals, meal];
        await saveMealsToFirestore(updatedMeals);
    };

    const removeMeal = async (mealId) => {
        const updatedMeals = savedMeals.filter((meal) => meal.idMeal !== mealId);
        await saveMealsToFirestore(updatedMeals);
    };

    return (
        <SavedMealsContext.Provider value={{ savedMeals, addMeal, removeMeal }}>
            {children}
        </SavedMealsContext.Provider>
    );
};