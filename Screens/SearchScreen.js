import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import InputText from '../GlobalComponents/InputText';
import Category from '../GlobalComponents/Category';
import { ThemeContext } from '../Globals/ThemeContext';
import ItemCard from '../SearchComponents/ItemCard';
import { database } from '../firebaseConfig';
import { ref, get } from 'firebase/database';

const SearchScreen = ({navigation}) => {

    const [filterData, setFilteredData] = useState(data);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [data, setData] = useState([]);


    const initializingUsers = async () => {
        try {
            let userDataRef = ref(database, 'All_Business');
            const snapshot = await get(userDataRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const formattedData = Object.values(userData);
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
            setFilteredData(data);
        }
    }, [selectedCategory]);
    

    const [Search, setSearch] = useState('');
    const { themeColor, textColor } = useContext(ThemeContext);

    const handleSearch = (value)=>{
        setSearch(value)
        const SearchData = data.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.category.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(SearchData)
    }

    return (
        <View style={[styles.container, {backgroundColor : textColor}]}>
            <Text style={[styles.header, {color : '#000'}]}>
                Explore More
            </Text>

            {/* Input for searching services */}
            <InputText
                placeholder='Search for services..'
                value={Search}
                onChangeText={(value)=>{handleSearch(value)}}
            />

            {/* Category selector */}
            <Category color={themeColor} handleCategory={setSelectedCategory} />

            {/* Filtered Item List */}
            <ItemCard STORES_DATA={filterData} navigation={navigation}/>

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
