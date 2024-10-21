import React from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity, Linking } from 'react-native';

const MyBusiness = ({ route }) => {
    const [data, setData] = React.useState([]);
    const { email } = route.params;

    React.useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        const userEmail = email.replace(/\./g, '_');
        
        try {
            let SearchScreenData = ref(database, `Users/${userEmail}`);
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

    const openWebsite = (websiteUrl) => {
        if (websiteUrl) {
    
          Linking.openURL(websiteUrl).catch((err) =>
            console.error('Failed to open URL:', err)
          );
        }
        else {
          alert("Website Error", "No Website Found")
        }
      };


    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                {/* Image */}
                <Image source={{ uri: item.image }} style={styles.image} />

                {/* Business Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.category}>{item.category}</Text>
                    <Text style={styles.about}>{item.about}</Text>
                    <Text style={styles.address}>{item.address}</Text>
                    <Text style={styles.contact}>Contact: {item.contact}</Text>
                    <Text style={styles.rating}>Rating: {item.rating ? item.rating : "Not Rating"}</Text>
                </View>

                {/* Website Button */}
                <TouchableOpacity style={styles.websiteButton} onPress={()=>openWebsite(item.website)}>
                    <Text style={styles.websiteButtonText}>Visit Website</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const emptyListComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No businesses found 😕</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={emptyListComponent}
                contentContainerStyle={data.length === 0 ? styles.flatListEmpty : null}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    infoContainer: {
        padding: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    category: {
        fontSize: 14,
        fontWeight: '600',
        color: '#888',
        marginTop: 5,
        marginBottom: 5,
    },
    about: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    address: {
        fontSize: 13,
        color: '#666',
        marginBottom: 5,
    },
    contact: {
        fontSize: 13,
        color: '#666',
    },
    rating: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
        marginTop: 10,
    },
    websiteButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    websiteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    // Styles for the empty state
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 20,
        fontFamily : 'Outfit-bold',
        color: '#333',
    },
    flatListEmpty: {
        flexGrow: 1, 
        justifyContent: 'center',
    },
});

export default MyBusiness;
