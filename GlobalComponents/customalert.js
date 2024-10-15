import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native';

const CustomAlert = ({ visible, onClose }) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.elastic(1.5),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => setShowModal(false)); // Hide after animation
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          <Text style={styles.modalTitle}>Theme Applied Successfully</Text>
          <Text style={styles.modalMessage}>Your new theme has been applied. Enjoy the refreshed look and feel!</Text>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay for better contrast
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 320,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    elevation: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 12,
    fontFamily: 'Outfit-bold',
    color: '#333',
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Outfit',
    color: '#666',
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#FFB74D',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomAlert;