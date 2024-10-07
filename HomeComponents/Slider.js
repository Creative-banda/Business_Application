import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, Dimensions } from 'react-native';

const DATA = [
    {
        id: '1',
        image: 'https://via.placeholder.com/300', // Replace with your image URL or local image
    },
    {
        id: '2',
        image: 'https://via.placeholder.com/300',
    },
    {
        id: '3',
        image: 'https://via.placeholder.com/300',
    },
];

// Get screen width to adjust image size dynamically
const screenWidth = Dimensions.get('window').width;

const Slider = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.specialText}> #Special for you</Text>
            <FlatList
                data={DATA}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.sliderItem}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                    </View>
                )}
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
        elevation: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,

    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
});

export default Slider