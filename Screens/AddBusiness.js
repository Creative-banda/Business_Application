import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, set,  } from 'firebase/database';
import { getAuth } from 'firebase/auth';  // Import Firebase Auth
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import CustomAlert from '../GlobalComponents/Customalert';
import { ref as storageRef, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Keyboard, Image, Alert } from 'react-native';

const AddBusiness = () => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardOffset(e.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(0);
    });

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

  const generateUniqueId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const handleSubmit = async () => {
    const auth = getAuth(); 
    const user = auth.currentUser; 

    if (!user) {
      setAlertMessage('You must be signed in to add a business');
      setAlertType('error');
      setAlertVisible(true);
      return;
    }
  
    if (!name || !contact || !address || !selectedCategory || !image) {
      setAlertMessage('Please fill in all required fields');
      setAlertType('error');
      setAlertVisible(true);
    } else {
      const id = generateUniqueId();
      const newBusinessData = {
        name,
        contact,
        website,
        address,
        category: selectedCategory,
        image,
        about,
        id,
      };
  
      try {
        const db = getDatabase();
        const userEmail = user.email.replace(/\./g, '_'); 
        const allBusinessRef = ref(db, `All_Business/${id.replace(/\s+/g, '_')}`); 
  
        // Add the business to the user's specific node (email-based node)
        const userSpecificBusinessRef = ref(db, `Users/${userEmail}/${id.replace(/\s+/g, '_')}`);
        await set(userSpecificBusinessRef, newBusinessData);

        await set(allBusinessRef, newBusinessData);
  
        // Success feedback
        setAlertMessage('Business added successfully!');
        setAlertType('success');
        setAlertVisible(true);
  
        // Clear form fields
        setName('');
        setContact('');
        setWebsite('');
        setAbout('');
        setAddress('');
        setSelectedCategory('');
      } catch (error) {
        console.error('Error adding business:', error);
        setAlertMessage('Error adding business. Please try again.');
        setAlertType('error');
        setAlertVisible(true);
      }
    }
  };

  const handleSendImage = async (url) => {
    storage = getStorage()
    try {
      if (!url) {
        console.error("No image URI found");
        return;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const blob = await response.blob();
      const filename = url.substring(url.lastIndexOf('/') + 1);
      const storageReference = storageRef(storage, `/${filename}`);

      await uploadBytes(storageReference, blob);
      const downloadUrl = await getDownloadURL(storageReference);
      setImage(downloadUrl)

    } catch (error) {
      console.error("Error sending image: ", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.6,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleSendImage(result.assets[0].uri)
    }
  };

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need media permissions to make this work!');
      return false;
    }
    pickImage();
  }

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
