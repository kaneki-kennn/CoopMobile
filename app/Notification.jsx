import { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { supabase } from './supabase';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { isLeftHandSideExpression } from 'typescript';

const Notification = () => {
  const navigation = useNavigation();

  // Function to navigate with userId
  const navigateWithUserId = (navigation, userId) => (route) => {
    navigation.navigate(route, { userId });
  };

  // Component return JSX goes here
  return (
    <View style={styles.container}>
            <Text style={styles.notificationText}>Notifications</Text>
            <Image source={require('./../assets/images/search.png')} style={styles.search}></Image>
    </View>
  );
};

const { width, height } = Dimensions.get('window'); 
const styles = {
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        position: 'relative',
    },
    notificationText: {
        position: 'absolute',
        width: width * 0.26, // 26% of screen width (99px is ~26% of 375px)
        height: height * 0.03, // 3% of screen height (23px is ~3% of 750px)
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: width * 0.05,
        lineHeight: width * 0.05, // Adjust line height to match the font size
        left: width * 0.02,
        color: '#373F41',
      },
      search: {
        position: 'relative',
        width: width * 0.024, // Adjust width based on screen width
        height: width * 0.24, // Adjust height based on screen height
      },

};

export default Notification;
