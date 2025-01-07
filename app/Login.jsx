import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState, Alert, View, Text, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigation } from '@react-navigation/native'; // Use useNavigation for navigation
import { supabase } from './supabase';

export default function Login() {
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // Use useNavigation for navigation actions
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Toggle for password visibility

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

  async function signInWithUserId() {
    setLoading(true);
    try {
      const { data: user, error } = await supabase
        .from('Users')
        .select('user_id, password, role')
        .eq('user_id', user_id)
        .single();

      console.log('Fetched user data:', user);

      if (error || !user) {
        console.error('User not found or error fetching user:', error);
        if (error.code === 'PGRST001') { // Network-related error or connection issue
          Alert.alert('Connection Timeout', 'Please check your network connection');
        } else {
          Alert.alert('Login Failed', 'Please check your ID or password');
        }
        setLoading(false);
        return;
      }

      if (user.role.toLowerCase() !== 'regular') {
        Alert.alert('Login Failed', 'Sorry, the current Mobile App is only accessible for regular users.');
        setLoading(false);
        return;
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        Alert.alert('Login Failed', 'Invalid login credentials');
        setLoading(false);
        return;
      }

      Alert.alert('Login Successful');
      if (user && user.user_id) {
        console.log('Passing userId to Dashboard:', user.user_id);
        navigation.navigate('Dashboard', { userId: user.user_id });
      } else {
        console.warn('User data is missing or incomplete:', user);
      }
    } catch (e) {
      console.error('Unexpected error:', e);
      if (e.message && e.message.includes('Network')) {
        Alert.alert('Connection Timeout', 'Please check your network connection');
      } else {
        Alert.alert('Login Failed', 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
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
            value={user_id} // Bind the input to the state
            onChangeText={setUserId} // Update the state on input change
          />
        </View>

        <View style={styles.container2}>
          <View style={styles.inputplace}>
            <Text style={styles.password}>Password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={styles.inputcontain}
                placeholder="Enter your Password"
                placeholderTextColor="#AAAAAA"
                secureTextEntry={!isPasswordVisible} // Toggle password visibility
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.toggle}>
                <Text style={styles.toggleText}>
                  {isPasswordVisible ? 'Hide' : 'Show'} {/* Toggle text for visibility */}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={signInWithUserId} // Call signIn function on press
          style={styles.buttonLoginContainer}
          disabled={loading} // Disable button if loading
        >
          {loading ? (
            <ActivityIndicator size="small" color="#F9A602" style={styles.loadingIndicator} />
          ) : (
            <Text style={styles.buttonLoginText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate('CreateAccount')} // Corrected to use navigate
          style={styles.noaccount}
        >
          <Text style={styles.makeaccount}>Don't have an account yet?</Text>
          <Text style={styles.createaccount}>Create account</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#373f41',
    position: 'relative',
    justifyContent: 'flex-start',  // Ensures content aligns from the top
  },
  
  backgroundImage: {
    position: 'absolute',
    width: width, // Full width of the screen
    height: height, // Full height of the screen
    opacity: 0.3,
    top: 0,  // Keep it aligned to the top
    left: 0,  // Keep it aligned to the left
  },
  
  loginText: {
    fontWeight: '800',
    fontSize: width * 0.1, // Make the font size relative to screen width
    color: '#FFFFFF',
    marginTop: height * 0.1,  // Adjust margin based on screen height
    left: width * 0.40,  // Horizontally position it based on screen width
  },
  tagline: {
    justifyContent: 'center',  // Align items vertically
    alignItems: 'flex-start',   // Align items horizontally
    paddingHorizontal: width * 0.05,  // Horizontal padding based on screen width
    marginTop: height * 0.05,   // Adjust to allow space and avoid pushing up with keyboard focus
    left: width * 0.2,          // Adjust position relative to screen width
  },
  
  line1Text: {
    fontSize: width * 0.045,  // Make font size relative to screen width (4.5% of screen width)
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginTop: height * 0.02,  // Adjust the margin based on screen height
    marginLeft: 20,  // Adjust the margin if needed
  },
  
  line2Text: {
    fontSize: width * 0.045,  // Make font size relative to screen width (4.5% of screen width)
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginTop: height * 0.015,  // Adjust the margin based on screen height
    marginLeft: 0,  // Adjust the margin if needed
  },
  
  line3Text: {
    fontSize: width * 0.045,  // Make font size relative to screen width (4.5% of screen width)
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginTop: height * 0.015,  // Adjust the margin based on screen height
    marginLeft: 60,  // Adjust the margin if needed
  },
  
  inputarea: {
    top: height * 0.05,  // Adjust vertical position relative to screen height (5% from the top)
    left: width * 0.20,  // Adjust horizontal position relative to screen width (15% from the left)
    padding: width * 0.03,  // Padding based on screen width (3% of the screen width)
  },
  
  accountid: {
    fontSize: width * 0.04,  // Font size relative to screen width (4% of the screen width)
    color: '#FFFFFF',
    marginBottom: height * 0.02,  // Vertical spacing based on screen height (2% of the screen height)
  },
  
  inputBox: {
    height: height * 0.05,  // Adjust the height based on screen height (5% of screen height)
    width: width * 0.6,     // Adjust the width based on screen width (60% of screen width)
    borderColor: '#373F41',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: width * 0.03,  // Horizontal padding relative to screen width (3% of screen width)
    color: '#000000',
    backgroundColor: '#D9D9D9',
  },
  
  inputplace: {
    top: height * 0.03,  // Adjust vertical position relative to screen height (8% from the top)
    left: width * 0.20,  // Adjust horizontal position relative to screen width (15% from the left)
    padding: width * 0.03,  // Padding relative to screen width (3% of the screen width)
  },
  
  password: {
    fontSize: width * 0.04,  // Font size relative to screen width (4% of the screen width)
    color: '#FFFFFF',
    marginBottom: height * 0.02,  // Vertical spacing based on screen height (2% of the screen height)
  },
  
  inputcontain: {
    height: height * 0.05,  // Adjust height based on screen height (5% of screen height)
    width: width * 0.6,     // Adjust width based on screen width (60% of screen width)
    borderColor: '#373F41',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: width * 0.03,  // Horizontal padding relative to screen width (3% of screen width)
    color: '#000000',
    backgroundColor: '#D9D9D9',
  },
  toggleText: {
    color: '#F9A602',
    fontSize: width * 0.04, // Adjust font size for responsiveness
    left: width * 0.03,  // Center horizontally
  },
  buttonLoginContainer: {
    width: width * 0.35,  // Adjust width to 35% of screen width
    height: height * 0.05,  // Adjust height to 6% of screen height
    backgroundColor: '#373F41',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    left: width * 0.35,  // Center horizontally
    top: height * 0.05,  // Adjust vertical position (15% of screen height)
  },
  
  buttonLoginText: {
    fontSize: width * 0.05,  // Font size relative to screen width (5% of screen width)
    color: '#F9A602',
  },
  
  noaccount: {
    marginTop: height * 0.02,  // Adjust top margin relative to screen height
    alignItems: 'center',
    top: height * 0.03,  // Adjust vertical position relative to screen height
  },
  
  makeaccount: {
    fontSize: width * 0.040,  // Font size relative to screen width (3.5% of screen width)
    color: '#FFFFFF',
    left: width * 0.03,  // Center horizontally
    marginTop: height * 0.02,  // Adjust top margin relative to screen height
  },
  
  createaccount: {
    fontSize: width * 0.040,  // Font size relative to screen width (3.5% of screen width)
    color: '#F9A602',
    textDecorationLine: 'underline',
    left: width * 0.03,
  },
}