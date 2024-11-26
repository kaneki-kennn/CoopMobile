import { View, Image, Alert, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import {supabase} from './supabase';
import { Dimensions } from 'react-native';

const Announcement = () => {
    const route = useRoute();
    const { userId } = route.params || {}; 
    const [announcements, setAnnouncements] = useState([]);
    const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
    const [errorAnnouncements, setErrorAnnouncements] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const navigation = useNavigation();
    const navigateWithUserId = (navigation, userId) => (route) => {
        navigation.navigate(route, { userId });
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
    
            if (data && data.length > 0) {
                setAnnouncements(data);  // Set fetched data if available
            } else {
                setAnnouncements([]);  // Set an empty array if no data
            }
    
        } catch (err) {
            setErrorAnnouncements('Failed to fetch announcements.');
            console.error(err);  // Log the error for debugging
        } finally {
            setLoadingAnnouncements(false);  // Always stop loading, regardless of success or failure
        }
    };

    const handleLogoClick = () => {
        Alert.alert("Coop clicked! The page will refresh.");
        setRefreshKey((prevKey) => prevKey + 1);
    };

    useEffect(() => {
        fetchAnnouncements();
    }, [refreshKey]); 

    useEffect(() => {
        console.log('announcements:', announcements);
    }, [announcements]);

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
                onPress={() => alert("Bell clicked! Notifications.")}
                style={styles.bellContainer}
            >
                <Image
                    source={require('./../assets/images/bell.png')}
                    style={styles.bell}
                />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => alert("Email clicked! Check your inbox.")}
                style={styles.emailContainer}
            >
                <Image
                    source={require('./../assets/images/email.png')}
                    style={styles.email}
                />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => alert("Profile clicked! View your profile.")}
                style={styles.profileContainer}
            >
                <Image
                    source={require('./../assets/images/profile.png')}
                    style={styles.profile}
                />
            </TouchableOpacity>
        </View>

        <View>
    {loadingAnnouncements ? (
        <ActivityIndicator size="large" color="#F9A602" /> // Loading spinner with color F9A602
    ) : errorAnnouncements ? (
        <Text style={{ color: 'red' }}>{errorAnnouncements}</Text>
    ) : announcements.length === 0 ? (
        <Text style={styles.content}>There are no announcements...</Text>
    ) : (
        <View>
            <DataTable>
                {announcements.map((announcement, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell>
                            <Text style={styles.coopadText}>{announcement.content_title}</Text>
                            <Text style={styles.announcementText}>{announcement.content}</Text>
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        </View>
            )}
        </View>
        {/* <View style={styles.cooperativeadvisory}>
            <Text style={styles.coopadText}>Cooperative Advisory</Text>
            <Text style={styles.announcementText}>The online transactions in September 12, 2024 is not available.</Text>
        </View>

        <View style={styles.cooperativeadvisory2}>
            <Text style={styles.coopadText2}>Cooperative Advisory</Text>
            <Text style={styles.announcementText2}>The online transactions in September 12, 2024 is not available.</Text>
        </View>

        <View style={styles.cooperativeadvisory3}>
            <Text style={styles.coopadText3}>Cooperative Advisory</Text>
            <Text style={styles.announcementText3}>The online transactions in September 12, 2024 is not available.</Text>
        </View>
        */}

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
}
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
      coopadText: {
        position: 'absolute',
        width: width * 0.5, // 50% of the screen width
        height: 'auto', // Allow content height to adjust
        left: width * 0.25, // Center the text horizontally
        top: height * 0.1, // 10% from the top of the parent container
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: width * 0.04, // Font size scales with screen width (4% of screen width)
        lineHeight: width * 0.05, // Line height scales with screen width (5% of screen width)
        textAlign: 'center', // Center the text within the container
        color: '#F9A602',
      },
      announcementText: {
        fontSize: width * 0.035, // Font size is 3.5% of screen width
        color: '#373F41',
        lineHeight: width * 0.05, // Line height is 5% of screen width
        textAlign: 'left', // Align text to the left
        marginVertical: height * 0.01, // Add vertical margin (1% of screen height)
        marginLeft: width * 0.05, // Adjust the left margin (5% of screen width)
        width: width * 0.9, // Ensure the text container takes up most of the screen width
        // Remove textAlign: 'justify' to ensure it's left-aligned correctly
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
