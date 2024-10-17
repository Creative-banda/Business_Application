import React, { useState, useContext } from 'react'
import { ThemeContext } from '../Globals/ThemeContext'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Linking } from 'react-native'

const Business_Info = ({ route, Owner }) => {
  const [Input, setInput] = useState('');
  const { item } = route.params;
  const { themeColor, textColor } = useContext(ThemeContext)

  const makePhoneCall = (phoneNumber) => {
    let phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl)
      .then((supported) => {
        if (!supported) {
          console.log('Phone number is not available');
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch((err) => console.log(err));
  };

  const openMapWithAddress = (address) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

    Linking.openURL(url)
      .then((supported) => {
        if (!supported) {
          console.log('Maps app is not available');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };
  const openWebsite = (websiteUrl) => {
    if (websiteUrl) {

      Linking.openURL(websiteUrl).catch((err) =>
        console.error('Failed to open URL:', err)
      );
    }
    else {
      alert("Website Error", "No Website Found")
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: textColor }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={[styles.holder, { backgroundColor: textColor }]}>

        <View style={styles.businessInfoContainer}>
          <View>
            <Text style={{ fontFamily: 'Outfit-bold', fontSize: 24, color: 'rgba(0,0,0,0.9)' }}>{item.name}</Text>
            <Text style={{ fontFamily: 'Outfit' }}> {item.address}</Text>
          </View>
          {Owner && <TouchableOpacity>
            <MaterialIcons name='delete' size={30} color={'red'} />
          </TouchableOpacity>}
        </View>
        <View style={styles.iconContainer}>

          <TouchableOpacity style={[styles.iconBackground, { backgroundColor: '#51D47B' }]} onPress={() => makePhoneCall(item.contact)}>
            <MaterialIcons name='call' size={30} color={'#fff'} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconBackground, { backgroundColor: '#5787BF' }]} onPress={() => openMapWithAddress(item.address)}>
            <MaterialIcons name='location-pin' size={30} color={'#fff'} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconBackground, { backgroundColor: '#D46957' }]} onPress={() => openWebsite(item.website)}>
            <MaterialCommunityIcons name='web' size={30} color={'#fff'} />
          </TouchableOpacity>

          <View style={[styles.iconBackground, { backgroundColor: '#AFC73A' }]}>
            <MaterialIcons name='share' size={30} color={'#fff'} />
          </View>

        </View>

        <View style={styles.about}>
          <Text style={{ fontFamily: 'Outfit-bold', fontSize: 26, color: 'rgba(0,0,0,0.9)' }}> About</Text>
          <Text style={{ fontFamily: 'Outfit', fontSize: 15, color: "rgba(0,0,0,0.8)" }}>{item.about}</Text>
        </View>

        {!Owner && <View>
          <Text style={{ fontFamily: 'Outfit-bold', fontSize: 24, paddingVertical: 8 }}> Reviews </Text>
          <TextInput
            numberOfLines={5}
            placeholder="Enter Your Review"
            style={styles.InputText}
            value={Input}
            onChangeText={setInput}
            multiline={true}
            textAlignVertical="top"
          />
          <TouchableOpacity style={[styles.button, { backgroundColor: themeColor }]}>
            <Text style={{ fontFamily: 'Outfit-bold', color: textColor }}> Submit </Text>
          </TouchableOpacity>
        </View>}

      </View>
    </ScrollView>
  )
}

export default Business_Info

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '50%',
  },
  holder: {
    flex: 1, marginTop: '65%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 10

  },
  businessInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center'

  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  iconBackground: {
    padding: 10,
    borderRadius: 25
  },
  about: {
    paddingVertical: 30,
    gap: 10,

  },
  InputText: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 30
  },

})