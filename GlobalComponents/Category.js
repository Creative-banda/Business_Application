import React, {useContext} from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import Gloserry from '../assets/SVG/Gloserry.js'
import ShoppingCart from '../assets/SVG/ShoppingCart.js'
import PlumberIcon from '../assets/SVG/Plumber.js'
import Restaurant from '../assets/SVG/Restaurant.js'
import SalonIcon from '../assets/SVG/Salon.js'
import { ThemeContext } from '../Globals/ThemeContext.js'


const Category = ({ color, handleCategory }) => {
    const {themeColor} = useContext(ThemeContext)

    DATA = [
        {
            id: '1',
            Icon: <Gloserry color={color} />,
            title: 'Grocery',
        },
        {
            id: '2',
            title: 'Shopping',
            Icon: <ShoppingCart color={color} />,
        },
        {
            id: '3',
            title: 'Plumber',
            Icon: <PlumberIcon color={color} />,
        },
        {
            id: '4',
            title: 'Salon',
            Icon: <SalonIcon color={color} />,
        },
        {
            id: '5',
            title: 'Restaurant',
            Icon: <Restaurant color={color} />,
        },
    ]

    return (
        <View>
            <FlatList
                data={DATA}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=>{handleCategory && handleCategory(item.title)}}>

                        <View style={styles.listContainer}>
                            <View style={styles.IconButton} >
                                {item.Icon}
                            </View>
                            <Text style={[styles.iconText, {color: themeColor}]}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    specialText: {
        fontSize: 20,
        fontFamily: 'Outfit-bold',
        marginTop: 14,
        marginBottom: 7,
    },
    sliderItem: {
        width: '90%',
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    text: {
        fontFamily: 'Outfit',
        fontSize: 16,
        marginTop: 10,
    },
    listContainer: {
        alignItems: 'center',
        margin: 10,
        marginRight: 15,
    },
    IconButton: {
        backgroundColor: 'rgba(103, 63, 210, 0.1)',
        padding: 10,
        borderRadius: 50
    },
    iconText: {
        fontFamily: 'Outfit',
        fontSize: 14,
        marginTop: 7,
    },
})

export default Category