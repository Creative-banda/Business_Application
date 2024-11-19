import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import InputText from '../GlobalComponents/InputText';
import Category from '../GlobalComponents/Category';
import { ThemeContext } from '../Globals/ThemeContext';
import ItemCard from '../SearchComponents/ItemCard';

const SearchScreen = ({ navigation }) => {

    const [filterData, setFilteredData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const { themeColor, textColor } = useContext(ThemeContext);

    // Listener for real-time updates
    useEffect(() => {
        const userDataRef = ref(database, 'All_Business');
        
        const unsubscribe = onValue(userDataRef, (snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const formattedData = Object.values(userData);
                setData(formattedData);
                setFilteredData(formattedData); // Initially set the filtered data to all data
            } else {
                console.log('No data available');
            }
        }, (error) => {
            console.log('Error:', error);
        });

        // Cleanup the listener when component unmounts
        return () => unsubscribe();
    }, []);

    // Filter data by selected category
    useEffect(() => {
        if (selectedCategory) {
            const filteredData = data.filter(store => store.category === selectedCategory);
            setFilteredData(filteredData);
        } else {
            setFilteredData(data);
        }
    }, [selectedCategory, data]);

    const handleSearch = (value) => {
        setSearch(value);
        const searchData = data.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.category.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(searchData);
    };

    return (
        <View style={[styles.container, { backgroundColor: textColor }]}>
            <Text style={[styles.header, { color: '#000' }]}>
                Explore More
            </Text>

            <InputText
                placeholder='Search for services..'
                value={search}
                onChangeText={(value) => handleSearch(value)}
            />

            <Category color={themeColor} handleCategory={setSelectedCategory} />

            <ItemCard STORES_DATA={filterData} navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        gap: 20,
    },
    header: {
        fontSize: 26,
        fontFamily: 'Outfit-bold',
        marginTop: 20,
    },
});

export default SearchScreen;
