import { View, Text, Image, TouchableOpacity, handleLogin,handleCreateAccount, TextInput } from 'react-native';
import React from 'react';
import { Link } from 'expo-router'; 

export default function CreateAccount() {
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
      <Text style={styles.commentline1}>Enter your personal informations and</Text>
    <Text style={styles.commentline2}>start your journey with us.</Text>
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
                    <Text style={styles.firstpassword}>Enter your Password</Text>
                    <TextInput 
                        style={styles.inputcontain} 
                        placeholder="Enter your Password"
                        placeholderTextColor="#AAAAAA"
                    />
                </View>
                <View style={styles.input}>
                    <Text style={styles.confirmpassword}>Confirm Password</Text>
                    <TextInput 
                        style={styles.inputcont} 
                        placeholder="Confirm your Password"
                        placeholderTextColor="#AAAAAA"
                    />
                </View>
                <TouchableOpacity style={styles.buttonCreateAccountContainer}>
                 <Link style={styles.buttonCreateAccountText} href={'./Login'}>Create Account</Link>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>router.push('Login')}
                style={styles.hasaccount }>
                    <Text style={styles.account}>Already have an account?</Text><Link href={'./Login'} style={styles.login}>Log in</Link>
                </TouchableOpacity>
        </View>
    )

}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#373f41',
    position: 'relative', 
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  textContainer: {
    // Add any necessary styles for the container
    alignItems: 'center', // Center the text horizontally
    marginVertical: 20, // Optional: add some vertical margin
},
createaccount: {
    fontFamily: 'Poppins-SemiBold', // Ensure you have the correct font loaded
    fontSize: 36, // Size 36
    color: '#FFFFFF', // FFFFFF
    top: 20
},
comment: {
    alignItems: 'center',
    marginVertical: 50,
},
commentline1: {
    fontFamily: 'Poppins-Italic', // Ensure you have the correct font loaded
    fontSize: 14, // Font size 14
    color: '#FFFFFF', // White color
    marginBottom: 5, // Optional: add space between lines
    fontStyle: 'italic',
},
commentline2: {
    fontFamily: 'Poppins-Italic', // Ensure you have the correct font loaded
    fontSize: 14, // Font size 14
    color: '#FFFFFF', // White color
    fontStyle: 'italic',
},
inputarea: {
    top: 1,
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
    top: 5,
    left: 65,
    padding: 10,
},
firstpassword: {
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
input: {
    top: 5,
    left: 65,
    padding: 10,
},
confirmpassword: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#FFFFFF', // FFFFFF
    marginBottom: 5, // Space between text and input
},
inputcont: {
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
buttonCreateAccountContainer: {
    width: 170,
    height: 42,
    backgroundColor: '#373F41', // Fill color
    borderColor: '#FFFFFF', // Stroke color
    borderWidth: 1, // Border width to make stroke visible
    borderRadius: 5, // Optional: rounded corners
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    left: 100,
    top: 20
},
buttonCreateAccountText: {
    fontFamily: 'Poppins', // Font family
    fontSize: 20, // Font size
    color: '#F9A602', // Text color
},
hasaccount: {
    marginTop: 20, // Adjust this value to move it higher or lower
    alignItems: 'center', // Center items horizontally
    top: 50,
},
account: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#FFFFFF', // FFFFFF
},
login: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#F9A602', // F9A602
    textDecorationLine: 'underline', // Underline the text
},
}