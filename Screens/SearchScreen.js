import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import InputText from '../GlobalComponents/InputText';
import Category from '../GlobalComponents/Category';
import { ThemeContext } from '../Globals/ThemeContext';
import ItemCard from '../SearchComponents/ItemCard';
import { database } from '../firebaseConfig';
import { ref, get } from 'firebase/database';

const SearchScreen = () => {

    const [filterData, setFilteredData] = useState(data);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [data, setData] = useState([]);


    const initializingUsers = async () => {
        try {
            let userDataRef = ref(database, 'Search');
            const snapshot = await get(userDataRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const formattedData = Object.values(userData);  // Convert object to array for FlatList
                setData(formattedData);
                setFilteredData(formattedData)
                
                
            } else {
                console.log('No data available');
            }
        } catch (err) {
            console.log('Error:', err); 
        }
    };
    useEffect(()=>{
        initializingUsers()
    },[])

    useEffect(() => {
        if (selectedCategory) {
            const filteredData = data.filter(store => store.category === selectedCategory);
            setFilteredData(filteredData);
        } else {
            // Reset to all data when no category is selected
            setFilteredData(data);
        }
    }, [selectedCategory]);
    

    const [Search, setSearch] = useState('');
    const { themeColor, textColor } = useContext(ThemeContext);

    return (
        <View style={[styles.container, {backgroundColor : textColor}]}>
            <Text style={[styles.header, {color : '#000'}]}>
                Explore More
            </Text>

            {/* Input for searching services */}
            <InputText
                placeholder='Search for services..'
                value={Search}
                onChangeText={setSearch}
            />

            {/* Category selector */}
            <Category color={themeColor} handleCategory={setSelectedCategory} />

            {/* Filtered Item List */}
            <ItemCard STORES_DATA={filterData} />

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
        marginTop: 20
    }
});

export default SearchScreen;
