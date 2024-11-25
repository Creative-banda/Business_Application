import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../Globals/ThemeContext';

const ProfileButton = ({ title, Icon, IconName, bgColor, handleProfileButton }) => {
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
        <TouchableOpacity style={styles.container} onPress={handleProfileButton}>
            <View style={[styles.iconContainer]}>{renderIcon()}</View>
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
        borderColor: '#673fd2',

    },
    iconContainer: {
        padding: 10,
        borderRadius: 50,
        marginRight: 10,
    },
    title: {
        fontFamily: 'Outfit-bold',
        fontSize: 16,
        flexWrap: 'wrap',
    },
});
