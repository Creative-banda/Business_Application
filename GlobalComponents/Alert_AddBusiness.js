import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CustomAlert = ({ visible, message, type = 'success', onClose }) => {
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    let closeTimeout;
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();

      // Set up auto-close after 1.5 seconds
      closeTimeout = setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    // Clean up the timeout when the component unmounts or visibility changes
    return () => {
      if (closeTimeout) clearTimeout(closeTimeout);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <Animated.View style={[
      styles.container,
      { transform: [{ translateY: slideAnim }] },
      type === 'error' ? styles.errorContainer : styles.successContainer
    ]}>
      <View style={styles.iconContainer}>
        <MaterialIcons
          name={type === 'error' ? 'error' : 'check-circle'}
          size={24}
          color="#fff"
        />
      </View>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <MaterialIcons name="close" size={20} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#6200EE',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successContainer: {
    backgroundColor: '#4CAF50',
  },
  errorContainer: {
    backgroundColor: '#F44336',
  },
  iconContainer: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    color: '#fff',
    fontFamily: 'Outfit',
    fontSize: 16,
  },
  closeButton: {
    padding: 4,
  },
});

export default CustomAlert;