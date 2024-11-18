import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState, Alert, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import bcrypt from 'bcryptjs';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { supabase } from './supabase';
import { useNavigation } from '@react-navigation/native';


export default function Login() {
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRoute();
  const navigation = useNavigation(); 

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
            Alert.alert('Login Failed', 'Invalid login credentials');
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
        Alert.alert('Login Failed', 'An unexpected error occurred');
    } finally {
        setLoading(false);
    }
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
            value={user_id} // Bind the input to the state
            onChangeText={setUserId} // Update the state on input change
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
          onPress={signInWithUserId} // Call signIn function on press
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
    fontSize: 16,
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginTop: 10,
    marginLeft: 80,
  },
  line2Text: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginTop: 5,
    marginLeft: 50,
  },
  line3Text: {
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
    fontSize: 20,
    color: '#F9A602',
  },
  noaccount: {
    marginTop: 20,
    alignItems: 'center',
    top: -170,
  },
  makeaccount: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  createaccount: {
    fontSize: 14,
    color: '#F9A602',
    textDecorationLine: 'underline',
  },
};
