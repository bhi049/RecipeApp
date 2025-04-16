import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import { SavedMealsProvider } from './hooks/useSavedMeals';
import ProfileScreen from './screens/ProfileScreen';
import DiscoveryScreen from './screens/DiscoveryScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import LoginScreen from './screens/LoginScreen';
import { auth } from './firebaseConfig';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DiscoveryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#f1f1f1',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: '#2d3436',
        },
        headerBackTitleVisible: false,
        headerTintColor: '#ff6b6b',
      }}
    >
      <Stack.Screen 
        name="DiscoveryScreen" 
        component={DiscoveryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#f1f1f1',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: '#2d3436',
        },
        headerBackTitleVisible: false,
        headerTintColor: '#ff6b6b',
      }}
    >
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe; // Poistaa kuuntelijan komponentin poistuessa
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SavedMealsProvider>
        <NavigationContainer>
          {isAuthenticated ? (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  if (route.name === 'Discover') {
                    return <Feather name="compass" size={24} color={color} />;
                  } else if (route.name === 'Profile') {
                    return <Feather name="user" size={24} color={color} />;
                  }
                },
                tabBarActiveTintColor: '#ff6b6b',
                tabBarInactiveTintColor: '#666',
                tabBarStyle: {
                  backgroundColor: '#fff',
                  borderTopWidth: 1,
                  borderTopColor: '#f1f1f1',
                  paddingBottom: 8,
                  paddingTop: 8,
                  height: 60,
                  ...Platform.select({
                    ios: {
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: -2,
                      },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                    },
                    android: {
                      elevation: 8,
                    },
                  }),
                },
              })}
            >
              <Tab.Screen 
                name="Discover" 
                component={DiscoveryStack}
                options={{ headerShown: false }}
              />
              <Tab.Screen 
                name="Profile" 
                component={ProfileStack}
                options={{ headerShown: false }}
              />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{ headerShown: false }} 
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </SavedMealsProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
