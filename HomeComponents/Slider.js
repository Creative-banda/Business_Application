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
                <View style={styles.sliderItem}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                </View>
            </TouchableWithoutFeedback>
        )
    }
    
    return (
        <View style={styles.container}>
            <Text style={[styles.specialText, { color: '#000' }]}>Shops at Your Fingertips</Text>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
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
    },
    sliderItem: {
        width: screenWidth * 0.85,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
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