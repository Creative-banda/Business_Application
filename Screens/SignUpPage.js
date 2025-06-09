import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import CustomAlert from '../GlobalComponents/Customalert';
import CustomInput from '../GlobalComponents/SignUpInput';
import axios from 'axios';
import { BASE_URL } from '@env';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [alertVisible, setAlertVisible] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const handleSignUp = async () => {
        if (password !== confirmPassword || !email || !name) {
            setAlertMessage('Please fill in all required fields!');
            setAlertType('error');
            setAlertVisible(true);
            return;
        }

        setLoading(true);
        try {
            const payload = { mail: email, password, userName: name, phoneNumber };
            const response = await axios.post(`${BASE_URL}/auth/signup`, payload, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.data.success) {
                setAlertMessage('Account created successfully! Please check your email for verification.');
                setAlertType('success');
                setAlertVisible(true);
                setName('');
                setEmail('');
                setPhoneNumber('');
                setPassword('');
                setConfirmPassword('');
                navigation.navigate('Login');
            }
        } catch (error) {
            console.log('Error Response:', error.response.data);
            setAlertMessage(error.response?.data?.message || 'An error occurred');
            setAlertType('error');
            setAlertVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Create Account</Text>
                    <Text style={styles.subHeader}>Sign up to get started!</Text>
                </View>
                <View style={styles.formContainer}>
                    <CustomInput
                        iconName="person-outline"
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <CustomInput
                        iconName="mail-outline"
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <CustomInput
                        iconName="phone-portrait-outline"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                    />
                    <CustomInput
                        iconName="lock-closed-outline"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        isPasswordVisible={isPasswordVisible}
                        togglePasswordVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                    <CustomInput
                        iconName="lock-closed-outline"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        isPasswordVisible={isConfirmPasswordVisible}
                        togglePasswordVisibility={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        {loading ? <ActivityIndicator size="small" /> : <Text style={styles.buttonText}>Sign Up</Text>}
                    </TouchableOpacity>
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginLink}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', width: '95%', bottom: 10, paddingLeft: 10 }}>
                <CustomAlert
                    visible={alertVisible}
                    message={alertMessage}
                    type={alertType}
                    onClose={() => setAlertVisible(false)}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        width: '100%',
    },
    headerContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    header: {
        fontSize: 32,
        fontFamily: 'Outfit-bold',
        color: '#6200EE',
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 18,
        fontFamily: 'Outfit',
        color: '#666',
    },
    formContainer: {
        width: '100%',
    },
    button: {
        backgroundColor: '#6200EE',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        elevation: 3,
        shadowColor: "#6200EE",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
    buttonText: {
        fontFamily: 'Outfit-bold',
        color: '#FFF',
        fontSize: 18,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginText: {
        fontFamily: 'Outfit',
        color: '#666',
    },
    loginLink: {
        fontFamily: 'Outfit-bold',
        color: '#6200EE',
    },
});

export default SignUpScreen;
