import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from '../Globals/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../Globals/customalert';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.9;

const colorThemes = {
  Default: {
    colorName: 'Default',
    hexCode: '#fff',
    backgroundColor: '#673fd2'
  },
  oceanBreeze: {
    colorName: 'Ocean Breeze',
    hexCode: '#0D0C0D',
    backgroundColor: '#ACBDBE'
  },
  sunsetGlow: {
    colorName: 'Coyota',
    hexCode: '#FFDAD6',
    backgroundColor: '#3E2B1E'
  },
  forestMist: {
    colorName: 'Ultra Violet',
    hexCode: '#fff',
    backgroundColor: '#3A3F64'
  },
  berryBliss: {
    colorName: 'Berry Bliss',
    hexCode: '#120F0D',
    backgroundColor: '#C9BCB1'
  },
  desertSand: {
    colorName: 'Eggplant',
    hexCode: '#CFCFCD',
    backgroundColor: '#536B78'
  },

};

const ThemeScreen = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [visible, setVisible] = useState(false);
  const { setThemeColor, setTextColor, themeColor, textColor } = useContext(ThemeContext);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };
  const handleApplyTheme = async () =>{
    setThemeColor(selectedTheme.backgroundColor);
    setTextColor(selectedTheme.hexCode);
    await AsyncStorage.setItem('themeColor', selectedTheme.backgroundColor);
    await AsyncStorage.setItem('textColor', selectedTheme.hexCode);
    setVisible(true);
  }

  const renderItem = ({ item }) => {
    const isSelected = selectedTheme && selectedTheme.backgroundColor === item.backgroundColor;

    return (
      <TouchableOpacity
        style={[
          styles.themeOption,
          { backgroundColor: item.backgroundColor },
          isSelected && styles.selectedThemeOption
        ]}
        onPress={() => handleThemeSelect(item)}
      >
        <View style={styles.themeContent}>
          <View style={styles.colorPreview}>
            <View style={[styles.colorCircle, { backgroundColor: item.hexCode }]} />
            <Text style={[styles.colorName, { color: item.hexCode }]}>{item.colorName}</Text>
          </View>
          <View style={styles.demoTextContainer}>
            <Text style={[styles.demoText, { color: item.hexCode }]}> This is an example of a paragraph where we want to check the text color. 
            You can see how the text appears across multiple lines.</Text>
          </View>
        </View>
        {isSelected && (
          <View style={[styles.checkmarkContainer, { backgroundColor: item.hexCode }]}>
            <Feather name="check" size={24} color={item.backgroundColor} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColor }]}>
      <StatusBar barStyle={textColor === '#fff' ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Choose Your Theme</Text>
      </View>
      <FlatList
        data={Object.values(colorThemes)}
        renderItem={renderItem}
        keyExtractor={item => item.backgroundColor}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      {selectedTheme && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.applyButton, { backgroundColor: selectedTheme.hexCode }]}
            onPress={handleApplyTheme}
          >
            <Text style={[styles.applyButtonText, { color: selectedTheme.backgroundColor }]}>Apply Theme</Text>
          </TouchableOpacity>
        </View>
      )}
     {selectedTheme && <CustomAlert
      visible={visible} 
      onClose={() => setVisible(false)}
      background={selectedTheme.backgroundColor}
      textColor={selectedTheme.hexCode}
      />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Outfit-bold',
    letterSpacing: 1,
  },
  listContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  themeOption: {
    width: ITEM_WIDTH,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  selectedThemeOption: {
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  themeContent: {
    padding: 20,
  },
  colorPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  colorName: {
    fontSize: 22,
    fontFamily: 'Outfit',
  },
  demoTextContainer: {
    alignItems: 'center',
  },
  demoText: {
    fontSize: 18,
    fontFamily: 'Outfit-bold',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  applyButton: {
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  applyButtonText: {
    fontFamily: 'Outfit-bold',
    fontSize: 20,
    letterSpacing: 0.5,
  },
});

export default ThemeScreen;