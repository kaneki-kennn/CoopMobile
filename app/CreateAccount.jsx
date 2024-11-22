import { View, Text, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import React, { useState } from 'react'; // Import useState
import { Link } from 'expo-router';

export default function CreateAccount() {
    const [passwordVisible, setPasswordVisible] = useState(false); // Toggle for password visibility
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Toggle for confirm password visibility

    return (
        <View style={styles.container}>
            <Image
                source={require('./../assets/images/young-couple-paying-with-credit-card-online.jpg')}
                style={styles.backgroundImage}
            />
            <View style={styles.textContainer}>
                <Text style={styles.createaccount}>Create Account</Text>
            </View>
            <View style={styles.comment}>
                <Text style={styles.commentline1}>
                    Enter your personal information and
                </Text>
                <Text style={styles.commentline2}>
                    start your journey with us.
                </Text>
            </View>
            <View style={styles.inputarea}>
                <Text style={styles.accountid}>Account ID</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter your Account ID"
                    placeholderTextColor="#AAAAAA"
                />
                {/* Password Input */}
                <View style={styles.inputplace}>
                    <Text style={styles.firstpassword}>Enter your Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputcontain}
                            placeholder="Enter your Password"
                            placeholderTextColor="#AAAAAA"
                            secureTextEntry={!passwordVisible} // Toggle visibility
                        />
                        <TouchableOpacity
                            onPress={() => setPasswordVisible(!passwordVisible)}
                            style={styles.eyeIcon}
                        >
                            <Text style={styles.eyeText1}>
                                {passwordVisible ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Confirm Password Input */}
                <View style={styles.input}>
                    <Text style={styles.confirmpassword}>Confirm Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputcont}
                            placeholder="Confirm your Password"
                            placeholderTextColor="#AAAAAA"
                            secureTextEntry={!confirmPasswordVisible} // Toggle visibility
                        />
                        <TouchableOpacity
                            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                            style={styles.eyeIcon}
                        >
                            <Text style={styles.eyeText2}>
                                {confirmPasswordVisible ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.buttonCreateAccountContainer}>
                <Link style={styles.buttonCreateAccountText} href={'./Login'}>
                    Create Account
                </Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hasaccount}>
                <Text style={styles.account}>Already have an account? </Text>
                <Link href={'./Login'} style={styles.login}>
                    Log in
                </Link>
            </TouchableOpacity>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#373f41',
    position: 'relative', 
  },
  backgroundImage: {
    position: 'absolute',
    width: width, // Full width of the screen
    height: height, // Full height of the screen
    opacity: 0.3,
    top: 0,  // Keep it aligned to the top
    left: 0,  // Keep it aligned to the left
  },
  textContainer: {
    alignItems: 'center',  // Center the text horizontally
    marginVertical: height * 0.05,  // 5% vertical margin, responsive to screen height
    paddingHorizontal: width * 0.05, // 5% horizontal padding, responsive to screen width
    width: '90%',  // Allow the container to take 90% of the screen width, ensuring it adjusts on different devices
},
createaccount: {
    fontSize: width * 0.08,  // Make font size responsive based on screen width (8% of screen width)
    color: '#FFFFFF',  // White color
    top: height * 0.05,  // 5% from the top of the screen, responsive to screen height
    left: width * 0.05,  // Horizontally position it based on screen width
},
comment: {
    alignItems: 'center',  // Center the content horizontally
    marginVertical: height * 0.08,  // 8% vertical margin, responsive to screen height
    marginTop: height * 0.04,  // Adjust margin based on screen height
},
commentline1: {
    fontSize: width * 0.05,  // Font size responsive based on screen width (4% of screen width)
    color: '#FFFFFF',  // White color
    marginBottom: height * 0.01,  // 1% space below the text, responsive to screen height
    fontStyle: 'italic',
},
commentline2: {
    fontSize: width * 0.05,  // Font size responsive based on screen width (4% of screen width)
    color: '#FFFFFF',  // White color
    fontStyle: 'italic',
},
inputarea: {
    top: height * 0.01,  // 1% from the top of the screen, responsive to screen height
    left: width * 0.15,  // 15% from the left of the screen, responsive to screen width
    padding: width * 0.03,  // Padding responsive to screen width (3% of screen width)
},
accountid: {
    fontSize: width * 0.04,  // Font size responsive based on screen width (4% of screen width)
    color: '#FFFFFF',  // White color
    marginBottom: height * 0.015,  // Space between text and input, responsive to screen height (1.5%)
},
inputBox: {
    height: height * 0.05,  // 5% of screen height for responsive height
    width: width * 0.6,  // 60% of screen width for responsive width
    borderColor: '#373F41',  // Stroke color
    borderWidth: 1,  // Border width
    borderRadius: 5,  // Rounded corners
    paddingHorizontal: width * 0.03,  // Horizontal padding based on screen width (3% of screen width)
    color: '#000000',  // Input text color
    backgroundColor: '#D9D9D9',  // Background color
},
placeholder: {
    color: '#D9D9D9',  // Placeholder color
},

inputplace: {
    top: height * 0.01,  // 1% from the top of the screen, responsive to screen height
    left: width * -0.03,  // 15% from the left of the screen, responsive to screen width
    padding: width * 0.03,  // Padding responsive to screen width (3% of screen width)
},
firstpassword: {
    fontSize: width * 0.04,  // Font size responsive based on screen width (4% of screen width)
    color: '#FFFFFF',  // White color for the text
    marginBottom: height * 0.015,  // 1.5% of screen height for space between text and input
},
inputcontain: {
    height: height * 0.05,  // 5% of screen height for responsive height
    width: width * 0.6,  // 60% of screen width for responsive width
    borderColor: '#373F41',  // Border stroke color
    borderWidth: 1,  // Border width
    borderRadius: 5,  // Rounded corners
    paddingHorizontal: width * 0.03,  // Horizontal padding responsive to screen width (3% of screen width)
    color: '#000000',  // Text color for input
    backgroundColor: '#D9D9D9',  // Background color of the input
},
placeholder: {
    color: '#D9D9D9',  // Placeholder color
},
input: {
    top: height * 0.01,  // 1% of the screen height for responsive positioning
    left: width * -0.03,  // 15% of the screen width for left position
    padding: width * 0.03,  // 3% of screen width for padding inside the input
},
confirmpassword:{
    fontSize: width * 0.04,  // Font size responsive based on screen width (4% of screen width)
    color: '#FFFFFF',  // White color for the text
    marginBottom: height * 0.015,  // 1.5% of the screen height for space between text and input
},
inputcont: {
    height: height * 0.05,  // 5% of screen height for responsive height
    width: width * 0.6,  // 60% of the screen width for responsive width
    borderColor: '#373F41',  // Border stroke color
    borderWidth: 1,  // Border width
    borderRadius: 5,  // Rounded corners
    paddingHorizontal: width * 0.03,  // Horizontal padding responsive to screen width (3% of screen width)
    color: '#000000',  // Input text color
    backgroundColor: '#D9D9D9',  // Background color of the input
},
placeholder: {
    color: '#D9D9D9', // Placeholder color
},
eyeText1: {
    color: '#F9A602',
    fontSize: width * 0.04, // Adjust font size for responsiveness
    top: height * -0.04,  // 1% of the screen height for responsive positioning
    left: width * 0.62,  // Center horizontally
  },
  eyeText2: {
    color: '#F9A602',
    fontSize: width * 0.04, // Adjust font size for responsiveness
    top: height * -0.04,  // 1% of the screen height for responsive positioning
    left: width * 0.62,  // Center horizontally
  },
buttonCreateAccountContainer: {
        width: width * 0.4,  // 60% of the screen width for responsive width
        height: height * 0.04,  // 6% of screen height for responsive height
        backgroundColor: '#373F41',  // Fill color
        borderColor: '#FFFFFF',  // Stroke color
        borderWidth: 1,  // Border width
        borderRadius: 5,  // Rounded corners
        justifyContent: 'center',  // Center text vertically
        alignItems: 'center',  // Center text horizontally
        left: width * 0.27,  // 20% from the left of the screen, ensuring it's centered on most devices
        top: height * 0.02,  // 5% from the top of the screen
},
buttonCreateAccountText: {
    fontSize: width * 0.05,  // Font size responsive to screen width (5% of screen width)
    color: '#F9A602',  // Text color
},
hasaccount: {
    marginTop: height * 0.03,  // 3% of screen height for margin space
    alignItems: 'center',  // Center items horizontally
    top: height * 0.02,  // 10% from the top of the screen
    left: width * -0.03,
},
account: {
    fontSize: width * 0.040,  // Font size responsive to screen width (3.5% of screen width)
    color: '#FFFFFF',  // White color for text
},
login: {
    fontSize: width * 0.040,  // Font size responsive to screen width (3.5% of screen width)
    color: '#F9A602',  // Yellow color for text
    textDecorationLine: 'underline',  // Underline the text
},
}