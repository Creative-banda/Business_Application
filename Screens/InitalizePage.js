import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../Globals/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InitalizePage = ({ navigation }) => {
    const { themeColor } = useContext(ThemeContext);

    const handleClick = async () => {
        try {
            await AsyncStorage.setItem('hasOpenedBefore', 'true');
            navigation.navigate("Login");
        } catch (error) {
            console.log('Failed to save to AsyncStorage', error);
        }
    };



    return (
        <View style={styles.container}>
            <Image source={require('../assets/Images/Home.png')} style={styles.TopImage} />
            <View style={styles.TextContainer}>
                <Text style={styles.Text}>
                    Your Ultimate <Text style={[styles.Text, { color: themeColor }]}>
                        Community Business Directory
                    </Text> App
                </Text>

                <Text style={[styles.BottomText, { color: '#000' }]}>
                    Find your favorite business near your and post your own business to your community
                </Text>
                <TouchableOpacity style={[styles.button, { backgroundColor: themeColor }]} onPress={handleClick}>
                    <Text style={styles.buttonText}>
                        Let's Get Started
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: { flex: 1, alignItems: 'center', paddingVertical: 30 },

    TopImage: { resizeMode: 'contain', height: 500, width: '100%', },

    TextContainer: { flex: 1, alignItems: 'center', paddingHorizontal: 15, paddingVertical: 20, width: '100%' },

    Text: { fontSize: 30, rowGap: 10, textAlign: 'center', fontFamily: 'Outfit-bold', },

    BottomText: { textAlign: 'center', marginTop: 30, marginHorizontal: 20, fontFamily: 'Outfit', fontWeight: '600' },

    button: { marginTop: 30, paddingVertical: 12, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 20 },

    buttonText: { color: '#fff', fontFamily: 'Outfit-bold' }
})

export default InitalizePage;
