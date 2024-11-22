import { View, Text, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Landing() {
  return (
    <View style={styles.container}>
      <Image
        source={require('./../assets/images/young-couple-paying-with-credit-card-online.jpg')}
        style={styles.backgroundImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText} numberOfLines={1} adjustsFontSizeToFit>
          Welcome
        </Text>
      </View>

      <View style={styles.coopText}>
        <Text style={styles.ka}>KA-</Text>
        <Image
          source={require('./../assets/images/COOP LOGO.png')}
          style={styles.coopLogo}
        />
        <Text style={styles.exclaim}>!</Text>
      </View>

      <View style={styles.tagline}>
        <Text style={styles.cooptagline}>Elevate your experience as our</Text>
        <Text style={styles.cooptagline2}>coop member.</Text>

        <TouchableOpacity style={styles.buttonLoginContainer}>
          <Link style={styles.buttonLoginText} href={'./Login'}>
            Login
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonCreateContainer}>
          <Link href="./CreateAccount" style={styles.buttonCreateText}>
            Create Account
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#373f41',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  textContainer: {
    position: 'absolute',
    top: '10%',
    left: '5%',
    right: '5%',
    alignItems: 'center',
    padding: width * 0.03, // Dynamic padding
  },
  welcomeText: {
    fontStyle: 'italic',
    fontSize: width * 0.08, // Dynamic font size
    lineHeight: width * 0.12,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: height * 0.07,
  },
  coopText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.2,
  },
  ka: {
    fontSize: width * 0.08, // Dynamic font size
    color: '#FFFFFF',
    marginTop: height * 0.10,
  },
  
  coopLogo: {
    width: width * 0.3, // Maintain aspect ratio
    height: height * 0.05,
    resizeMode: 'contain',
    marginTop: height * 0.10,
  },
  exclaim: {
    fontSize: width * 0.08,
    color: '#FFFFFF',
    marginTop: height * 0.10,
  },
  tagline: {
    marginTop: height * 0.1,
    alignItems: 'center',
    marginTop: height * 0.07,
  },
  cooptagline: {
    fontStyle: 'italic',
    fontWeight: '800',
    fontSize: width * 0.05,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  cooptagline2: {
    fontStyle: 'italic',
    fontWeight: '800',
    fontSize: width * 0.05,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttonLoginContainer: {
    marginTop: height * 0.08,
    backgroundColor: '#D9D9D9',
    padding: width * 0.03,
    borderRadius: width * 0.02,
    alignItems: 'center',
    width: width * 0.4,
  },
  buttonLoginText: {
    color: '#373F41',
    fontSize: width * 0.05,
  },
  buttonCreateContainer: {
    marginTop: height * 0.02,
    backgroundColor: '#373f41',
    padding: width * 0.03,
    borderRadius: width * 0.02,
    borderColor: 'white',
    borderWidth: 2,
    alignItems: 'center',
    width: width * 0.4,
  },
  buttonCreateText: {
    color: '#F9A602',
    fontSize: width * 0.05,
  },
};
