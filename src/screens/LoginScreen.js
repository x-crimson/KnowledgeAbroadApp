import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { login } from '../services/api'; // Adjust the path as necessary

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await login(email, password);
            console.log('Login successful:', response);
            navigation.navigate('Home');
        } catch (error) {
            const errorMessage = error.response && error.response.data ? error.response.data.message : 'Login failed. Please try again.';
            Alert.alert('Login Error', errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('./assets/logo.jpeg')} style={styles.logo} />
            <Text style={styles.header}>Login</Text>
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
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text onPress={() => navigation.navigate('SignUp')} style={styles.linkText}>
                Don't have an account? Register
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    logo: {
        width: 300,
        height: 100,
        resizeMode: 'contain',
        marginTop: 20,
        marginBottom: 30,
    },
    header: {
        fontSize: 24,
        color: '#333333',
        marginTop: 40,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 30,
        backgroundColor: '#FAFAFA',
    },
    button: {
        width: '50%',
        padding: 15,
        marginTop:30,
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        borderRadius: 15,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    linkText: {
        marginTop: 20,
        color: '#0066CC',
    }
});

export default LoginScreen;
