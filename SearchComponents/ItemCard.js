import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableWithoutFeedback } from 'react-native';

const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

const ItemCard = ({ STORES_DATA, navigation }) => {
    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Business_Info", { item: item })}>
                <View style={styles.sliderItem}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.businessInfo}>
                        <Text style={styles.BusinessName}>{item.shopName}</Text>
                        <Text style={styles.addressText} numberOfLines={1} ellipsizeMode="tail">
                            {truncateText(item.address, 8)}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    return (
        <View style={styles.listContainer}>
            <FlatList
                data={STORES_DATA}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

export default ItemCard;

const styles = StyleSheet.create({
    listContainer: {
        flex: 1, // Flex to make it take full height
    },
    flatListContent: {
        paddingBottom: 20, // Add padding for the last item visibility
    },
    sliderItem: {
        width: '100%',
        marginBottom: 20,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
    },
    image: {
        width: '100%',
        height: 220,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    businessInfo: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // More opacity for readability
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    BusinessName: {
        fontFamily: 'Outfit-bold',
        fontSize: 20,
        marginBottom: 5,
    },
    addressText: {
        fontFamily: 'Outfit',
        fontSize: 16,
        color: '#333',
    },
});
