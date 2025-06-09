import React, { useContext } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../Globals/ThemeContext';


const InputText = ({ placeholder, value, onChangeText }) => {
    const { themeColor, textColor } = useContext(ThemeContext);
    return (
<<<<<<< HEAD
        <View style={[styles.container, { borderColor : textColor}]}>
=======
        <View style={[styles.container, { borderColor : themeColor, backgroundColor : textColor}]}>
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
            <Icon name='search' size={24} color={themeColor} />
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
<<<<<<< HEAD
                style={styles.input}
=======
                style={[styles.input]}
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 10,
<<<<<<< HEAD
        backgroundColor: '#fff',
        paddingVertical: 10,
=======
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
        paddingHorizontal: 10,
        flexDirection: 'row',
        gap: 8,
        borderWidth: 1.3,
<<<<<<< HEAD
=======
        alignItems: 'center',
        borderWidth : 1,
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Outfit',
    }
})

export default InputText;
