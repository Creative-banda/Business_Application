import React from 'react';
import { StyleSheet, View, Text, Image,TouchableOpacity } from 'react-native';

const PURPLE = "#673fd2"

const InitalizePage = ({navigation}) => {

    const handleClick = ()=>{
        navigation.navigate("HomeScreen")
    }


    return (
        <View style={styles.container}>
            <Image source={require('../assets/Images/Demo-Image.png')} style={styles.TopImage} />
            <View style={styles.TextContainer}>
                <Text style={styles.Text}>
                    Your Ultimate <Text style={[styles.Text, { color: PURPLE}]}>
                    Community Business Directory   
                    </Text> App
                </Text>

                <Text style={styles.BottomText}>
                    Find your favorite business near your and post your own business to your community
                </Text>
                <TouchableOpacity style={styles.button} onPress={handleClick}>
                    <Text style={styles.buttonText}>
                        Let's Get Started
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {flex: 1,alignItems: 'center',paddingVertical: 30},

    TopImage: {resizeMode: 'contain',height: 500,width: '100%',},

    TextContainer:{flex:1,alignItems:'center',paddingHorizontal:15,paddingVertical:20,width:'100%'},

    Text:{fontSize:30, rowGap:10, textAlign:'center', fontFamily:'Outfit-bold',},

    BottomText: {textAlign:'center', marginTop:30, color:'#4C4A48',marginHorizontal:20, fontFamily:'Outfit', fontWeight:'600'},

    button:{backgroundColor:PURPLE, marginTop:30, paddingVertical:12,width:'100%', justifyContent:'center',alignItems:'center', borderRadius:20},

    buttonText:{color:'#fff', fontFamily:'Outfit-bold'}
})

export default InitalizePage;
