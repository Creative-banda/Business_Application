import React from 'react';
import axios from 'axios';
import { BASE_URL } from '@env';
import * as ExpoSecureStore from 'expo-secure-store';
import { StyleSheet, View, Modal, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemeContext } from '../Globals/ThemeContext';

const AreYouSure = ({ visible, handleCancel, id }) => {
    const { userDetails, setUserDetails } = React.useContext(ThemeContext);
    const [loading, setLoading] = React.useState(false)

    const handleDelete = async () => {
        setLoading(true);
        const token = await ExpoSecureStore.getItemAsync('token');
        try {
            const response = await axios.delete(`${BASE_URL}/business/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })

            if (response.data.success) {
                const newBusinesses = userDetails.userShop.filter((business) => business._id !== id);
                setUserDetails({ ...userDetails, businesses: newBusinesses });
                handleCancel();
            }
        }
        catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.holder}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Delete Shop?</Text>
                    </View>
                    <Text style={styles.subheader}>This action cannot be undone</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={handleCancel}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={handleDelete}
                            activeOpacity={0.7}
                        >
                            {!loading ? <Text style={styles.deleteText}>Delete</Text> : <ActivityIndicator size='small' color={"#fff"}/>}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    holder: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',  // Softer background overlay
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: '85%',
        paddingVertical: 20,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    header: {
        paddingBottom: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingHorizontal: 15,

    },
    headerText: {
        fontFamily: 'Outfit',
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    subheader: {
        paddingVertical: 10,
        fontSize: 16,
        color: '#666',
        fontFamily: 'Outfit',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingHorizontal: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        paddingHorizontal: 5,
        gap: 20
    },
    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f5f5f5',
    },
    cancelText: {
        fontFamily: 'Outfit',
        fontSize: 16,
        color: '#333',
    },
    deleteButton: {
        backgroundColor: '#FF4D4D',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteText: {
        fontFamily: 'Outfit',
        fontSize: 16,
        color: '#fff',
    },
});

export default AreYouSure;
