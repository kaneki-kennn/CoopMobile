import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

export default function Announcement() {
    const router = useRouter();
    const handleLogoClick = () => {
        alert("Coop clicked! The page will refresh."); // Replace with your refresh logic
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

        <View style={styles.cooperativeadvisory}>
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
       

        <View style={styles.navbar}>
            <TouchableOpacity onPress={() => router.push('Announcement')}>
                <Image style={styles.announcement} source={require('./../assets/images/megaphone.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('Funds')}>
                <Image style={styles.funds} source={require('./../assets/images/dollar-bill.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('Dashboard')}>
                <Image style={styles.dashboard} source={require('./../assets/images/dashboard.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('Loans')}>
                <Image style={styles.loans} source={require('./../assets/images/personal.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('History')}>
                <Image style={styles.history} source={require('./../assets/images/history.png')} />
            </TouchableOpacity>
        </View>
    </View>
);
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        position: 'relative',
    },
    header: {
        width: 360,
        height: 75,
        backgroundColor: '#FFFFFF',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        marginTop: -40,
        position: 'relative', // Ensure the header is positioned relatively
    },
    logo: {
        width: 150,
        height: 29,
        top: 10,
        resizeMode: 'contain',
        marginTop: 15,
    },
    bell: {
        width: 22,
        height: 23.46,
        tintColor: '#373F41',
        top: 10,
    },
    email: {
        width: 22,
        height: 23.46,
        tintColor: '#373F41',
        top: 10,
    },
    profile: {
        width: 22,
        height: 23.46,
        top: 10,
    },
    bellContainer: {
        position: 'absolute',
        left: 235,
        top: 17,
    },
    emailContainer: {
        position: 'absolute',
        left: 275,
        top: 17,
    },
    profileContainer: {
        position: 'absolute',
        left: 320,
        top: 17,
    },
    cooperativeadvisory: {
        position: 'absolute',
        width: 330, // Width of the rectangle
        height: 161, // Height of the rectangle
        left: 15, // Position from the left
        top: 70, // Position from the top
        backgroundColor: '#373F41', // Background color
        borderRadius: 10, // Rounded corners
        // You can add padding or margin if needed
    },
    coopadText: {
        position: 'absolute',
        width: 168, // Width of the text container
        height: 23, // Height of the text container
        left: 100, // Position from the left
        top: 20, // Position from the top
        fontFamily: 'Poppins', // Font family
        fontStyle: 'normal', // Font style
        fontWeight: '700', // Font weight
        fontSize: 15, // Font size
        lineHeight: 22, // Line height
        color: '#F9A602', // Text color
    },
    announcementText: {
        position: 'absolute',
        width: 276, // Width of the text container
        height: 40, // Height of the text container
        left: 30, // Position from the left
        top: 70, // Position from the top
        fontFamily: 'Poppins', // Font family
        fontStyle: 'normal', // Font style
        fontWeight: '400', // Font weight
        fontSize: 13, // Font size
        lineHeight: 20, // Line height
        textAlign: 'center', // Center align the text
        color: '#FFFFFF', // Text color
    },
    cooperativeadvisory2: {
        position: 'absolute',
        width: 330, // Width of the rectangle
        height: 161, // Height of the rectangle
        left: 15, // Position from the left
        top: 250, // Position from the top
        backgroundColor: '#373F41', // Background color
        borderRadius: 10, // Rounded corners
        // You can add padding or margin if needed
    },
    coopadText2: {
        position: 'absolute',
        width: 168, // Width of the text container
        height: 23, // Height of the text container
        left: 100, // Position from the left
        top: 20, // Position from the top
        fontFamily: 'Poppins', // Font family
        fontStyle: 'normal', // Font style
        fontWeight: '700', // Font weight
        fontSize: 15, // Font size
        lineHeight: 22, // Line height
        color: '#F9A602', // Text color
    },
    announcementText2: {
        position: 'absolute',
        width: 276, // Width of the text container
        height: 40, // Height of the text container
        left: 30, // Position from the left
        top: 70, // Position from the top
        fontFamily: 'Poppins', // Font family
        fontStyle: 'normal', // Font style
        fontWeight: '400', // Font weight
        fontSize: 13, // Font size
        lineHeight: 20, // Line height
        textAlign: 'center', // Center align the text
        color: '#FFFFFF', // Text color
    },
    cooperativeadvisory3: {
        position: 'absolute',
        width: 330, // Width of the rectangle
        height: 161, // Height of the rectangle
        left: 15, // Position from the left
        top: 430, // Position from the top
        backgroundColor: '#373F41', // Background color
        borderRadius: 10, // Rounded corners
        // You can add padding or margin if needed
    },
    coopadText3: {
        position: 'absolute',
        width: 168, // Width of the text container
        height: 23, // Height of the text container
        left: 100, // Position from the left
        top: 20, // Position from the top
        fontFamily: 'Poppins', // Font family
        fontStyle: 'normal', // Font style
        fontWeight: '700', // Font weight
        fontSize: 15, // Font size
        lineHeight: 22, // Line height
        color: '#F9A602', // Text color
    },
    announcementText3: {
        position: 'absolute',
        width: 276, // Width of the text container
        height: 40, // Height of the text container
        left: 30, // Position from the left
        top: 70, // Position from the top
        fontFamily: 'Poppins', // Font family
        fontStyle: 'normal', // Font style
        fontWeight: '400', // Font weight
        fontSize: 13, // Font size
        lineHeight: 20, // Line height
        textAlign: 'center', // Center align the text
        color: '#FFFFFF', // Text color
    },
    navbar: {
        position: 'absolute',
        width: 360,
        height: 47,
        left: 0,
        top: 720,
        backgroundColor: '#373F41',
        flexDirection: 'row', // Align items horizontally
        justifyContent: 'space-around', // Space items evenly
        alignItems: 'center', // Center items vertically
        elevation: 5, // Optional: Add shadow effect for Android
        shadowColor: '#000', // Optional: Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Optional: Shadow offset
        shadowOpacity: 0.25, // Optional: Shadow opacity
        shadowRadius: 3.5, // Optional: Shadow radius
},
    announcement: {
        width: 30,
        height: 30,
        tintColor: '#FFFFFF', // Tint color
        flex: 0, // Equivalent to `flex: none`
        order: 0, // Not applicable in React Native, but kept for reference
        flexGrow: 0, // Ensures it does not grow
        left: 5,
    },
    funds: {
        width: 30,
        height: 30,
        tintColor: '#F9A602', // Tint color
        flex: 0, // Equivalent to `flex: none`
        order: 0, // Not applicable in React Native, but kept for reference
        flexGrow: 0, // Ensures it does not grow
        left: -5,
    },
    dashboard: {
        width: 30,
        height: 30,
        tintColor: '#F9A602', // Tint color
        flex: 0, // Equivalent to `flex: none`
        order: 0, // Not applicable in React Native, but kept for reference
        flexGrow: 0, // Ensures it does not grow
        left: -5,
    },
    loans: {
        width: 30,
        height: 30,
        tintColor: '#F9A602', // Tint color
        flex: 0, // Equivalent to `flex: none`
        order: 0, // Not applicable in React Native, but kept for reference
        flexGrow: 0, // Ensures it does not grow
        left: -5,
    },
    history: {
        width: 30,
        height: 30,
        tintColor: '#F9A602', // Tint color
        flex: 0, // Equivalent to `flex: none`
        order: 0, // Not applicable in React Native, but kept for reference
        flexGrow: 0, // Ensures it does not grow
        left: -5,
    },
    };
