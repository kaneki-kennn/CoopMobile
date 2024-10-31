import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState, Alert, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import {supabase} from './supabase';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  

  async function signInWithEmail() {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    console.log('Attempting to log in with:', { email, password });

    if (error) {
        console.log('Login Error:', error);

       
        if (error.message.includes('Invalid login credentials')) {
            console.log('User exists, but password is incorrect.');
        } else if (error.message.includes('User not found')) {
            console.log('User does not exist in Supabase Auth.');
        }

        Alert.alert('Login Failed', error.message);
    } else {
        console.log('Login successful!', data);
        router.push('Dashboard'); 
    }
    setLoading(false);
}


  async function signUpWithEmail() {
    setLoading(true);
    const { data: { session }, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={require('./../assets/images/young-couple-paying-with-credit-card-online.jpg')}
          style={styles.backgroundImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.loginText}>Log In</Text>
        </View>
        <View style={styles.tagline}>
          <Text style={styles.line1Text}>To keep updated with your</Text>
          <Text style={styles.line2Text}>transactions please login with your</Text>
          <Text style={styles.line3Text}>personal info</Text>
        </View>
        <View style={styles.inputarea}>
          <Text style={styles.accountid}>Account ID</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter your Account ID"
            placeholderTextColor="#AAAAAA"
            value={email} // Bind the input to the state
            onChangeText={setEmail} // Update the state on input change
          />
        </View>
        <View style={styles.inputplace}>
          <Text style={styles.password}>Password</Text>
          <TextInput
            style={styles.inputcontain}
            placeholder="Enter your Password"
            placeholderTextColor="#AAAAAA"
            secureTextEntry // Secure text entry for password
            value={password} // Bind the input to the state
            onChangeText={setPassword} // Update the state on input change
          />
        </View>
        <TouchableOpacity
          onPress={signInWithEmail} // Call signIn function on press
          style={styles.buttonLoginContainer}
          disabled={loading} // Disable button if loading
        >
          <Text style={styles.buttonLoginText}>{loading ? 'Loading...' : 'Login'}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => router.push('CreateAccount')}
          style={styles.noaccount}
        >
          <Text style={styles.makeaccount}>Don't have an account yet?</Text>
          <Text style={styles.createaccount}>Create account</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
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
    width: '110%',
    height: '110%',
    opacity: 0.3,
    left: 0,
  },
  loginText: {
    fontFamily: 'Poppins',
    fontWeight: '800',
    fontSize: 40,
    lineHeight: 500,
    color: '#FFFFFF',
    marginTop: '150',
    left: 130,
    top: -50
  },
  tagline: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    top: -230,
  },
  line1Text: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginTop: 10,
    marginLeft: 80,
  },
  line2Text: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginTop: 5,
    marginLeft: 50,
  },
  line3Text: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginTop: 5,
    marginLeft: 115,
  },
  inputarea: {
    top: -220,
    left: 65,
    padding: 10,
  },
  accountid: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  inputBox: {
    height: 40,
    width: 225,
    borderColor: '#373F41',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000000',
    backgroundColor: '#D9D9D9',
  },
  inputplace: {
    top: -230,
    left: 65,
    padding: 10,
  },
  password: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  inputcontain: {
    height: 40,
    width: 225,
    borderColor: '#373F41',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000000',
    backgroundColor: '#D9D9D9',
  },
  buttonLoginContainer: {
    width: 126,
    height: 40,
    backgroundColor: '#373F41',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    left: 120,
    top: -195
  },
  buttonLoginText: {
    fontFamily: 'Poppins',
    fontSize: 20,
    color: '#F9A602',
  },
  noaccount: {
    marginTop: 20,
    alignItems: 'center',
    top: -170,
  },
  makeaccount: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#FFFFFF',
  },
  createaccount: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#F9A602',
    textDecorationLine: 'underline',
  },
};
