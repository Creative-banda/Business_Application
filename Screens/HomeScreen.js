import React, { useState, useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import HeaderContainer from '../HomeComponents/HeaderContainer';
import Slider from '../HomeComponents/Slider';
import CategorySlider from '../HomeComponents/CategorySlider';
import BusinessSlider from '../HomeComponents/BusinessSlider';
import { ThemeContext } from '../Globals/ThemeContext';

const HomeScreen = ({ navigation }) => {
    const { textColor, userDetails } = useContext(ThemeContext);
    const [Search, Setsearch] = useState('');
    console.log(userDetails);
    
    return (
        <ScrollView style={[styles.container, { backgroundColor: textColor }]}>
            <HeaderContainer
                Search={Search}
                onChangeText={Setsearch}
                navigation={navigation}
                Username={userDetails?.userName}
                mail={userDetails?.email}
            />
            <View style={styles.sliderHolder}>
                <Slider navigation={navigation} />
                <CategorySlider navigation={navigation} />
                <BusinessSlider navigation={navigation} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sliderHolder: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 20,
    }
});

export default HomeScreen;
