import React, { useState } from 'react';
<<<<<<< HEAD
import { Ionicons } from '@expo/vector-icons';
import CustomAlert from '../GlobalComponents/Customalert';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert } from 'react-native';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');  // New state for storing the user's name
    const [email, setEmail] = useState('');
=======
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import CustomAlert from '../GlobalComponents/Customalert';
import CustomInput from '../GlobalComponents/SignUpInput';
import axios from 'axios';
import { BASE_URL } from '@env';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
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
<<<<<<< HEAD
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update the user's profile with the name
            await updateProfile(user, { displayName: name });

            await sendEmailVerification(user);

            Alert.alert(
                "Success",
                "Account created successfully! Please check your email for verification.",
                [{ text: "OK", onPress: () => navigation.navigate('Login') }]
            );
        } catch (error) {
            let errorMessage = "An error occurred during sign up.";
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "This email is already in use.";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Please enter a valid email address.";
                    break;
                case 'auth/weak-password':
                    errorMessage = "The password is too weak. Please use a stronger password.";
                    break;
            }
            Alert.alert("Error", errorMessage);
=======
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
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
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
<<<<<<< HEAD

                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={24} color="#6200EE" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor="#999"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={24} color="#6200EE" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={24} color="#6200EE" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!isPasswordVisible}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                            <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} color="#6200EE" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={24} color="#6200EE" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor="#999"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!isConfirmPasswordVisible}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} style={styles.eyeIcon}>
                            <Ionicons name={isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} color="#6200EE" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        {loading ? <ActivityIndicator size='small' /> : <Text style={styles.buttonText}>Sign Up</Text>}
                    </TouchableOpacity>

=======
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
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
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
<<<<<<< HEAD
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 15,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
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
=======
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
    button: {
        backgroundColor: '#6200EE',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        elevation: 3,
        shadowColor: "#6200EE",
<<<<<<< HEAD
        shadowOffset: {
            width: 0,
            height: 3,
        },
=======
        shadowOffset: { width: 0, height: 3 },
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
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
