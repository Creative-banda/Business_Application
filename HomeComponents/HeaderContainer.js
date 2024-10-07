import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import InputText from '../GlobalComponents/InputText';
import { ThemeContext } from '../Globals/ThemeContext';
import ThreeDot from './ThreeDot';

const HeaderContainer = ({ Search, onChangeText, navigation }) => {
    const { themeColor } = useContext(ThemeContext);
    const [isVisible, setIsVisible] = useState(false);

    const handleTheme = () => {
        if (isVisible) {
            setIsVisible(!isVisible);
        }
        navigation.navigate('ThemeScreen');
    };

    const handlePress = () => {
        setIsVisible(!isVisible);
    };

    return (
        <TouchableWithoutFeedback onPress={()=>{if(isVisible){setIsVisible(!isVisible)}}}>
            <View style={[styles.UpperHolder, { backgroundColor: themeColor }]}>
                <View style={{ flexDirection: 'row', gap: 15, width: '100%', paddingVertical: 15 }}>
                    <Image source={require('../assets/Images/icon.png')} style={styles.image} />
                    <View>
                        <Text style={styles.welcomeText}>Welcome,</Text>
                        <Text style={styles.userName}>UserName</Text>
                    </View>
                    <ThreeDot handleTheme={handleTheme} isVisible={isVisible} handlePress={handlePress} />
                </View>
                <InputText
                    placeholder="Search ..."
                    value={Search}
                    onChangeText={onChangeText}
                />
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
        color: '#fff',
    },
    userName: {
        fontFamily: 'Outfit',
        fontSize: 20,
        color: '#fff',
    },
});

export default HeaderContainer;
