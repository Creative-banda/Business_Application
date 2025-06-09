import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
<<<<<<< HEAD
=======
import { ThemeContext } from '../Globals/ThemeContext';
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2

const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

const ItemCard = ({ STORES_DATA, navigation }) => {
<<<<<<< HEAD
=======
    const { themeColor, textColor } = React.useContext(ThemeContext);
    
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Business_Info", { item: item })}>
                <View style={styles.sliderItem}>
                    <Image source={{ uri: item.image }} style={styles.image} />
<<<<<<< HEAD
                    <View style={styles.businessInfo}>
                        <Text style={styles.BusinessName}>{item.name}</Text>
=======
                    <View style={[styles.businessInfo , {backgroundColor : textColor}]}>
                        <Text style={styles.BusinessName}>{item.shopName}</Text>
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
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
<<<<<<< HEAD
                keyExtractor={(item) => item.id.toString()}
=======
                keyExtractor={(item) => item._id.toString()}
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
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
<<<<<<< HEAD
        backgroundColor: 'white',
=======
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
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
