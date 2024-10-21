import ThreeDot from './ThreeDot';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import React, { useContext, useState } from 'react';
import InputText from '../GlobalComponents/InputText';
import { ThemeContext } from '../Globals/ThemeContext';
import CustomNotification from '../GlobalComponents/Customalert';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

const HeaderContainer = ({ Search, onChangeText, navigation, Username, mail }) => {
    const { themeColor, textColor } = useContext(ThemeContext);
    const [isVisible, setIsVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    const handleTheme = () => {
        if (isVisible) {
            setIsVisible(!isVisible);
        }
        navigation.navigate('ThemeScreen');
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.navigate("Login")
            console.log("Sign out");
            setAlertVisible(false);


        } catch (error) {
            console.log("Error logging out: ", error);
        }
    };
    

    return (
        <TouchableWithoutFeedback onPress={() => { if (isVisible) { setIsVisible(!isVisible) } }}>
            <View style={[styles.UpperHolder, { backgroundColor: themeColor }]}>
                <View style={{ flexDirection: 'row', gap: 15, width: '100%', paddingVertical: 15 }}>
                    <Image source={require('../assets/Images/icon.png')} style={styles.image} />
                    <View>
                        <Text style={[styles.welcomeText, { color: textColor }]}>Welcome,</Text>
                        <Text style={[styles.userName, { color: textColor }]}>{Username}</Text>
                    </View>
                    <ThreeDot handleTheme={handleTheme} isVisible={isVisible} handlePress={() => setIsVisible(!isVisible)} handleLogout={handleLogout} handlefeedback={()=>{navigation.navigate('Feedback', {mail : mail}); setIsVisible(false)}}/>
                </View>
                <InputText
                    placeholder="Search ..."
                    value={Search}
                    onChangeText={onChangeText}
                />
                <CustomNotification
                    visible={alertVisible}
                    message={"Signing out"}
                    onClose={handleLogout} />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    UpperHolder: {
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 40,
    },
    welcomeText: {
        fontFamily: 'Outfit',
    },
    userName: {
        fontFamily: 'Outfit',
        fontSize: 20,
    },
});

export default HeaderContainer;
