import { View, Text, Image, TouchableOpacity, handleLogin,handleCreateAccount, } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';


export default function Landing() {
  
  return (
    <View style={styles.container}>
      <Image
        source={require('./../assets/images/young-couple-paying-with-credit-card-online.jpg')}
        style={styles.backgroundImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
      </View>

      <View style={styles.coopText}>
        <Text style={styles.ka}>KA-</Text>
        <Image 
          source={require('./../assets/images/COOP LOGO.png')} 
          style={styles.coopLogo} // Ensure the logo uses the new style
        />
        <Text style={styles.exclaim}>!</Text>
      </View>

      <View style={styles.tagline}>
    <Text style={styles.cooptagline}>Elevate your experience as our</Text>
    <Text style={styles.cooptagline2}>coop member.</Text>

    <TouchableOpacity style={styles.buttonLoginContainer}>
    <Link style={styles.buttonLoginText} href={'./Login'}>Login</Link>
    </TouchableOpacity>

<TouchableOpacity style={styles.buttonCreateContainer} onPress={handleCreateAccount}>
    <Link href="" style={styles.buttonCreateText}>Create Account</Link>
</TouchableOpacity>

</View>

    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#373f41',
    position: 'relative', 
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  textContainer: {
    position: 'absolute',
    top: 150, 
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  welcomeText: {
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '800',
    fontSize: 40,
    lineHeight: 75, 
    color: '#FFFFFF',
    margintop: '200'
  },
  ka: {
    width: 95,
    height: 72,
    position: 'absolute',
    top: 250,
    left: 45,
    opacity: 1,
    fontSize: 53,
    color: '#FFFFFF',
  },
  coopText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coopLogo: {
    position: 'absolute',
    width: 150, // Reduced width for a smaller logo
    height: 40, // Adjusted height to maintain aspect ratio
    left: 123,
    top: 260, // Increased top value to lower the logo
  },  
  exclaim: {
    width: 95,
    height: 72,
    position: 'absolute',
    top: 250,
    left: 285,
    opacity: 1,
    fontSize: 53,
    color: '#FFFFFF',
  },
  tagline: {
    position: 'absolute',
    top: 350, 
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  cooptagline: {
    position: 'absolute', // Ensure it remains at the specific position
    width: 282,
    height: 23,
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontStyle: 'italic',
    fontWeight: '800',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#FFFFFF',
},
cooptagline2: {
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '800',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 60,
},
buttonLoginContainer: {
    position: 'absolute', // Positioning to absolute
    bottom: -170, // Distance from the bottom of the container
    right: 0,
    padding: 20,
    backgroundColor: '#D9D9D9',
    flexDirection: 'column', // Arrange buttons in a row
    justifyContent: 'space-around', // Space the buttons evenly
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
    left: 100,
  },
  buttonCreateContainer: {
    position: 'absolute',
    bottom: -250, // Adjust as needed
    left: 100,
    right: 0,
    padding: 20,
    backgroundColor: '#373f41',
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderWidth: 2, // Thickness of the border
    borderColor: 'white', // Color of the border
    borderRadius: 10, // Adjust the value to round the corners
    width: '45%',
  },
  buttonLoginText: {
    color: '#373F41', // Text color
    fontSize: 20, // Font size
    textAlign: 'center', // Center the text
    // You may also want to add additional styling properties
  },
  buttonCreateText: {
    color: '#F9A602', 
    fontSize: 20,
    textAlign: 'center',
    textDecorationLine: 'underline', // Optional: underline effect
  }

};