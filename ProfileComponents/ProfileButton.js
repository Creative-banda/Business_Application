import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../Globals/ThemeContext';

<<<<<<< HEAD
const ProfileButton = ({ title, Icon, IconName, bgColor, handleProfileButton }) => {
=======
const ProfileButton = ({ title, Icon, IconName, handleProfileButton }) => {
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
    const { themeColor } = useContext(ThemeContext);
    const renderIcon = () => {
        switch (Icon) {
            case 'MaterialIcons':
                return <MaterialIcons name={IconName} size={28} color={themeColor} />;
            case 'Ionicons':
                return <Ionicons name={IconName} size={28} color={themeColor} />;
            default:
                return null;
        }
    };

    return (
<<<<<<< HEAD
        <TouchableOpacity style={styles.container} onPress={handleProfileButton}>
            <View style={[styles.iconContainer,{ backgroundColor: bgColor }]}>{renderIcon()}</View>
=======
        <TouchableOpacity style={[styles.container, {borderColor : themeColor}]} onPress={handleProfileButton}>
            <View style={[styles.iconContainer]}>{renderIcon()}</View>
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

export default ProfileButton;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingHorizontal: 40,
        width: 160,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1.5,
<<<<<<< HEAD
        borderColor: '#673fd2',

    },
    iconContainer: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 50,
        marginRight: 10,
=======

    },
    iconContainer: {
        padding: 10,
        borderRadius: 50,
        marginRight: 10,
        
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
    },
    title: {
        fontFamily: 'Outfit-bold',
        fontSize: 16,
        flexWrap: 'wrap',
    },
});
