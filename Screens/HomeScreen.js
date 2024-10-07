import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import HeaderContainer from '../HomeComponents/HeaderContainer';
import Slider from '../HomeComponents/Slider';
import CategorySlider from '../HomeComponents/CategorySlider';
import BusinessSlider from '../HomeComponents/BusinessSlider';

const HomeScreen = () => {
    const [Search, Setsearch] = useState('');

    return (
        <ScrollView style={styles.container}>
            <HeaderContainer
            Search={Search}
            onChangeText={Setsearch}
            />
            <View style={styles.sliderHolder}>
            <Slider />
            <CategorySlider />
            <BusinessSlider />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sliderHolder: {
        flex: 1,
        paddingHorizontal:20,
        paddingVertical:10,
        gap:20,
    }
});

export default HomeScreen;
