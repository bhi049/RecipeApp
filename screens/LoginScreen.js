import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const handleAuth = async () => {
        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            navigation.navigate('Discovery'); // Navigate to the Discovery screen after successful login
        } catch (error) {
            console.error('Authentication error:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/MealBuddy-logo.png')} 
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.formContainer}>
                <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#aaa"
                />
                <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
                    <Text style={styles.authButtonText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                    <Text style={styles.switchText}>
                        {isSignUp ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        alignItems: 'center', // Center horizontally
        paddingVertical: 40, // Add vertical padding
    },
    logo: {
        width: 220,
        height: 220,
        alignSelf: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2d3436',
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#2d3436',
    },
    authButton: {
        width: '100%',
        backgroundColor: 'red',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    authButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    switchText: {
        fontSize: 14,
        color: 'red',
        fontWeight: '500',
        textAlign: 'center',
    },
    formContainer: {
        width: '100%',
        alignItems: 'center', // Center horizontally
        paddingHorizontal: 16, // Add padding for better spacing
    },
});

export default LoginScreen;