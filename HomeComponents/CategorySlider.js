import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ThemeContext } from '../Globals/ThemeContext.js'
import Category from '../GlobalComponents/Category.js'

const CategorySlider = () => {
    const { themeColor } = useContext(ThemeContext);

    return (
        <View style={styles.container}>
            <View style={styles.categoryHolder}>
                <Text style={[styles.topText, {color : themeColor}]}>Category</Text>
                <TouchableOpacity>
                    <Text style={{ color: themeColor, fontFamily: 'Outfit-bold' }}>See all</Text>
                </TouchableOpacity>

            </View>
                <Category color={themeColor}/>
            
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