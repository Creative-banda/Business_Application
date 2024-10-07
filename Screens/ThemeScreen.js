import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from '../Globals/ThemeContext';

const colorThemes = {
  oceanBreeze: {
    colorName: 'Ocean Breeze',
    hexCode: '#1E88E5', // Slightly darker, richer blue
    backgroundColor: '#E3F2FD' // Lighter, cleaner background for better contrast
  },
  sunsetGlow: {
    colorName: 'Sunset Glow',
    hexCode: '#FF6F61', // A brighter coral tone for energy
    backgroundColor: '#FFE9E3' // A softer peach for contrast
  },
  forestMist: {
    colorName: 'Forest Mist',
    hexCode: '#3A6F41', // Darker green for a more natural look
    backgroundColor: '#E9F5E8' // Soft green background to complement
  },
  berryBliss: {
    colorName: 'Berry Bliss',
    hexCode: '#A1458A', // Deep berry tone, slightly more vibrant
    backgroundColor: '#F9E5F7' // Softer lavender-pink background
  },
  desertSand: {
    colorName: 'Desert Sand',
    hexCode: '#C77F3D', // Slightly more muted, rustic orange
    backgroundColor: '#FAF0E6' // Warm beige for a subtle background
  },
  arcticFrost: {
    colorName: 'Arctic Frost',
    hexCode: '#52A1AF', // Cooler, crisper frost blue
    backgroundColor: '#ECF7F8' // Icy, bright background for freshness
  },
  goldenMeadow: {
    colorName: 'Golden Meadow',
    hexCode: '#E5C100', // Bright gold for vibrancy
    backgroundColor: '#FFF9D6' // A soft yellow hue for a warm effect
  },
  lavenderDream: {
    colorName: 'Lavender Dream',
    hexCode: '#8E44AD', // Richer purple for depth
    backgroundColor: '#F4EBF9' // Soft pastel lavender for balance
  },
  Default: {
    colorName: 'Purple',
    hexCode: '#673FD2', // Your original deep purple tone
    backgroundColor: '#EDE7F6' // Light lavender for soft contrast
  }
};


const ThemeScreen = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const { setThemeColor } = useContext(ThemeContext);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedTheme && selectedTheme.hexCode === item.hexCode;

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard, { backgroundColor: item.backgroundColor }]}
        onPress={() => handleThemeSelect(item)}
      >
        <View style={[styles.cardContent, { backgroundColor: item.backgroundColor }]}>
          <Text style={[styles.colorName, {color:item.hexCode}]}>{item.colorName}</Text>
          <Text style={styles.hexCode}>This is a Demo Color Text</Text>
        </View>
        <View style={[styles.backgroundPreview, { backgroundColor: item.backgroundColor }]} />
        {isSelected && (
          <View style={styles.checkmarkContainer}>
            <Feather name="check" size={24} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Theme</Text>
      </View>
      <FlatList
        data={Object.values(colorThemes)}
        renderItem={renderItem}
        keyExtractor={item => item.hexCode}
        contentContainerStyle={styles.listContainer}
      />
      {selectedTheme && (
        <View style={styles.selectedThemeFooter}>
          <Text style={styles.selectedThemeText}>Selected: {selectedTheme.colorName}</Text>
          <TouchableOpacity style={[styles.applyButton, {backgroundColor:selectedTheme.hexCode}]} onPress={()=>setThemeColor(selectedTheme.backgroundColor)}>
            <Text style={styles.applyButtonText}>Apply Theme</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#0077BE',
  },

  cardContent: {
    flex: 1,
  },
  colorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  hexCode: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  backgroundPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
  },
  checkmarkContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0077BE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedThemeFooter: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedThemeText: {
    fontSize: 16,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#0077BE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ThemeScreen;