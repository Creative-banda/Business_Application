import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useContext } from 'react';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import CustomAlert from '../GlobalComponents/Customalert';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@env';
import { ThemeContext } from './../Globals/ThemeContext';
import CustomDropdown from '../GlobalComponents/CustomDropdown';

const AddBusiness = () => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const { userDetails } = useContext(ThemeContext);
  
  console.log(BASE_URL);
  

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

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need media permissions to make this work!');
      return false;
    }
    pickImage();
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.mediaTypes,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.6,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const resetFormFields = () => {
    setName('');
    setAbout('');
    setWebsite('');
    setAddress('');
    setContact('');
    setImage('');
    setSelectedCategory('');
  }

  const handleSubmit = async () => {
    console.log(selectedCategory);
    
    if (!name || !contact || !address || !selectedCategory) {
      setAlertVisible(true);
      setAlertMessage('Please fill all the fields');
      setAlertType('error');
      return;
    }
    try {
      setIsLoaded(true);
      const formData = new FormData();
      formData.append('shopName', name);
      formData.append('mail', userDetails.mail);
      formData.append('about', about);
      formData.append('website', website);
      formData.append('address', address);
      formData.append('contact', contact);
      formData.append('category', selectedCategory.label);

      if (image) {
        const fileName = image.split('/').pop();
        const fileObject = {
          uri: image,
          name: fileName || 'default.jpg',
          type: 'image/jpeg',
        };
        formData.append('file', fileObject);
      }

      const response = await axios.post(`${BASE_URL}/business`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${userDetails.token}`
        },
      });

      if (response.data.success) {
        setAlertVisible(true);
        setAlertMessage(response.data.message);
        setAlertType('success');

        resetFormFields(); 
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      setAlertVisible(true);
      setAlertMessage(errorMessage);
      setAlertType('error');
      console.error('Error details:', error);
    } finally {
      setIsLoaded(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent]} // For Some Reason KeyboardAvoider Not Working as Expected
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Add New Business</Text>
        <Text style={styles.subheading}>Fill all details to add a new business</Text>

        <TouchableOpacity style={styles.cameraIconContainer} onPress={handleImagePicker}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 70, height: 70, borderRadius: 16 }}
            />
          ) : (
            <Entypo name="camera" size={32} color="#6200EE" style={{ margin: 15 }} />
          )}
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
          multiline={true}
        />

        <View style={styles.pickerContainer}>
          <CustomDropdown
            selectedValue={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            options={[
              { label: 'Select a category...', value: '' },
              { label: 'Grocery', value: 'Grocery' },
              { label: 'Shopping', value: 'Shopping' },
              { label: 'Plumber', value: 'Plumber' },
              { label: 'Salon', value: 'Salon' },
              { label: 'Restaurant', value: 'Restaurant' },
            ]}
          />
          <CustomAlert
            visible={alertVisible}
            message={alertMessage}
            type={alertType}
            onClose={() => setAlertVisible(false)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {!isLoaded ? <Text style={styles.buttonText}>Add New Business</Text> :
            <ActivityIndicator size="small" color="#fff" />}
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
    padding: 20,
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
    borderRadius: 16,
    alignSelf: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 5,
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
    borderWidth: 0,
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
