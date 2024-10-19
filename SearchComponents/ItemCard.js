import React from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableWithoutFeedback } from 'react-native'

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
            <TouchableWithoutFeedback onPress={()=>navigation.navigate("Business_Info", { item: item })}>
                <View style={styles.sliderItem}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.businessInfo}>
                        <Text style={styles.BusinessName}>
                            {item.name}
                        </Text>
                        <Text style={styles.addressText} numberOfLines={1} ellipsizeMode="tail">
                            {truncateText(item.address, 8)}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <View style={{ height: '70%' }}>
            <FlatList
                data={STORES_DATA}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    )
}

export default ItemCard

const styles = StyleSheet.create({
    sliderItem: {
        width: '95%',
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
        borderRadius: 10,
    },
    BusinessName: {
        fontFamily: 'Outfit-bold',
        fontSize: 20,
    },
    businessInfo: {
        position: 'absolute',
        marginTop: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        bottom: 0,
        width: '100%',
        padding: 10,
        borderBottomEndRadius : 10,
        borderBottomStartRadius : 10,
    },
    addressText: {
        fontFamily: 'Outfit',
        fontSize: 16,
    }
})