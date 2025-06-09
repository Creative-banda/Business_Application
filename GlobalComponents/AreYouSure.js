import React from 'react';
<<<<<<< HEAD
import { StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native';

const AreYouSure = ({ visible, handleCancel, handleDelete }) => {
=======
import axios from 'axios';
import { BASE_URL } from '@env';
import { StyleSheet, View, Modal, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemeContext } from '../Globals/ThemeContext';

const AreYouSure = ({ visible, handleCancel, id, Navigation }) => {
    const { userDetails } = React.useContext(ThemeContext);
    const [loading, setLoading] = React.useState(false)

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`${BASE_URL}/business/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${userDetails.token}`,
                    'Content-Type': 'application/json'
                },
            })

            if (response.data.success) {
                handleCancel();
                Navigation.navigate("MyBusiness");
            }
        }
        catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
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
<<<<<<< HEAD
                            <Text style={styles.deleteText}>Delete</Text>
=======
                            {!loading ? <Text style={styles.deleteText}>Delete</Text> : <ActivityIndicator size='small' color={"#fff"}/>}
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
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
<<<<<<< HEAD
        elevation: 5,  
=======
        elevation: 5,
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
    },
    header: {
        paddingBottom: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
<<<<<<< HEAD
        paddingHorizontal : 15,
=======
        paddingHorizontal: 15,
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2

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
<<<<<<< HEAD
        borderBottomColor : '#ddd',
        borderBottomWidth : 1,
        paddingHorizontal : 15,
=======
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingHorizontal: 15,
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        paddingHorizontal: 5,
<<<<<<< HEAD
        gap : 20
=======
        gap: 20
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
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
