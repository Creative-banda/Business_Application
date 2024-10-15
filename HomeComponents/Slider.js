import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { database } from '../firebaseConfig';
import { ref, get } from 'firebase/database';

// Get screen width to adjust image size dynamically
const screenWidth = Dimensions.get('window').width;

const Slider = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        initializingUsers()
    }, [])

    const initializingUsers = async () => {
        try {
            let SearchScreenData = ref(database, 'Slider');
            const snapshot = await get(SearchScreenData);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const formattedData = Object.values(userData);
                setData(formattedData);

            } else {
                console.log('No data available');
            }
        } catch (err) {
            console.log('Error:', err);
        }
    };

    const renderItem = ({item}) => {
        
        return (
            <View style={styles.sliderItem}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
        )
    }



    return (
        <View style={styles.container}>
            <Text style={[styles.specialText, { color: '#000' }]}> #Special for you</Text>
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