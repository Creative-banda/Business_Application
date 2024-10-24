import React, { useState, useContext } from 'react'
import { ThemeContext } from '../Globals/ThemeContext'
import AreYouSure from '../GlobalComponents/AreYouSure'
import CustomAlert from '../GlobalComponents/Customalert'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Linking, Animated } from 'react-native'

const Business_Info = ({ route }) => {
  const { item, Owner } = route.params;
  const [Input, setInput] = useState('');
  const [rating, setRating] = useState(0);
  const [type, setType] = useState("error");
  const [showAlert, setShowAlert] = useState(false);
  const [animation] = useState(new Animated.Value(0))
  const [alertMessage, setAlertMessage] = useState('');
  const [IsdeleteVisible, setIsDeleteVisible] = useState(false);
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

  const handleRating = (newRating) => {
    setRating(newRating);
    Animated.spring(animation, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleRating(i)}>
          <Animated.Text
            style={[
              i <= rating ? styles.selectedStar : styles.star,
              { transform: [{ scale: i <= rating ? animation : 1 }] }
            ]}
          >
            ★
          </Animated.Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const handleSubmit = () => {
    if (rating & Input) {

      const feedback = {
        rating: rating,
        comment: Input
      }

      setAlertMessage("Thank you for your feedback!")
      setType('success');
      setShowAlert(true);
      setInput('');
    }
    else {
      setAlertMessage("Please fill the required fields.")
      setType('error');
      setShowAlert(true);
    }
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: textColor }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={[styles.holder, { backgroundColor: textColor }]}>

        <View style={styles.businessInfoContainer}>
          <View>
            <Text style={{ fontFamily: 'Outfit-bold', fontSize: 24, color: 'rgba(0,0,0,0.9)' }}>{item.name}</Text>
            <Text style={{ fontFamily: 'Outfit' }}> {item.address}</Text>
          </View>
          {Owner && <TouchableOpacity onPress={()=>setIsDeleteVisible(true)}>
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
          <View style={styles.starContainer}>{renderStars()}</View>
          <TextInput
            numberOfLines={5}
            placeholder="Enter Your Review"
            style={styles.InputText}
            value={Input}
            onChangeText={setInput}
            multiline={true}
            textAlignVertical="top"
          />
          <TouchableOpacity style={[styles.button, { backgroundColor: themeColor }]} onPress={handleSubmit}>
            <Text style={{ fontFamily: 'Outfit-bold', color: textColor }}> Submit </Text>
          </TouchableOpacity>
        </View>}

      </View>
      <CustomAlert message={alertMessage} onClose={() => setShowAlert(false)} visible={showAlert} type={type} />
      <AreYouSure visible={IsdeleteVisible} handleCancel={()=>setIsDeleteVisible(false)}/>
    </ScrollView>
  )
}

export default Business_Info

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    position: 'absolute', width: '100%', height: '50%',
  },
  holder: {flex: 1, marginTop: '65%', backgroundColor: '#fff', borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingHorizontal: 10},

  businessInfoContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, borderRadius: 20, paddingVertical: 15, alignItems: 'center' },

  iconContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 10 },

  iconBackground: { padding: 10, borderRadius: 25 },

  about: { paddingVertical: 30, gap: 10, },

  InputText: { borderColor: '#000', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10, },

  button: { width: '100%', paddingVertical: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginTop: 15, marginBottom: 30 },

  starContainer: { flexDirection: 'row', marginBottom: 30, },

  star: { fontSize: 30, color: '#D1D1D1', marginHorizontal: 8, },

  selectedStar: { fontSize: 32, color: '#FFD700', marginHorizontal: 8, }

})