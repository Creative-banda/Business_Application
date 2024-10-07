import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const DATA = [
    {
        id: '1',
        image: 'https://via.placeholder.com/300',
        address: '1234 Main St, City, State, 12345',
        rating: 4.5,
        name: 'Business Name 1'
    },
    {
        id: '2',
        image: 'https://via.placeholder.com/300',
        address: '5678 Oak Ave, City, State, 54321',
        rating: 4.2,
        name: 'Business Name 2'
    },
    {
        id: '3',
        image: 'https://via.placeholder.com/300',
        address: '91011 Pine St, City, State, 67890',
        rating: 4.8,
        name: 'Business Name 3'
    },
    {
        id: '4',
        image: 'https://via.placeholder.com/300',
        address: '1213 Maple Dr, City, State, 98765',
        rating: 4.0,
        name: 'Business Name 4'
    },
    {
        id: '5',
        image: 'https://via.placeholder.com/300',
        address: '1415 Cedar Blvd, City, State, 87654',
        rating: 3.9,
        name: 'Business Name 5'
    },
    {
        id: '6',
        image: 'https://via.placeholder.com/300',
        address: '1617 Birch Ln, City, State, 76543',
        rating: 4.7,
        name: 'Business Name 6'
    },
    {
        id: '7',
        image: 'https://via.placeholder.com/300',
        address: '1819 Elm St, City, State, 65432',
        rating: 4.1,
        name: 'Business Name 7'
    },
    {
        id: '8',
        image: 'https://via.placeholder.com/300',
        address: '2021 Ash Cir, City, State, 54321',
        rating: 4.9,
        name: 'Business Name 8'
    },
    {
        id: '9',
        image: 'https://via.placeholder.com/300',
        address: '2223 Poplar Rd, City, State, 43210',
        rating: 4.3,
        name: 'Business Name 9'
    },
    {
        id: '10',
        image: 'https://via.placeholder.com/300',
        address: '2425 Fir St, City, State, 32109',
        rating: 4.6,
        name: 'Business Name 10'
    }
];


// Get screen width to adjust image size dynamically
const screenWidth = Dimensions.get('window').width;

const renderItem = ({ item }) => {
    return (
        <View style={styles.sliderItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.BusinessName}>
                {item.name}
            </Text>
            <Text style={{ fontFamily: 'Outfit', fontSize: 16, paddingLeft:10 }}>{item.address}</Text>
            <View style={styles.businessInfo}>
                <Text style={{ fontFamily: 'Outfit-bold', fontSize: 16 }}>{item.rating}</Text>
                <Icon name="star" color='#FFD700' size={24} />
            </View>
        </View>
    );
};

const BusinessSlider = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.specialText}> Popular Business</Text>
            <FlatList
                data={DATA}
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
        alignItems: 'flex-start',
        marginBottom: 30,
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
    BusinessName: {
        fontFamily: 'Outfit-bold',
        fontSize: 20,
        marginTop: 10,
         paddingLeft:10
        
    },
    businessInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        gap: 5,
        paddingLeft:10,
        paddingBottom: 10,
    }
});

export default BusinessSlider;
