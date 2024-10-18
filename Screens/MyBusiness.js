import React from 'react';
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity } from 'react-native';

DATA = [
    {
        "about": "Your neighborhood source for fresh, locally-sourced produce and organic groceries.",
        "address": "123 Produce Lane, Greenville, CA 95366",
        "category": "Grocery",
        "contact": "+1 209 555 7890",
        "id": "1",
        "image": "https://img.freepik.com/free-psd/fresh-supermarket-template-design_23-2149623225.jpg",
        "name": "Fresh Harvest Market",
        "website": "https://www.freshharvestmarket.com",
        "rating": "4.3"
    },
    {
        "about": "Transform your look with our expert stylists and premium beauty treatments.",
        "address": "456 Beauty Blvd, Styletown, NY 10001",
        "category": "Salon",
        "contact": "+1 212 555 1234",
        "id": "2",
        "image": "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/hair-salon-ad-design-template-e09078229ac083907344e058c6b3c573_screen.jpg?ts=1652130974",
        "name": "Glamour Glow Salon",
        "website": "",
        "rating": "4.9"
    },
    {
        "about": "Experience culinary excellence with our innovative menu and cozy atmosphere.",
        "address": "789 Flavor Street, Tastyville, IL 60601",
        "category": "Restaurant",
        "contact": "+1 312 555 9876",
        "id": "3",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
        "name": "Gourmet Delights Restaurant",
        "website": "https://www.gourmetdelightschi.com",
        "rating": "3.3"
    },
    {
        "about": "Fast, reliable plumbing services for all your home and business needs.",
        "address": "101 Pipe Drive, Flushington, TX 75001",
        "category": "Plumber",
        "contact": "+1 214 555 4321",
        "id": "4",
        "image": "https://images.unsplash.com/photo-1518600506278-4e8ef466b810",
        "name": "Rapid Repairs Plumbing",
        "website": "",
        "rating": "4.1"
    }
]

const MyBusiness = ({ email }) => {

    const initData = async () => {
        try {
            let SearchScreenData = ref(database, `Users/${email}`);
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
                    <Text style={styles.rating}>Rating: {item.rating}</Text>
                </View>

                {/* Website Button */}
                <TouchableOpacity style={styles.websiteButton}>
                    <Text style={styles.websiteButtonText}>Visit Website</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
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
});

export default MyBusiness;