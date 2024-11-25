import React from 'react';
import ItemCard from '../SearchComponents/ItemCard';
import { BASE_URL } from '@env';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const CategoryScreen = ({ navigation, route }) => {
    const [data, setData] = React.useState([]);
    const { Category } = route.params;

    React.useEffect(() => {
        initShop();
    }, []);

    const initShop = async () => {
        try {
            const token = await SecureStore.getItemAsync('token');
            const response = await axios.get(`${BASE_URL}/business/category/${Category}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.data.sucess) {
                const data = response.data.message;
                setData(data);
            }
            else {
                console.log('Error from Category Screen:', response.data.message);
            }
        } catch (error) {
            console.log('Error from Category Screen:', error)
        }

    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Explore {Category}</Text>
                <Text style={styles.subtitle}>Find the best businesses in this category</Text>
            </View>
            <View style={{flex : 1, justifyContent : 'center'}}>
                {data.length != 0 ? <ItemCard STORES_DATA={data} navigation={navigation} /> : <Text style={styles.noDataText}>Sorry, No data Available</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F7FC',
        paddingHorizontal: 20,
        paddingTop: 20
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#4A81AB',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Outfit-bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Outfit',
        color: '#f0f0f0',
        marginTop: 5,
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Outfit-bold',
        color: '#888',
        marginTop: 50,
    },
});

export default CategoryScreen;
