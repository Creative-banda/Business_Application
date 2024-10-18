import React, { useState, useContext, useRef, useCallback } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,StatusBar,Dimensions,Animated,Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../Globals/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../GlobalComponents/Customalert';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = height * 0.6;

const colorThemes = {
  Default: {
    colorName: 'Default',
    hexCode: '#fff',
    backgroundColor: '#673fd2',
    gradientColors: ['#7b4fd6', '#5730c5'],
  },
  oceanBreeze: {
    colorName: 'Ocean Breeze',
    hexCode: '#E0F2F1',
    backgroundColor: '#0277BD',
    gradientColors: ['#039BE5', '#01579B'],
  },
  sunsetGlow: {
    colorName: 'Sunset Glow',
    hexCode: '#FFDAD6',
    backgroundColor: '#3E2B1E',
    gradientColors: ['#5D4037', '#3E2723'],
  },
  forestMist: {
    colorName: 'Forest Mist',
    hexCode: '#E8F5E9',
    backgroundColor: '#2E7D32',
    gradientColors: ['#388E3C', '#1B5E20'],
  },
  berryBliss: {
    colorName: 'Berry Bliss',
    hexCode: '#FCE4EC',
    backgroundColor: '#880E4F',
    gradientColors: ['#AD1457', '#6A0080'],
  },
  desertSand: {
    colorName: 'Desert Sand',
    hexCode: '#FFF3E0',
    backgroundColor: '#A1887F',
    gradientColors: ['#8D6E63', '#795548'],
  },
};

const ThemeItem = React.memo(({ item, index, scrollX, onSelect }) => {
  const inputRange = [
    (index - 1) * ITEM_WIDTH,
    index * ITEM_WIDTH,
    (index + 1) * ITEM_WIDTH,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.5, 1, 0.5],
  });

  return (
    <Animated.View
      style={[
        styles.themeOption,
        { transform: [{ scale }], opacity },
      ]}
    >
      <LinearGradient
        colors={item.gradientColors}
        style={styles.gradientBackground}
      >
        <TouchableOpacity
          style={styles.themeContent}
          onPress={() => onSelect(item)}
        >
          <View style={styles.colorPreview}>
            <View style={[styles.colorCircle, { backgroundColor: item.hexCode }]} />
            <Text style={[styles.colorName, { color: item.hexCode }]}>{item.colorName}</Text>
          </View>
          <View style={styles.demoTextContainer}>
            <Text style={[styles.demoText, { color: item.hexCode }]}>
              This is an example of how your text will look with this theme applied.
            </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
});

const ThemeScreen = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [visible, setVisible] = useState(false);
  const { setThemeColor, setTextColor, themeColor, textColor } = useContext(ThemeContext);
  const scrollX = useRef(new Animated.Value(0)).current;
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleThemeSelect = useCallback((theme) => {
    setSelectedTheme(theme);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleApplyTheme = useCallback(async () => {
    if (selectedTheme) {
      setThemeColor(selectedTheme.backgroundColor);
      setTextColor(selectedTheme.hexCode);
      await AsyncStorage.setItem('themeColor', selectedTheme.backgroundColor);
      await AsyncStorage.setItem('textColor', selectedTheme.hexCode);
      setVisible(true);
    }
  }, [selectedTheme, setThemeColor, setTextColor]);

  const renderItem = useCallback(({ item, index }) => (
    <ThemeItem
      item={item}
      index={index}
      scrollX={scrollX}
      onSelect={handleThemeSelect}
    />
  ), [scrollX, handleThemeSelect]);

  const keyExtractor = useCallback((item) => item.backgroundColor, []);

  const applyButtonScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColor }]}>
      <StatusBar barStyle={textColor === '#fff' ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Choose Your Theme</Text>
      </View>
      <Animated.FlatList
        data={Object.values(colorThemes)}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        snapToAlignment="center"  // Center alignment fix
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        bounces={false} // Ensures smooth snapping behavior
      />
      {selectedTheme && (
        <Animated.View style={[styles.footer, { transform: [{ scale: applyButtonScale }] }]}>
          <TouchableOpacity
            style={[styles.applyButton, { backgroundColor: selectedTheme.hexCode }]}
            onPress={handleApplyTheme}
          >
            <Text style={[styles.applyButtonText, { color: selectedTheme.backgroundColor }]}>
              Apply Theme
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      {selectedTheme && (
        <CustomAlert
          visible={visible}
          onClose={() => setVisible(false)}
          background={selectedTheme.backgroundColor}
          textColor={selectedTheme.hexCode}
          type='sucess'
          title='Theme Applied!'
          message='Your theme has been applied successfully.'
        />
      )}
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
  },
  themeOption: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: 10, // Simplified margin for consistent behavior
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeContent: {
    padding: 20,
    alignItems: 'center',
  },
  colorPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  colorName: {
    fontSize: 28,
    fontFamily: 'Outfit-bold',
  },
  demoTextContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  demoText: {
    fontSize: 18,
    fontFamily: 'Outfit',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: 20,
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
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

export default React.memo(ThemeScreen);