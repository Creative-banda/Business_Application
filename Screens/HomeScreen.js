import React, { useState, useContext} from 'react';
import { StyleSheet, View, ScrollView, RefreshControl,StatusBar } from 'react-native';
import HeaderContainer from '../HomeComponents/HeaderContainer';
import Slider from '../HomeComponents/Slider';
import CategorySlider from '../HomeComponents/CategorySlider';
import BusinessSlider from '../HomeComponents/BusinessSlider';
import { ThemeContext } from '../Globals/ThemeContext';

const HomeScreen = ({navigation}) => {
    const [Search, Setsearch] = useState('');
    const {textColor} = useContext(ThemeContext)
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);

    return (
        <ScrollView style={[styles.container, {backgroundColor : textColor}]}refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            <HeaderContainer
            Search={Search}
            onChangeText={Setsearch}
            navigation={navigation}
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
