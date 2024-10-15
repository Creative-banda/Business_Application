import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Entypo } from '@expo/vector-icons';

const AddBusiness = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Add New Business</Text>
        <Text style={styles.subheading}>Fill all details to add a new business</Text>

        <TouchableOpacity style={styles.cameraIconContainer}>
          <Entypo name="camera" size={32} color="#6200EE" />
        </TouchableOpacity>

        <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#999" />
        <TextInput style={styles.input} placeholder="Address" placeholderTextColor="#999" />
        <TextInput style={styles.input} placeholder="Contact" keyboardType="phone-pad" placeholderTextColor="#999" />
        <TextInput style={styles.input} placeholder="Website (optional)" placeholderTextColor="#999" />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="About"
          multiline
          placeholderTextColor="#999"
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
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add New Business</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6200EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Outfit-bold',
    fontSize: 18,
  },
});

export default AddBusiness;