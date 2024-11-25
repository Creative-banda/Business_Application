import React from 'react';
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity, Linking, TouchableWithoutFeedback } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { ThemeContext } from '../Globals/ThemeContext';

const MyBusiness = ({ navigation }) => {
    const [data, setData] = React.useState([]);
    const isFocused = useIsFocused();
    const { userDetails } = React.useContext(ThemeContext);
    React.useEffect(() => {
        fetchBusinesses();
    }, [isFocused]);

    const fetchBusinesses = async () => {
        console.log("fetching");
        
        const business = userDetails.userShop;
        setData(business);

    }
    
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
        let isenable = !item.website;
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Business_Info", { item: item, Owner: "Mine" })}>
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
                        <Text style={styles.rating}>Rating: {item.currentrating}</Text>
                    </View>

                    {/* Website Button */}
                    <TouchableOpacity style={isenable ? styles.disble : styles.websiteButton} onPress={() => openWebsite(item.website)} disabled={isenable}>
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
            <FlatList
                data={data}
                keyExtractor={(item) => item.shopName}
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
        backgroundColor: '#f8f9fa',
        padding: 15,
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 22,
        fontFamily: 'Outfit-Bold',
        color: '#2d3436',
        textAlign: 'center',
    },
    flatListEmpty: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    disble : {
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
});

export default MyBusiness;
