import { View, Text, Image, TouchableOpacity, handleLogin,handleCreateAccount, } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function Login() {
    

    return (
        <View style={styles.logincontainer}>
            <Text style={styles.line1text}>To keep updated with your</Text>
            <Text style={styles.line2text}>transactions please login with your</Text>
            <Text style={styles.line3text}>personal info</Text>
        </View>
    )
}