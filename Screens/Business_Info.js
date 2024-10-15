import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ThemeContext } from '../Globals/ThemeContext'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Business_Info = ({ route }) => {
  const [Input, setInput] = useState('');
  const { image } = route.params;
  const {themeColor, textColor} = useContext(ThemeContext)

  return (
    <ScrollView style={[styles.container, {backgroundColor : textColor}]}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={[styles.holder, {backgroundColor : textColor}]}>

        <View style={styles.businessInfoContainer}>
          <View>
            <Text style={{ fontFamily: 'Outfit-bold', fontSize: 24, color : 'rgba(0,0,0,0.9)' }}>Champion Shop</Text>
            <Text style={{fontFamily : 'Outfit'}}> Address Of Shop</Text>
          </View>

          <MaterialIcons name='delete' size={30} color={'red'} />
        </View>
        <View style={styles.iconContainer}>
          <View style={[styles.iconBackground, { backgroundColor: '#51D47B' }]}>
            <MaterialIcons name='call' size={30} color={'#fff'} />
          </View>
          <View style={[styles.iconBackground, { backgroundColor: '#5787BF' }]}>
            <MaterialIcons name='location-pin' size={30} color={'#fff'} />
          </View>
          <View style={[styles.iconBackground, { backgroundColor: '#D46957' }]}>
            <MaterialCommunityIcons name='web' size={30} color={'#fff'} />
          </View>
          <View style={[styles.iconBackground, { backgroundColor: '#AFC73A' }]}>
            <MaterialIcons name='share' size={30} color={'#fff'} />
          </View>
        </View>

        <View style={styles.about}>
          <Text style={{ fontFamily: 'Outfit-bold', fontSize: 26,color : 'rgba(0,0,0,0.9)' }}> About</Text>
          <Text style={{ fontFamily: 'Outfit', fontSize: 16 }}> This the about of a Shop</Text>
        </View>

        <View>
          <Text style={{fontFamily : 'Outfit-bold', fontSize :24, paddingVertical : 8}}> Reviews </Text>
          <TextInput
            numberOfLines={5}
            placeholder="Enter Your Comment"
            style={styles.InputText}
            value={Input}
            onChangeText={setInput}
            multiline={true} 
            textAlignVertical="top" 
          />
          <TouchableOpacity style={[styles.button, {backgroundColor : themeColor}]}>
            <Text style={{fontFamily : 'Outfit-bold', color : textColor}}> Submit </Text>
          </TouchableOpacity>
        </View>

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
  button : {
    width : '100%',
    paddingVertical : 10,
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 20,
    marginTop : 15,
    marginBottom : 30
  },

})