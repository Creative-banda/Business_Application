import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import ProfileButton from '../ProfileComponents/ProfileButton';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth'; 
import CustomNotification from '../GlobalComponents/Customalert';

const ProfileScreen = ({ navigation ,route }) => {
    const [alertVisible, setAlertVisible] = useState(false);
    const { userDetails } = route.params;

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.navigate("Login");
            console.log("Sign out");
            setAlertVisible(false);


        } catch (error) {
            console.log("Error logging out: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Profile</Text>
            </View>
            <View style={styles.userInfoContainer}>
                <Image source={require('../assets/Images/icon.png')} style={styles.image} />
                <Text style={styles.userName}>{userDetails.name}</Text>
                <Text style={styles.userEmail}>{userDetails.email}</Text>
            </View>
            <View style={styles.iconHolder}>
                <ProfileButton title="Add Business" Icon="MaterialIcons" IconName="add-business" bgColor="#FFD8C5" handleProfileButton={() => navigation.navigate("AddBusiness")} />
                <ProfileButton title="My Business" Icon="Ionicons" IconName="business" bgColor="#E4C7FF" handleProfileButton={()=>navigation.navigate("MyBusiness", {email : userDetails.email})}/>
                <ProfileButton title="Share App" Icon="MaterialIcons" IconName="share" bgColor="#FFD8C5" />
                <ProfileButton title="Logout" Icon="MaterialIcons" IconName="logout" bgColor="#E4C7FF" handleProfileButton={() => setAlertVisible(true)}/>
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
        fontFamily : 'Outfit-bold',
    },
});

export default ProfileScreen;
