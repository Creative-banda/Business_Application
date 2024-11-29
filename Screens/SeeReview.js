import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { ThemeContext } from '../Globals/ThemeContext'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const SeeReview = ({ route }) => {
    const { item } = route.params;

    const { textColor, themeColor } = React.useContext(ThemeContext)

    console.log(item.allrating);



    const renderItem = ({ item }) => {
        return (
            <View style={[styles.renderContainer, {
                backgroundColor: themeColor}]}>
                <Text style={{ color: '#000', fontFamily: 'Outfit' }}>{item.shopName}</Text>
                <Text style={{ color: '#000', fontFamily: 'Outfit' }}>{item.review}</Text>
            </View>
        )
    }

    return (
        <View style={[styles.container, { backgroundColor: textColor }]}>
            <View style={styles.headerContainer}>
                <MaterialIcons name="arrow-back" size={30} style={{ position: 'absolute', left: 20, top: 20 }} />
                <Text style={styles.header}>SeeReview</Text>
            </View>
            <FlatList
                data={item.allrating}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
            />
        </View>
    )
}

export default SeeReview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20
    },
    header: {
        fontSize: 24,
        color: 'black',
        fontFamily: 'Outfit'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    renderContainer: {
        margin: 10,
        padding: 10,
        borderRadius: 10
    }
})