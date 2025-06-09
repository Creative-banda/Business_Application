import React, { useContext } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../Globals/ThemeContext';


const InputText = ({ placeholder, value, onChangeText }) => {
    const { themeColor, textColor } = useContext(ThemeContext);
    return (
        <View style={[styles.container, { borderColor : themeColor, backgroundColor : textColor}]}>
            <Icon name='search' size={24} color={themeColor} />
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={[styles.input]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        gap: 8,
        borderWidth: 1.3,
        alignItems: 'center',
        borderWidth : 1,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Outfit',
    }
})

export default InputText;
