import React from 'react';
import ItemCard from '../SearchComponents/ItemCard';
import { StyleSheet, View, Text, FlatList } from 'react-native';

const CategoryScreen = ({ navigation, route }) => {
    const [data, setData] = React.useState([]);
    const { Category } = route.params;

    React.useEffect(() => {
        initializingUsers();
    }, []);

    const initializingUsers = async () => {
        try {
            let userDataRef = ref(database, 'All_Business');
            const snapshot = await get(userDataRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const formattedData = Object.values(userData);
                const filteredData = formattedData.filter(item => item.category === Category);
                setData(filteredData);
            } else {
                console.log('No data available');
            }
        } catch (err) {
            console.log('Error:', err);
        }
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.title}>Explore {Category}</Text>
            <Text style={styles.subtitle}>Find the best businesses in this category</Text>
        </View>
    );

    const renderItemCard = () => {
        return <ItemCard STORES_DATA={data} navigation={navigation} />;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data} 
                ListHeaderComponent={renderHeader}
                renderItem={renderItemCard}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
                ListEmptyComponent={<Text style={styles.noDataText}>No businesses found in this category.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F7FC',
        paddingHorizontal: 20,
        paddingTop : 20    
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
    flatListContent: {
        paddingBottom: 20,
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
