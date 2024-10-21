import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ThemeContext } from '../Globals/ThemeContext.js'
import Category from '../GlobalComponents/Category.js'

const CategorySlider = ({ navigation }) => {
    const { themeColor } = useContext(ThemeContext);

    const CategorySelected = (category) => {
        console.log(category);
        
        navigation.navigate('CateGorySelection',{Category :  category});
    }

    return (
        <View style={styles.container}>
            <View style={styles.categoryHolder}>
                <Text style={[styles.topText, {color : '#000'}]}>Category</Text>
                <TouchableOpacity>
                    <Text style={{ color: '#000', fontFamily: 'Outfit-bold' }}>See all</Text>
                </TouchableOpacity>

            </View>
                <Category color={themeColor} handleCategory={CategorySelected}/>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    categoryHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    topText: {
        fontFamily: 'Outfit-bold',
        fontSize: 20,
        marginBottom: 10,
    },
})

export default CategorySlider