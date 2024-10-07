import { StyleSheet, Text, View, FlatList, Image, ScrollView } from 'react-native'
import React from 'react'

const ItemCard = ({STORES_DATA}) => {

    const renderItem = ({ item }) => {
        return (

            <View style={styles.sliderItem}>
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={styles.businessInfo}>
                    <Text style={styles.BusinessName}>
                        {item.name}
                    </Text>
                    <Text style={{ fontFamily: 'Outfit', fontSize: 16 }}>{item.address}</Text>
                </View>
            </View> 
        )
    }


    return (
        <View style={{height:'70%'}}>
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

    }
})