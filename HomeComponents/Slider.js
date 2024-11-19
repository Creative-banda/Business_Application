import { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, FlatList, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { BASE_URL } from '@env';
import { ThemeContext } from '../Globals/ThemeContext';
import axios from 'axios';

// Get screen width to adjust image size dynamically
const screenWidth = Dimensions.get('window').width;

const Slider = ({navigation}) => {

    const [data, setData] = useState([]);
    const {token} = useContext(ThemeContext);

    useEffect(() => {
        initializingShops()
    }, [])

    const initializingShops = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/business`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Check if the response status is OK (status 200-299)
            if (!response.ok) {
                console.error(`Error from Slider: ${response.status} ${response.statusText}`);
                return;
            }
            const data = response.data;

            if (data.data) {
                setData(data.data); 
            }
        } catch (err) {
            console.error('Error:', err);
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