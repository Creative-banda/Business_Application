import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import ProfileButton from '../ProfileComponents/ProfileButton';
import CustomNotification from '../GlobalComponents/Customalert';
import { ThemeContext } from '../Globals/ThemeContext';
import * as SecureStore from 'expo-secure-store';

const ProfileScreen = ({ navigation }) => {
    const [alertVisible, setAlertVisible] = useState(false);
    const { textColor, userDetails } = useContext(ThemeContext);

    const handleLogout = async () => {
        try {
            await SecureStore.deleteItemAsync('token');
            await SecureStore.deleteItemAsync('id');
            navigation.navigate("Login");
            console.log("Sign out");
            setAlertVisible(false);
        } catch (error) {
            console.log("Error logging out: ", error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: textColor }]}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Profile</Text>
            </View>
            <View style={styles.userInfoContainer}>
                <Image source={require('../assets/Images/icon.png')} style={styles.image} />
                <Text style={styles.userName}>{userDetails.userName}</Text>
                <Text style={styles.userEmail}>{userDetails.mail}</Text>
            </View>
            <View style={styles.iconHolder}>
                <ProfileButton title="Add Business" Icon="MaterialIcons" IconName="add-business" handleProfileButton={() => navigation.navigate("AddBusiness")} />
                <ProfileButton title="My Business" Icon="Ionicons" IconName="business" handleProfileButton={() => navigation.navigate("MyBusiness")} />
                <ProfileButton title="Share App" Icon="MaterialIcons" IconName="share" />
                <ProfileButton title="Logout" Icon="MaterialIcons" IconName="logout" handleProfileButton={() => setAlertVisible(true)} />
            </View>
            <View style={styles.footer}>
                <Text>Developed by Mohd Ahtesham © 2024</Text>
            </View>
            <CustomNotification
                visible={alertVisible}
                message={"Signing out"}
                onClose={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    headerContainer: {
        width: '100%',
        padding: 20,
        marginBottom: 20,
    },
    header: {
        fontSize: 30,
        fontFamily: 'Outfit-bold',
    },
    userInfoContainer: {
        alignItems: 'center',
        gap: 3,
        marginBottom: 20,
    },
    userName: {
        fontFamily: 'Outfit-bold',
        fontSize: 18,
        marginTop: 5,
    },
    userEmail: {
        fontFamily: 'Outfit',
        fontSize: 16,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    iconHolder: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
        padding: 10,
        columnGap: 10,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        textAlign: 'center',
        fontFamily: 'Outfit-bold',
    },
});

export default ProfileScreen;
