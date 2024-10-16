import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Keyboard, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import CustomAlert from '../GlobalComponents/Alert_AddBusiness';

const AddBusiness = () => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  // Listen to keyboard events to adjust the view
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardOffset(e.endCoordinates.height); // Set keyboard height as offset
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(0); // Reset offset when keyboard is hidden
    });

    // Cleanup listeners when component unmounts
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Allow location access to use this feature.');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    let currentAddress = await Location.reverseGeocodeAsync({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });

    const street = currentAddress[0].formattedAddress || 'Unknown street';
    const city = currentAddress[0].city || 'Unknown city';
    const region = currentAddress[0].region || 'Unknown region';
    const country = currentAddress[0].country || 'Unknown country';

    setAddress(`${street}, ${city}, ${region}, ${country}`);
  };

  const handleSubmit = () => {
    if (!name || !contact || !website || !address || !selectedCategory) {
      setAlertMessage('Please fill in all required fields');
      setAlertType('error');
      setAlertVisible(true);
    } else {
      setAlertMessage('Business added successfully!'); setAlertType('success'); setAlertVisible(true); setName(''); setContact(''); setWebsite(''); setAbout(''); setAddress(''); setSelectedCategory('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: keyboardOffset / 10 }]} // For Some Reason KeyboardAvoider Not Working as Expected
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Add New Business</Text>
        <Text style={styles.subheading}>Fill all details to add a new business</Text>

        <TouchableOpacity style={styles.cameraIconContainer}>
          <Entypo name="camera" size={32} color="#6200EE" />
        </TouchableOpacity>

        <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#999" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Contact" keyboardType="phone-pad" placeholderTextColor="#999" value={contact} onChangeText={setContact} />
        <TextInput style={styles.input} placeholder="Website (optional)" placeholderTextColor="#999" value={website} onChangeText={setWebsite} />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="About"
          multiline
          placeholderTextColor="#999"
          value={about}
          onChangeText={setAbout}
        />

        <Text style={styles.sectionTitle}>Address</Text>
        <View style={styles.addressOptions}>
          <TouchableOpacity
            style={[styles.toggleButton, !useCurrentLocation && styles.activeButton]}
            onPress={() => setUseCurrentLocation(false)}
          >
            <Text style={styles.toggleButtonText}>Manual Address</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, useCurrentLocation && styles.activeButton]}
            onPress={() => {
              setUseCurrentLocation(true);
              getCurrentLocation();
            }}
          >
            <Text style={styles.toggleButtonText}>Use Current Location</Text>
            <MaterialIcons name="my-location" size={18} color="#6200EE" />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder={useCurrentLocation ? 'Fetching current location...' : 'Enter Address'}
          placeholderTextColor="#999"
          value={address}
          onChangeText={(text) => setAddress(text)}
          editable={!useCurrentLocation}
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a category..." value="" />
            <Picker.Item label="Grocery" value="Grocery" />
            <Picker.Item label="Shopping" value="Shopping" />
            <Picker.Item label="Plumber" value="Plumber" />
            <Picker.Item label="Salon" value="Salon" />
            <Picker.Item label="Restaurant" value="Restaurant" />
          </Picker>
          <CustomAlert
            visible={alertVisible}
            message={alertMessage}
            type={alertType}
            onClose={() => setAlertVisible(false)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add New Business</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  heading: {
    fontFamily: 'Outfit-bold',
    fontSize: 28,
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  subheading: {
    fontFamily: 'Outfit',
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  cameraIconContainer: {
    backgroundColor: '#f0e6ff',
    padding: 20,
    borderRadius: 16,
    alignSelf: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Outfit',
    color: '#333',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    fontFamily: 'Outfit-bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  addressOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#e0e0e0',
    backgroundColor: '#f7f7f7',
    flex: 1,
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#e0e0e0',
  },
  toggleButtonText: {
    fontFamily: 'Outfit',
    fontSize: 16,
    color: '#6200EE',
    marginRight: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    marginBottom: 24,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  button: {
    backgroundColor: '#6200EE',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6200EE',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    marginBottom: 24,
  },
  buttonText: {
    fontFamily: 'Outfit-bold',
    fontSize: 18,
    color: '#fff',
  },
});

export default AddBusiness;
