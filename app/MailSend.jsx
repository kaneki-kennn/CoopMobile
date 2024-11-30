import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MailSend = () => {
  const navigation = useNavigation();

  const handleLogoClick = () => {
    console.log();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogoClick}>
          <Image
            source={require('./../assets/images/COOP LOGO.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notification', { userId: 123 })}
          style={styles.bellContainer}
        >
          <Image
            source={require('./../assets/images/bell.png')}
            style={styles.bell}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.emailContainer}>
          <Image
            source={require('./../assets/images/email.png')}
            style={styles.email}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileContainer}>
          <Image
            source={require('./../assets/images/profile.png')}
            style={styles.profile}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    
  
  });
  
  

export default MailSend;
