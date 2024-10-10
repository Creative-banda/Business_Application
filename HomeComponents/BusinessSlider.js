import React, {useContext} from 'react';
import { StyleSheet, View, Text, FlatList, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { ThemeContext } from '../Globals/ThemeContext';

const DATA = [
    {
        id: '1',
        image: 'https://images.unsplash.com/photo-1562564055-71e051d33c19',
        address: '1234 Main St, City, State, 12345',
        rating: 4.5,
        name: 'Business Name 1'
    },
    {
        id: '2',
        image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df',
        address: '5678 Oak Ave, City, State, 54321',
        rating: 4.2,
        name: 'Business Name 2'
    },
    {
        id: '3',
        image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea0',
        address: '91011 Pine St, City, State, 67890',
        rating: 4.8,
        name: 'Business Name 3'
    },
    {
        id: '4',
        image: 'https://images.unsplash.com/photo-1556761175-129418cb2dfe',
        address: '1213 Maple Dr, City, State, 98765',
        rating: 4.0,
        name: 'Business Name 4'
    },
    {
        id: '5',
        image: 'https://images.unsplash.com/photo-1542744095-291d1f67b221',
        address: '1415 Cedar Blvd, City, State, 87654',
        rating: 3.9,
        name: 'Business Name 5'
    },
    {
        id: '6',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        address: '1617 Birch Ln, City, State, 76543',
        rating: 4.7,
        name: 'Business Name 6'
    },
    {
        id: '7',
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
        address: '1819 Elm St, City, State, 65432',
        rating: 4.1,
        name: 'Business Name 7'
    },
    {
        id: '8',
        image: 'https://images.unsplash.com/photo-1589571894960-20bbe2828a47',
        address: '2021 Ash Cir, City, State, 54321',
        rating: 4.9,
        name: 'Business Name 8'
    },
    {
        id: '9',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
        address: '2223 Poplar Rd, City, State, 43210',
        rating: 4.3,
        name: 'Business Name 9'
    },
    {
        id: '10',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
        address: '2425 Fir St, City, State, 32109',
        rating: 4.6,
        name: 'Business Name 10'
    }
];

// Get screen width to adjust image size dynamically
const screenWidth = Dimensions.get('window').width;


const BusinessSlider = () => {
    const {themeColor, textColor} = useContext(ThemeContext)


    const renderItem = ({ item }) => {
        return (
            <View style={[styles.sliderItem, {backgroundColor : textColor}]}>
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

    return (
        <View style={styles.container}>
            <Text style={[styles.specialText, {color : themeColor}]}> Popular Business</Text>
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