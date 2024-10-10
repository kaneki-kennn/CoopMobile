import { View, Text, Image, TouchableOpacity, } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-gesture-handler';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router'

export default function Login() {
    const router=useRouter();
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
                    />
                </View>
                <View style={styles.inputplace}>
                    <Text style={styles.password}>Password</Text>
                    <TextInput 
                        style={styles.inputcontain} 
                        placeholder="Enter your Password"
                        placeholderTextColor="#AAAAAA"
                    />
                </View>
                <TouchableOpacity
                onPress={()=>router.push('Dashboard')}
                style={styles.buttonLoginContainer}>
                 <Text style={styles.buttonLoginText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>router.push('CreateAccount')}
                style={styles.noaccount }>
                    <Text style={styles.makeaccount}>Don't have an account yet?</Text><Link href={'./CreateAccount'} style={styles.createaccount}>Create account</Link>
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
        color: '#FFFFFF', // FFFFFF
        marginBottom: 5, // Space between text and input
    },
    inputBox: {
        height: 40, // Desired height
        width: 225,  // Desired width
        borderColor: '#373F41', // Stroke color
        borderWidth: 1, // Add border width to make stroke visible
        borderRadius: 5, // Optional: to give rounded corners
        paddingHorizontal: 10, // Optional: add padding inside the input
        color: '#000000', // Input text color
        backgroundColor: '#D9D9D9', // Change this to the desired background color
    },
    placeholder: {
        color: '#D9D9D9', // Placeholder color
    },
    inputplace: {
        top: -230,
        left: 65,
        padding: 10,
    },
    password: {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: '#FFFFFF', // FFFFFF
        marginBottom: 5, // Space between text and input
    },
    inputcontain: {
        height: 40, // Desired height
        width: 225,  // Desired width
        borderColor: '#373F41', // Stroke color
        borderWidth: 1, // Add border width to make stroke visible
        borderRadius: 5, // Optional: to give rounded corners
        paddingHorizontal: 10, // Optional: add padding inside the input
        color: '#000000', // Input text color
        backgroundColor: '#D9D9D9', // Change this to the desired background color
    },
    placeholder: {
        color: '#D9D9D9', // Placeholder color
    },
    buttonLoginContainer: {
        width: 126,
        height: 40,
        backgroundColor: '#373F41', // Fill color
        borderColor: '#FFFFFF', // Stroke color
        borderWidth: 1, // Border width to make stroke visible
        borderRadius: 5, // Optional: rounded corners
        justifyContent: 'center', // Center text vertically
        alignItems: 'center', // Center text horizontally
        left: 120,
        top: -195
    },
    buttonLoginText: {
        fontFamily: 'Poppins', // Font family
        fontSize: 20, // Font size
        color: '#F9A602', // Text color
    },
    noaccount: {
        marginTop: 20, // Adjust this value to move it higher or lower
        alignItems: 'center', // Center items horizontally
        top: -170,
    },
    makeaccount: {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: '#FFFFFF', // FFFFFF
    },
    createaccount: {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: '#F9A602', // F9A602
        textDecorationLine: 'underline', // Underline the text
    },
};