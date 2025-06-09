import React from 'react';
<<<<<<< HEAD
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity, Linking, TouchableWithoutFeedback } from 'react-native';

const MyBusiness = ({ route, navigation }) => {
    const [data, setData] = React.useState([]);
    const { email } = route.params;
    
    React.useEffect(() => {
        // Create a reference to the database node
        const userEmail = email.replace(/\./g, '_');
        const dbRef = ref(database, `Users/${userEmail}`);
        
        // Set up the real-time listener
        onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const formattedData = Object.values(userData);
                setData(formattedData);
            } else {
                console.log('No data available');
                setData([]);
            }
        }, (error) => {
            console.error('Error setting up listener:', error);
        });

        // Cleanup function to remove the listener when component unmounts
        return () => {
            off(dbRef);
        };
    }, []);

=======
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity, Linking, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '@env';
import { ThemeContext } from './../Globals/ThemeContext';

const MyBusiness = ({ navigation }) => {
    const [data, setData] = React.useState([]);
    const { userDetails, themeColor } = React.useContext(ThemeContext);
    const [isLoading, setIsLoading] = React.useState(false);
    const isFocused = useIsFocused();
    React.useEffect(() => {
        fetchBusinesses();
    }, [isFocused]);

    const fetchBusinesses = async () => {        
        try {           
            setIsLoading(true);
            const response = await axios.get(`${BASE_URL}/business/usershop/${userDetails.mail}`, {
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${userDetails.token}`
                },
              });
            if (response.data.sucess) {                
                setData(response.data.message);
            }
        } catch (err) {
            console.log(err);

        }
        finally {
            setIsLoading(false);
        }
    }
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
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
<<<<<<< HEAD
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Business_Info", { item: item, Owner: "Mine", email: email })}>
=======
        let isenable = !item.website;
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Business_Info", { item: item, Owner: "Mine" })}>
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
                <View style={styles.card}>
                    {/* Image */}
                    <Image source={{ uri: item.image }} style={styles.image} />

                    {/* Business Info */}
                    <View style={styles.infoContainer}>
<<<<<<< HEAD
                        <Text style={styles.name}>{item.name}</Text>
=======
                        <Text style={styles.name}>{item.shopName}</Text>
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
                        <Text style={styles.category}>{item.category}</Text>
                        <Text style={styles.about}>{item.about}</Text>
                        <Text style={styles.address}>{item.address}</Text>
                        <Text style={styles.contact}>Contact: {item.contact}</Text>
<<<<<<< HEAD
                        <Text style={styles.rating}>Rating: {item.rating ? item.rating : "Not Rating"}</Text>
                    </View>

                    {/* Website Button */}
                    <TouchableOpacity style={styles.websiteButton} onPress={() => openWebsite(item.website)}>
=======
                        <Text style={styles.rating}>Rating: {item.currentrating}</Text>
                    </View>

                    {/* Website Button */}
                    <TouchableOpacity style={isenable ? styles.disble : styles.websiteButton} onPress={() => openWebsite(item.website)} disabled={isenable}>
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
                        <Text style={styles.websiteButtonText}>Visit Website</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    const emptyListComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No businesses found 😕</Text>
        </View>
    );

    return (
        <View style={styles.container}>
<<<<<<< HEAD
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
=======
            {isLoading ? <ActivityIndicator size='large' color={themeColor}/> : <FlatList
                data={data}
                keyExtractor={(item) => item.shopName}
                renderItem={renderItem}
                ListEmptyComponent={emptyListComponent}
                contentContainerStyle={data.length === 0 ? styles.flatListEmpty : null}
            />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 25,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    infoContainer: {
        padding: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: '800',
        color: '#2d3436',
        marginBottom: 8,
        fontFamily: 'Outfit-Bold',
    },
    category: {
        fontSize: 16,
        fontWeight: '600',
        color: '#00b894',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    about: {
        fontSize: 16,
        color: '#636e72',
        marginBottom: 15,
        lineHeight: 24,
    },
    address: {
        fontSize: 14,
        color: '#636e72',
        marginBottom: 8,
        fontFamily: 'Outfit-Regular',
    },
    contact: {
        fontSize: 14,
        color: '#636e72',
        marginBottom: 8,
        fontFamily: 'Outfit-Regular',
    },
    rating: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fdcb6e',
        marginTop: 8,
    },
    websiteButton: {
        backgroundColor: '#6c5ce7',
        padding: 15,
        margin: 15,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#6c5ce7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    websiteButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
        letterSpacing: 1,
    },
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
<<<<<<< HEAD
    },
    emptyText: {
        fontSize: 20,
        fontFamily: 'Outfit-bold',
        color: '#333',
=======
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 22,
        fontFamily: 'Outfit-Bold',
        color: '#2d3436',
        textAlign: 'center',
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
    },
    flatListEmpty: {
        flexGrow: 1,
        justifyContent: 'center',
    },
<<<<<<< HEAD
=======
    disble: {
        backgroundColor: '#6c5ce7',
        padding: 15,
        margin: 15,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#6c5ce7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
        opacity: 0.5
    }
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
});

export default MyBusiness;
