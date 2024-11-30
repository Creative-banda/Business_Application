import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { ThemeContext } from '../Globals/ThemeContext'
import axios from 'axios'
import { BASE_URL } from '@env'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const SeeReview = ({ route, navigation }) => {
    const { item } = route.params;
    const { textColor, themeColor, userDetails } = React.useContext(ThemeContext)
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        getRating()
    }, [])

    const getRating = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${BASE_URL}/review/${item._id}`, {
                headers: {
                    'Authorization': `Bearer ${userDetails.token}`
                }
            })
            setData(res.data.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
            console.log(res.data.data);


        }
    }

    const renderItem = ({ item }) => {
        console.log(item);
        return (
            <View style={styles.renderContainer}>
                <Text style={{ color: themeColor, fontSize: 18, fontWeight: 'bold' }}>
                    {item.userName}
                </Text>
                <Text style={{ color: themeColor, fontSize: 16 }}>
                    {item.review}
                </Text>
                <Text style={{ color: themeColor, fontSize: 14 }}>
                    Rating: {item.rating}
                </Text>
            </View>
        )
    }

    return (
        <View style={[styles.container, { backgroundColor: textColor }]} >
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 20, top: 10 }}>
                    <MaterialIcons name="arrow-back" size={30} />
                </TouchableOpacity>
                <Text style={styles.header}>See Review</Text>
            </View>
            {loading ? <ActivityIndicator size={'small'} color={'#000'} /> : <FlatList
                data={data}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
            />}
        </View>
    )
}

export default SeeReview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        justifyContent: 'center'
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
        paddingTop: 10,
    },
    renderContainer: {
        margin: 10,
        padding: 10,
        borderRadius: 10
    }
})