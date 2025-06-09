<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import {BASE_URL} from '@env';

// Get screen width to adjust image size dynamically
const screenWidth = Dimensions.get('window').width;

const Slider = ({navigation}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        initializingShops()
    }, [])

    const initializingShops = async () => {
        try {
            const response = await fetch(`${BASE_URL}/businesses`);
            const json = await response.json();
            console.log(json);
            
            if (json.success) {
                setData(json.businesses);
            }
        } catch (err) {
            console.log('Error:', err);
        }
    };
    

    const renderItem = ({ item }) => {

        return (
            <TouchableWithoutFeedback onPress={()=>navigation.navigate("Business_Info", { item: item })}>
=======
import { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, FlatList, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { BASE_URL } from '@env';
import { ThemeContext } from '../Globals/ThemeContext';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;


const Slider = ({ navigation }) => {
    const [data, setData] = useState([]);
    const { token } = useContext(ThemeContext);
    const isFocused = useIsFocused();     

    useEffect(() => {
        if (isFocused) {
            initializingShops();
        }
    }, [isFocused, token]);

    const initializingShops = async () => {
        if (!token) { return }
        try {
            const response = await axios.get(`${BASE_URL}/business`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response) {
                console.error(`Error from Slider: ${response.status} ${response.statusText}`);
                return;
            }
            const data = response.data;           
            console.log("Data from Slider:", data);
            

            if (data.message) {
                setData(data.message);
            }

        } catch (err) {
            console.error('Error:', err);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Business_Info", { item: item })}>
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
                <View style={styles.sliderItem}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                </View>
            </TouchableWithoutFeedback>
        )
    }
<<<<<<< HEAD
    
=======

>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
    return (
        <View style={styles.container}>
            <Text style={[styles.specialText, { color: '#000' }]}>Shops at Your Fingertips</Text>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
<<<<<<< HEAD
                keyExtractor={(item) => item.id}
=======
                keyExtractor={(item) => item._id}
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
                renderItem={renderItem}
                pagingEnabled
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    specialText: {
        fontSize: 20,
        fontFamily: 'Outfit-bold',
        marginTop: 14,
        marginBottom: 7,
<<<<<<< HEAD
    },
    sliderItem: {
        width: screenWidth * 0.85,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
=======
        marginLeft: 20
    },
    sliderItem: {
        width: screenWidth * 0.9,
        marginHorizontal: screenWidth * 0.05,
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        marginVertical: 10

    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        resizeMode: 'stretch'
    },
});

export default Slider