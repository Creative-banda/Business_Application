import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Export toastConfig so it can be used in App.js
export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.toastText}
      renderLeadingIcon={() => (
        <MaterialIcons 
          name="check-circle" 
          size={24} 
          color="#fff" 
          style={styles.icon} 
        />
      )}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={styles.errorToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.toastText}
      renderLeadingIcon={() => (
        <MaterialIcons 
          name="error" 
          size={24} 
          color="#fff" 
          style={styles.icon} 
        />
      )}
    />
  )
};

const CustomToastAlert = ({ visible, message, type = 'success', onClose }) => {
  React.useEffect(() => {
    if (visible) {
      Toast.show({
        type: type,
        text1: message,
        position: 'bottom',
        visibilityTime: 2000,
        autoHide: true,
        onHide: onClose,
        bottomOffset: 30,
      });
    }
  }, [visible, message, type]);

  return null;
};

const styles = StyleSheet.create({
  successToast: {
    backgroundColor: '#4CAF50',
    borderLeftColor: '#388E3C',
    height: 'auto',
    minHeight: 60,
    borderRadius: 12,
    width: width - 32,
    marginHorizontal: 16,
    borderLeftWidth: 0,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorToast: {
    backgroundColor: '#F44336',
    borderLeftColor: '#D32F2F',
    height: 'auto',
    minHeight: 60,
    borderRadius: 12,
    width: width - 32,
    marginHorizontal: 16,
    borderLeftWidth: 0,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
  toastText: {
    fontSize: 16,
    fontFamily: 'Outfit',
    color: '#fff',
    fontWeight: '500',
  },
  icon: {
    marginLeft: 16,
    marginRight: 8,
  },
});

export default CustomToastAlert;