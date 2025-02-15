
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { ThemeContext } from '../Globals/ThemeContext';
import { BASE_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

// Get screen width to adjust image size dynamically
const screenWidth = Dimensions.get('window').width;


const BusinessSlider = ({ navigation }) => {
    const { textColor, token } = useContext(ThemeContext)
    const [businessData, setBusinessData] = useState([])
    const isFocused = useIsFocused();


    useEffect(() => {
        if (isFocused) {
            initShop()
        }
    }, [token, isFocused])

    const initShop = async () => {        
        if (!token) { return }
        try {
            
            const response = await axios.get(`${BASE_URL}/business`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status !== 200) {
                console.error(`Error from Business Slider: ${response.status} ${response.statusText}`);
                return;
            }
            const data = response.data;
            if (data.message) {
                setBusinessData(data.message);
            }
        } catch (err) {
            console.error('Error From Business Slider:', err);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Business_Info", { item: item })}>
                <View style={[styles.sliderItem, { backgroundColor: textColor }]} >
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <Text style={styles.BusinessName}>
                        {item.shopName}
                    </Text>
                    <Text style={{ fontFamily: 'Outfit', fontSize: 16, paddingLeft: 10 }}>{item.address}</Text>
                    <View style={styles.businessInfo}>
                        <Text style={{ fontFamily: 'Outfit-bold', fontSize: 16 }}>{item.currentrating}</Text>
                        <Icon name="star" color='#FFD700' size={24} />
                    </View>
                </View>
            </TouchableWithoutFeedback >
        );
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.specialText, { color: '#000' }]}> Popular Business</Text>
            <FlatList
                data={businessData}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item._id}
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
        width: screenWidth * 0.9,
        marginHorizontal : screenWidth * 0.05,
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
        paddingLeft: 10

    },
    businessInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        gap: 5,
        paddingLeft: 10,
        paddingBottom: 10,
    }
});

export default BusinessSlider;