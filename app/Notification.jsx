import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

const Notification = () => {
  const navigation = useNavigation();

  // State to track visibility of the search bar
  const [showSearchBar, setShowSearchBar] = useState(false);

  // State to toggle options visibility
  const [showOptions, setShowOptions] = useState(false);

  const handleLogoClick = () => {
    Alert.alert("Logo clicked! Page will be refreshed.");
  };

  const handleSearchClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleOptionClick = () => {
    setShowOptions(!showOptions); // Toggle options visibility
  };

  const handleRemoveNotification = () => {
    Alert.alert("Notification Removed");
    setShowOptions(false); // Close options after selecting
  };

  const handleTurnOffNotification = () => {
    Alert.alert("Notifications Turned Off");
    setShowOptions(false); // Close options after selecting
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
    onPress={() => navigation.navigate('Notification', { userId })}
    style={styles.bellContainer}
  >
    <Image source={require('./../assets/images/bell.png')} style={styles.bell} />
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

      <Text style={styles.notificationText}>Notifications</Text>

      {/* Search icon click to show/hide search bar */}
      <TouchableOpacity onPress={handleSearchClick}>
        <Image source={require('./../assets/images/search.png')} style={styles.search} />
      </TouchableOpacity>

      {/* Conditionally render search bar */}
      {showSearchBar && (
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            onChangeText={(text) => console.log(text)} // Handle text input here
          />
        </View>
      )}

      <View style={styles.new}>
        <Text style={styles.newText}>New</Text>
      </View>

      <View style={styles.newContainer1}>
        <Image source={require('./../assets/images/profile.png')} style={styles.profileNotif} />
        <Text style={styles.notificationMessage}>
          The online transactions in September 12, 2024 is not available.
        </Text>
        <Text style={styles.timeFrame}>1h</Text>
        <TouchableOpacity style={styles.option} onPress={handleOptionClick}>
          <Image source={require('./../assets/images/option.png')} style={styles.optionPNG} />
        </TouchableOpacity>
      </View>

      {/* Overlay for dimming and blur effect */}
      {showOptions && (
        <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill}>
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setShowOptions(false)} // Close options when clicking outside
          />
          <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={handleRemoveNotification} style={styles.optionButton}>
              <Text style={styles.optionText}>Remove Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTurnOffNotification} style={styles.optionButton}>
              <Text style={styles.optionText}>Turn Off Notification</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      )}

    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  header: {
    width: width * 2, // 95% of the screen width
    height: height * 0.1, // 10% of the screen height
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    marginTop: -40,
    left: width * -0.01,  // Center horizontally
    position: 'relative',
  },
  logo: {
    width: width * 0.3, // 40% of the screen width
    height: height * 0.05, // 5% of the screen height
    resizeMode: 'contain',
    left: width * 0.05,  // Center horizontally
    marginTop: 20,
  },
  bell: {
    width: width * 0.06, // 6% of the screen width
    height: height * 0.03, // 7% of the screen height
    tintColor: '#373F41',
    top: 10,
  },
  email: {
    width: width * 0.06, // 6% of the screen width
    height: height * 0.03, // 7% of the screen height
    tintColor: '#373F41',
    top: 10,
  },
  profile: {
    width: width * 0.06, // 6% of the screen width
    height: height * 0.03, // 7% of the screen height
    top: 10,
  },
  bellContainer: {
    position: 'absolute',
    left: width * 0.70, // Position dynamically based on screen width
    top: height * 0.03, // 2% of the screen height
  },
  emailContainer: {
    position: 'absolute',
    left: width * 0.80, // Position dynamically based on screen width
    top: height * 0.03, // 2% of the screen height
  },
  profileContainer: {
    position: 'absolute',
    left: width * 0.90, // Position dynamically based on screen width
    top: height * 0.03, // 2% of the screen height
  },
  notificationText: {
    position: 'absolute',
    width: width * 0.30, // 26% of screen width (99px is ~26% of 375px)
    height: height * 0.07, // 3% of screen height (23px is ~3% of 750px)
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: width * 0.06,
    lineHeight: width * 0.07, // Adjust line height to match the font size
    left: width * 0.05,
    top: height * 0.07,
    color: '#373F41',
  },
  search: {
    position: 'absolute',
    width: width * 0.05, // Adjust width to 20% of screen width
    height: width * 0.05, // Adjust height to 20% of screen height
    top: height * 0.02,
    left: width * 0.90,
  },
  searchBarContainer: {
    marginTop: 10,
    width: width * 0.8,  // Set width to 80% of screen width, responsive to screen size
    left: width * 0.05,
    paddingHorizontal: width * 0.05,  // Add horizontal padding relative to screen width
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    borderWidth: 1,  // Add border width
    borderColor: '#373F41',  // Border color set to #373F41
  },
  searchBar: {
    height: height * 0.04, // Increase height of search bar for better visibility
    paddingLeft: width * 0.01, // Set padding relative to screen width for better spacing
    fontSize: width * 0.05, // Make text size responsive to screen width
    color: '#373F41', // Set the text color
    lineHeight: height * 0.05, // Match lineHeight to height for proper vertical alignment
  },
  newText: {
    position: 'absolute',
    width: width * 0.09, // Adjust width relative to screen width (6% of screen width)
    height: height * 0.08, // Adjust height relative to screen height (2% of screen height)
    fontStyle: 'normal',
    fontWeight: '700', // Bold font weight
    fontSize: width * 0.05, // Font size responsive to screen width (3% of screen width)
    lineHeight: height * 0.03, // Line height should match the height for vertical alignment
    color: '#373F41',
    left: width * 0.05, // Position it 5% of the screen width from the left
    top: height * 0.08,
  },
  newContainer1: {
    position: 'absolute',
    width: width * 0.90,  // Set width to 88% of screen width for responsiveness
    height: height * 0.08,  // Set height to 8% of screen height for responsiveness
    backgroundColor: '#373F41',  // Set background color to #373F41
    borderRadius: 10,  // Set border radius for rounded corners
    top: height * 0.17,
    left: width * 0.05,
  },
  profileNotif: {
    width: width * 0.09, // 6% of the screen width
    height: height * 0.04, // 7% of the screen height
    top: height * 0.02,
    left: width * 0.03,
  },
  notificationMessage: {
    position: 'absolute',
    width: width * 0.8, // 90% of the screen width
    height: height * 0.06, // 5% of the screen height
    top: height * 0.01,
    left: width * 0.13, // Center with 5% margin from the left
    paddingVertical: height * 0.01, // Vertical padding based on screen height
    paddingHorizontal: width * 0.02, // Horizontal padding based on screen width
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: height * 0.015, // Font size proportional to screen height
    lineHeight: height * 0.02, // Line height proportional to screen height
    color: '#FFFFFF',
    borderRadius: width * 0.02, // Rounded corners proportional to screen width
    textAlign: 'left', // Center the text
  },
  optionPNG: {
    position: 'absolute',
    width: width * 0.05,  // 50% of the original width (smaller size)
    height: height * 0.02, // 50% of the original height (smaller size)
    top: height * -0.01,
    left: width * 0.82,
    tintColor: '#FFFFFF'
  },
  optionsContainer: {
    backgroundColor: '#f1f1f1',
    padding: height * 0.015, // Responsive padding based on screen height
    borderRadius: height * 0.01, // Slightly rounded edges based on screen height
    marginHorizontal: width * 0.05, // Responsive horizontal margin
    marginTop: height * 0.45, // Responsive top margin
  },
  optionButton: {
    paddingVertical: height * 0.015, // Vertical padding for better spacing on all devices
    paddingHorizontal: width * 0.03, // Horizontal padding for button width
  },
  optionText: {
    fontSize: height * 0.018, // Font size based on screen height
    color: '#373F41',
     textAlign: 'center'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  timeFrame: {
    position: 'absolute',
    width: width * 0.07, // 7% of the screen width for compact size
    height: height * 0.02, // 2% of the screen height
    top: height * 0.01, // Position from the top (1% of screen height)
    left: width * 0.02, // Position towards the right (82% from the left)
    fontStyle: 'normal',
    fontWeight: '400', // Regular font weight
    fontSize: height * 0.012, // Responsive font size (1.2% of screen height)
    lineHeight: height * 0.015, // Responsive line height (1.5% of screen height)
    color: '#FFFFFF', // Text color
    borderRadius: width * 0.01, // Rounded corners (1% of screen width)
    textAlign: 'left', // Left-aligned text
  },

});

export default Notification;
