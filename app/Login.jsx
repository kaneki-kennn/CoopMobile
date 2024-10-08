import { View, Text, Image, TouchableOpacity, handleLogin,handleCreateAccount, } from 'react-native';
import React from 'react';
import { FlipInEasyX } from 'react-native-reanimated';

export default function Login() {
    

    return (
        <View style={styles.container}>
          <Image
        source={require('./../assets/images/young-couple-paying-with-credit-card-online.jpg')}
        style={styles.backgroundImage}
        />
       <View style={styles.textContainer}>
        <Text style={styles.loginText}>Log In</Text>
      </View>
        <View >
            <Text style={styles.line1Text} >To keep updated with your</Text>
            <Text style={styles.line2Text} >transactions please login with your</Text>
            <Text style={styles.line3Text} >personal info</Text>
        </View>
        </View>
    )
}

const styles ={
    container: {
        flex: 1,
        backgroundColor: '#373f41',
        position: 'relative',
    },
    backgroundImage: {
        position: 'absolute',
        width: '110%',
        height: '110%',
        opacity: 0.3,
        left: 0,
      },
      loginText: {
        fontFamily: 'Poppins',
        fontWeight: '800',
        fontSize: 40,
        lineHeight: 10, 
        color: '#FFFFFF',
        margintop: '100',
      },
      line1Text: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontStyle: 'italic',
        color: '#FFFFFF',
      },
      
      line2Text: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontStyle: 'italic',
        color: '#FFFFFF',
      },
      
      line3Text: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontStyle: 'italic',
        color: '#FFFFFF',
      },
}