import { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
            console.erroe('Authentication error:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isSignUp ? 'Sign up' : 'Login'}</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title={isSignUp ? 'Sign Up' : 'Login'} onPress={handleAuth} />
            <Text
                style={styles.switchText}
                onPress={() => setIsSignUp(!isSignUp)}
            >
                {isSignUp ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16,
        textAlign: 'center',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
      },
      switchText: {
        marginTop: 16,
        textAlign: 'center',
        color: '#ff6b6b',
      },
});

export default LoginScreen;