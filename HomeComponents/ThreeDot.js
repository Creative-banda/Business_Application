import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'

const ThreeDot = ({handleTheme, isVisible, handlePress, handleLogout, handlefeedback}) => {

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={handlePress} style={styles.buttonIcon}>
                <Entypo name='dots-three-vertical' size={20} color='white' />
            </TouchableOpacity>

            {isVisible && (
                <View style={styles.list}>
                    <TouchableOpacity style={styles.listItem} onPress={handlefeedback}>
                        <Text style={styles.listItemText}>Feedback</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listItem} onPress={handleTheme}>
                        <Text style={styles.listItemText}>Theme</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listItem} onPress={handleLogout}>
                        <Text style={styles.listItemText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default ThreeDot

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 200,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        position: 'absolute',
        top: 50,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 15,
        elevation: 10, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        zIndex: 1,
    },
    listItem: {
        paddingVertical: 10,
    },
    listItemText: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Outfit',
    },
    buttonIcon: {
        alignSelf: 'flex-end',
    },
});
