import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import InputText from '../GlobalComponents/InputText';
import Category from '../GlobalComponents/Category';
import { ThemeContext } from '../Globals/ThemeContext';
import ItemCard from '../SearchComponents/ItemCard';

const SearchScreen = () => {

    const data = [
        {
            id: '1',
            name: 'Fresh Mart Grocery',
            image: 'https://via.placeholder.com/300x200.png?text=Fresh+Mart+Grocery',
            address: '1234 Green Ave, Citytown, ST 12345',
            category: 'Grocery'
        },
        {
            id: '2',
            name: 'Quick Fix Plumbing',
            image: 'https://via.placeholder.com/300x200.png?text=Quick+Fix+Plumbing',
            address: '4567 Water St, Flowcity, ST 67890',
            category: 'Plumber'
        },
        {
            id: '3',
            name: 'Style Studio Salon',
            image: 'https://via.placeholder.com/300x200.png?text=Style+Studio+Salon',
            address: '8901 Beauty Blvd, Hairville, ST 54321',
            category: 'Salon'
        },
        {
            id: '4',
            name: 'Dine Fine Restaurant',
            image: 'https://via.placeholder.com/300x200.png?text=Dine+Fine+Restaurant',
            address: '6789 Feast Ave, Dinetown, ST 23456',
            category: 'Restaurant'
        },
        {
            id: '5',
            name: 'Electro Hub Electronics',
            image: 'https://via.placeholder.com/300x200.png?text=Electro+Hub+Electronics',
            address: '2345 Volt Dr, Electric City, ST 98765',
            category: 'Shopping'
        },
        {
            id: '6',
            name: 'Peak Fitness Gym',
            image: 'https://via.placeholder.com/300x200.png?text=Peak+Fitness+Gym',
            address: '3456 Power Ln, Fitcity, ST 13579',
            category: 'Shopping'
        },
        {
            id: '7',
            name: 'Books & Beyond',
            image: 'https://via.placeholder.com/300x200.png?text=Books+%26+Beyond',
            address: '5678 Read St, Literatown, ST 86420',
            category: 'Shopping'
        },
        {
            id: '8',
            name: 'Gadget World',
            image: 'https://via.placeholder.com/300x200.png?text=Gadget+World',
            address: '7890 Tech Blvd, Innoville, ST 24680',
            category: 'Shopping'
        },
        {
            id: '9',
            name: 'Healthy Harvest Organics',
            image: 'https://via.placeholder.com/300x200.png?text=Healthy+Harvest+Organics',
            address: '4321 Fresh Ln, Greenfield, ST 13579',
            category: 'Grocery'
        },
        {
            id: '10',
            name: 'Pet Paradise',
            image: 'https://via.placeholder.com/300x200.png?text=Pet+Paradise',
            address: '5432 Paw Ave, Petville, ST 24680',
            category: 'Shopping'
        },
    ];

    const [filterData, setFilteredData] = useState(data);
    const [selectedCategory, setSelectedCategory] = useState('');

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
    const { themeColor } = useContext(ThemeContext);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
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
        gap: 20
    },
    header: {
        fontSize: 26,
        fontFamily: 'Outfit-bold',
        marginTop: 20
    }
});

export default SearchScreen;
