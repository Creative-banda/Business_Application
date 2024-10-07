import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import ProfileButton from '../SearchScreenComponents/ProfileButton';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Profile</Text>
            </View>
            <View style={styles.userInfoContainer}>
                <Image source={require('../assets/Images/icon.png')} style={styles.image} />
                <Text style={styles.userName}>Game Play</Text>
                <Text style={styles.userEmail}>gameplayapp007@gmail.com</Text>
            </View>
            <View style={styles.iconHolder}>
                <ProfileButton title="Add Business" Icon="MaterialIcons" IconName="add-business" bgColor="#FFD8C5" />
                <ProfileButton title="My Business" Icon="Ionicons" IconName="business" bgColor="#E4C7FF" />
                <ProfileButton title="Share App" Icon="MaterialIcons" IconName="share" bgColor="#FFD8C5" />
                <ProfileButton title="Logout" Icon="MaterialIcons" IconName="logout" bgColor="#E4C7FF" />
            </View>
            <View style={styles.footer}>
                <Text>Developed by Mohd Ahtesham © 2024</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
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
    },
});

export default ProfileScreen;
