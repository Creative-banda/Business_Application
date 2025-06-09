import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ThemeContext } from '../Globals/ThemeContext.js'
import Category from '../GlobalComponents/Category.js'

const CategorySlider = ({ navigation }) => {
    const { themeColor } = useContext(ThemeContext);

<<<<<<< HEAD
    const CategorySelected = (category) => {
        console.log(category);
        
=======
    const CategorySelected = (category) => {        
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
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
<<<<<<< HEAD
=======
        paddingHorizontal: 12,
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
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