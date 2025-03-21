import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
import DiscoveryScreen from './screens/DiscoveryScreen';
import { RecipeProvider } from './context/RecipeContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
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
        name="HomeScreen" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AddRecipe" 
        component={AddRecipeScreen}
        options={{
          title: 'Add New Recipe',
          presentation: 'modal',
          ...Platform.select({
            ios: {
              headerStyle: {
                backgroundColor: '#fff',
              },
            },
          }),
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <RecipeProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                if (route.name === 'Home') {
                  return <Feather name="home" size={24} color={color} />;
                } else if (route.name === 'Discover') {
                  return <Feather name="compass" size={24} color={color} />;
                }
                return <Feather name="user" size={24} color={color} />;
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
            })}
          >
            <Tab.Screen 
              name="Home" 
              component={HomeStack}
              options={{
                title: 'My Recipes',
              }}
            />
            <Tab.Screen 
              name="Discover" 
              component={DiscoveryScreen}
              options={{
                title: 'Discover',
                headerShown: false,
              }}
            />
            <Tab.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{
                title: 'Profile',
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </RecipeProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
