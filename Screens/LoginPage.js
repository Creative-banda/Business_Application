import React, { useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CustomAlert from '../GlobalComponents/Customalert';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { BASE_URL } from '@env';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ThemeContext } from '../Globals/ThemeContext';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const {setUserDetails} = useContext(ThemeContext);

    const handleLogin = async () => { 
        setLoading(true);
        const payload = {
            mail: email,
            password: password
        };
        try {
            const response = await axios.post( `${BASE_URL}/auth/login`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                setAlertMessage('Login Successful');
                setAlertType('success');
                setAlertVisible(true);
               
                await SecureStore.setItemAsync('token', response.data.user.token);   
                await SecureStore.setItemAsync('id', response.data.user._id);   
              
                setUserDetails(response.data.user);
                navigation.navigate('HomeScreen');
                
            }
        } catch (error) {
                console.log('Error Response:', error.response.data);
                setAlertMessage(error.response.data.message);
                setAlertType('error');
                setAlertVisible(true);
        }finally{
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >

            <View style={[styles.formContainer]}>
                <Text style={styles.header}>Welcome Back</Text>
                <Text style={styles.subHeader}>Sign in to continue</Text>

                <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={24} color="#7F00FF" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={(e) => setEmail(e)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>

                    <Ionicons name="lock-closed-outline" size={24} color="#7F00FF" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={(e) => setPassword(e)}
                        secureTextEntry={!isPasswordVisible}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                        <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} color="#7F00FF" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate("ForgetPassword")}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>

                    {loading ? <ActivityIndicator size='small' color={'#fff'} /> : <Text style={styles.buttonText}>Login</Text>}
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signupLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{ position: 'absolute', width: '95%', bottom: 10 }}>

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
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        fontSize: 28,
        fontFamily: 'Outfit-bold',
        color: '#7F00FF',
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 16,
        fontFamily: 'Outfit',
        color: '#666',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginBottom: 20,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontFamily: 'Outfit',
        fontSize: 16,
        color: '#333',
    },
    eyeIcon: {
        padding: 10,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        fontFamily: 'Outfit',
        color: '#7F00FF',
    },
    button: {
        backgroundColor: '#7F00FF',
        paddingVertical: 15,
        paddingHorizontal: 35,
        borderRadius: 25,
        marginBottom: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Outfit-bold',
        color: 'white',
        fontSize: 18,
    },
    signupContainer: {
        flexDirection: 'row',
    },
    signupText: {
        fontFamily: 'Outfit',
        color: '#666',
    },
    signupLink: {
        fontFamily: 'Outfit-bold',
        color: '#7F00FF',

    },
});

export default LoginScreen;