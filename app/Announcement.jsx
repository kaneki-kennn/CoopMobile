import { View, Image, Alert, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Modal, ScrollView, Dimensions, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from './supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Announcement = () => {
  const handleLogout = async () => {
    try {
      // Supabase sign-out
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear session data
      await AsyncStorage.clear();

      // Redirect to login
      navigation.replace('Login');
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };
  const route = useRoute();
  const { userId } = route.params || {};
  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [errorAnnouncements, setErrorAnnouncements] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null); // For modal
  const [modalVisible, setModalVisible] = useState(false); // For modal visibility
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleProfileClick = () => {
    setIsProfileMenuVisible(prevState => !prevState);
  };

  // Function to handle email icon click
  const handleEmailClick = () => {
    setIsModalVisible(true); // Show the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false); // Hide the modal
  };

  const fetchAnnouncements = async () => {
    setLoadingAnnouncements(true);
    setErrorAnnouncements(null);

    try {
      const { data, error } = await supabase
        .from('Contents')
        .select('content_title, content')
        .order('createdAt', { ascending: false });

      if (error) {
        console.error('Error fetching Announcements:', error);
        throw error;
      }

      setAnnouncements(data || []);
    } catch (err) {
      setErrorAnnouncements('Failed to fetch announcements.');
      console.error(err);
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  const handleLogoClick = () => {
    Alert.alert('Coop clicked! The page will refresh.');
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement); // Set the selected announcement
    setModalVisible(true); // Show modal
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [refreshKey]);

  return (
    <View style={styles.container}>
     <View style={styles.header}>
        {/* Logo */}
        <TouchableOpacity onPress={handleLogoClick}>
          <Image
            source={require('./../assets/images/COOP LOGO.png')}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Notification Bell Icon */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Notification', { userId })}
          style={styles.bellContainer}
        >
          <Image source={require('./../assets/images/bell.png')} style={styles.bell} />
        </TouchableOpacity>

        {/* Email Icon */}
        <TouchableOpacity onPress={handleEmailClick} style={styles.emailContainer}>
          <Image
            source={require('./../assets/images/email.png')}
            style={styles.email}
          />
        </TouchableOpacity>

        {/* Profile Icon */}
        <TouchableOpacity
           onPress={handleLogout}
          style={styles.profileContainer}
        >
          <Image
            source={require('./../assets/images/profile.png')}
            style={styles.profile}
          />
        </TouchableOpacity>

        {/* Modal for Email Popup */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeModal}
        >
          <View style={styles.modalBack}>
            <View style={styles.modalCon}>
              <Text style={styles.modalTxt}>Please open your Gmail App to view email.</Text>
              <Button title="Open" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      </View>

      <View>
        {loadingAnnouncements ? (
          <ActivityIndicator size="large" color="#F9A602" />
        ) : errorAnnouncements ? (
          <Text style={{ color: 'red' }}>{errorAnnouncements}</Text>
        ) : announcements.length === 0 ? (
          <Text style={styles.content}>There are no announcements...</Text>
        ) : (
          <DataTable>
            {announcements.map((announcement, index) => (
              <DataTable.Row
                key={index}
                onPress={() => handleAnnouncementClick(announcement)} // Open modal on click
                style={{
                  backgroundColor: index % 2 === 0 ? '#F0F0F0' : '#FFFFFF', // Alternating colors: white and gray
                }}
              >
                <DataTable.Cell>
                  <Text style={styles.coopadText}>{announcement.content_title}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        )}
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
            {selectedAnnouncement && (
              <ScrollView style={styles.modalScroll}>
                <Text style={styles.modalTitle}>{selectedAnnouncement.content_title}</Text>
                <Text style={styles.modalText}>{selectedAnnouncement.content}</Text>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('Announcement', { userId })}>
          <Image style={styles.announcement} source={require('./../assets/images/megaphone.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Funds', { userId })}>
          <Image style={styles.funds} source={require('./../assets/images/dollar-bill.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard', { userId })}>
          <Image style={styles.dashboard} source={require('./../assets/images/dashboard.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Loans', { userId })}>
          <Image style={styles.loans} source={require('./../assets/images/personal.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('History', { userId })}>
          <Image style={styles.history} source={require('./../assets/images/history.png')} />
        </TouchableOpacity>
      </View>
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
    modalBack: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalCon: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: width * 0.8, // Set modal width to 80% of the screen width
        height: height * 0.3, // Set modal height to 30% of the screen height
        maxWidth: 350,  // Maximum width of modal
        maxHeight: 150, // Maximum height of modal
      },
      modalTxt: {
        marginBottom: 20,
        fontSize: width > 350 ? 18 : 16, // Adjust font size based on screen width
        textAlign: 'center',  // Make text centered
      },
    coopadText: {
        position: 'absolute',
        width: width * 0.9, // Utilize 90% of the screen width
        height: 'auto', // Allow dynamic height adjustment
        left: width * 0.05, // Add a 5% margin from the left for left alignment
        top: height * 0.02, // Maintain 10% distance from the top
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: width * 0.04, // Scaled font size (4% of screen width)
        lineHeight: width * 0.05, // Scaled line height (5% of screen width)
        textAlign: 'left', // Align text to the left
        color: '#F9A602',
      },
      
      announcementText: {
        fontSize: width * 0.035, // Font size is 3.5% of screen width
        color: '#373F41',
        lineHeight: width * 0.05, // Line height is 5% of screen width
        textAlign: 'left', // Align text to the left
        marginVertical: height * 0.01, // Add vertical margin (1% of screen height)
        marginLeft: width * 0.05, // Left margin for consistent alignment (5% of screen width)
        width: width * 0.9, // Text container width set to 90% of the screen
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      },
      modalContent: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
      },
      modalScroll: {
        marginTop: 10,
        marginBottom: 20,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
      },
      modalText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'justify',
        lineHeight: 24,
      },
      closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        zIndex: 1,
      },
      closeText: {
        fontSize: 18,
        color: '#F00',
        fontWeight: 'bold',
      },
    navbar: {
        position: 'absolute',
        width: width, // Full screen width
        height: height * 0.06, // 6% of screen height
        left: 0,
        top: height - height * 0.06, // Positioned at the very bottom of the screen
        backgroundColor: '#373F41',
        flexDirection: 'row', // Align items horizontally
        justifyContent: 'space-around', // Space items evenly
        alignItems: 'center', // Center items vertically
        elevation: 5, // Shadow effect for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.25, // Sha
    },    
    announcement: {
        width: width * 0.08, // 8% of the screen width
        height: height * 0.04, // 4% of the screen height
        tintColor: '#FFFFFF', // Tint color
        flex: 0, // Does not grow or shrink
        left: width * 0.02, // 2% of the screen width for padding from the left
    },    
    funds: {
        width: width * 0.09, // 8% of the screen width
        height: height * 0.04, // 4% of the screen height
        tintColor: '#F9A602', // Tint color
        flex: 0, // Ensures it does not grow or shrink
        left: width * 0.00, // 2% of the screen width for padding from the left
    },    
    dashboard: {
        width: width * 0.08, // 8% of the screen width
        height: height * 0.04, // 4% of the screen height
        tintColor: '#F9A602', // Tint color
        flex: 0, // Ensures it does not grow or shrink
        left: width * -0.01, // Negative padding for a slight inward adjustment
    },    
    loans: {
        width: width * 0.08, // 8% of the screen width
        height: height * 0.04, // 4% of the screen height
        tintColor: '#F9A602', // Tint color
        flex: 0, // Ensures it does not grow or shrink
        left: width * -0.01, // Adjust position slightly left
    },     
    history: {
        width: width * 0.08, // 7% of the screen width for a consistent size
        height: height * 0.035, // 3.5% of the screen height
        tintColor: '#F9A602', // Tint color
        flex: 0, // Ensures it does not grow or shrink
        left: width * -0.015, // Slight inward adjustment for alignment
    },  
};export default Announcement;
