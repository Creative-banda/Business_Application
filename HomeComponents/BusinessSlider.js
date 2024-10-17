
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { ThemeContext } from '../Globals/ThemeContext';
import { database } from '../firebaseConfig';
import { ref, get } from 'firebase/database';

// Get screen width to adjust image size dynamically
const screenWidth = Dimensions.get('window').width;


const BusinessSlider = ({ navigation }) => {
    const { textColor } = useContext(ThemeContext)
    const [businessData, setBusinessData] = useState([])


    useEffect(() => {
        initializingUsers()
    }, [])

    const initializingUsers = async () => {
        try {
            let SearchScreenData = ref(database, 'All_Business');
            const snapshot = await get(SearchScreenData);
    
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const formattedData = Object.values(userData);
    
                // Sort by rating (assuming higher rating is better)
                const sortedData = formattedData.sort((a, b) => b.rating - a.rating);
    
                // Select the top 4 businesses based on rating
                const selectedData = sortedData.slice(0, 4);
                
                // Set the top 4 businesses to state
                setBusinessData(selectedData);
            } else {
                console.log('No data available');
            }
        } catch (err) {
            console.log('Error:', err);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Business_Info", { item: item })}>
                <View style={[styles.sliderItem, { backgroundColor: textColor }]} >
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <Text style={styles.BusinessName}>
                        {item.name}
                    </Text>
                    <Text style={{ fontFamily: 'Outfit', fontSize: 16, paddingLeft: 10 }}>{item.address}</Text>
                    <View style={styles.businessInfo}>
                        <Text style={{ fontFamily: 'Outfit-bold', fontSize: 16 }}>{item.rating}</Text>
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