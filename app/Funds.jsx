import { View, Image, TouchableOpacity, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

export default function Dashboard() {
    const router = useRouter();
    const [selectedPaymentMode, setSelectedPaymentMode] = useState('');
    const [amount, setAmount] = useState(''); // State for amount

    const handleLogoClick = () => {
        alert("Coop clicked! The page will refresh.");
        // Your refresh logic here
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

            <TouchableOpacity style={styles.savings}>
                <Text style={styles.savingsText}>Savings</Text>
                <Text style={styles.savingsBal}>Php 500.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cbu}>
                <Text style={styles.cbuText}>CBU</Text>
                <Text style={styles.cbuBal}>Php 100.00</Text>
            </TouchableOpacity>

            <View style={styles.tabularform}>
                <TouchableOpacity style={styles.deposit}>
                    <Text style={styles.depositText}>Deposit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.withdraw}>
                    <Text style={styles.withdrawText}>Withdraw</Text>
                </TouchableOpacity>
                <Text style={styles.choose}>Choose your amount</Text>

                <View style={styles.buttonContainer}>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.inputbox} onPress={() => setAmount('1000')}>
                            <Text style={styles.buttonText}>1000</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inputbox} onPress={() => setAmount('2000')}>
                            <Text style={styles.buttonText}>2000</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inputbox} onPress={() => setAmount('3000')}>
                            <Text style={styles.buttonText}>3000</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.inputbox} onPress={() => setAmount('4000')}>
                            <Text style={styles.buttonText}>4000</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inputbox} onPress={() => setAmount('5000')}>
                            <Text style={styles.buttonText}>5000</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inputbox} onPress={() => setAmount('6000')}>
                            <Text style={styles.buttonText}>6000</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.confirm}>
                    <Text style={styles.confirmText}>Confirm</Text>
                </TouchableOpacity>
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

            <Text style={styles.desiredamount}>Enter your desired amount</Text>
            <View style={styles.dsrdamount}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.numberInput}
                        placeholder="Amount (min 500)"
                        keyboardType="numeric"
                        value={amount} // Bind to state
                        onChangeText={setAmount} // Optional for manual input
                    />
                    <Text style={styles.mode}>Mode of Payment</Text>
                    <Picker
                        style={styles.dropdown}
                        selectedValue={selectedPaymentMode}
                        onValueChange={(itemValue) => setSelectedPaymentMode(itemValue)}
                    >
                        <Picker.Item label="Gcash" value="gcash" />
                        <Picker.Item label="Paypal" value="paypal" />
                        <Picker.Item label="PayMaya" value="paymaya" />
                        <Picker.Item label="Bank Transfer" value="bank_transfer" />
                    </Picker>
                </View>
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
    savings: {
        position: 'absolute',
        width: 150,
        height: 55,
        left: 20,
        top: 102,
        backgroundColor: '#373F41',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        shadowColor: '#373F41',
        shadowOffset: { width: 5, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 10,
        elevation: 5, // for Android shadow
    },
    savingsText: {
        position: 'absolute',
        width: 57,
        height: 21,
        left: 10,
        top: 5,
        fontFamily: 'Poppins', // Make sure this font is properly loaded
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 21,
        color: '#F9A602',
    },
    savingsBal: {
        position: 'absolute',
        width: 92,
        height: 24,
        left: 40,
        top: 20,
        fontFamily: 'Poppins', // Ensure this font is loaded correctly
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 24,
        color: '#F9A602',
    },
    cbu: {
        position: 'absolute',
        width: 150,
        height: 55,
        left: 185,
        top: 102,
        backgroundColor: '#F9A602',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        shadowColor: '#373F41',
        shadowOffset: { width: 5, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 10,
        elevation: 5, // for Android shadow
    },
    cbuText: {
        position: 'absolute',
        width: 57,
        height: 21,
        left: 10,
        top: 5,
        fontFamily: 'Poppins', // Make sure this font is properly loaded
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 21,
        color: '#373F41',
    },
    cbuBal: {
        position: 'absolute',
        width: 92,
        height: 24,
        left: 35,
        top: 20,
        fontFamily: 'Poppins', // Ensure this font is loaded correctly
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 24,
        color: '#373F41',
    },
    tabularform: {
        position: 'absolute',
        width: 327,
        height: 259,
        left: 16,
        top: 200,
        backgroundColor: '#D9D9D9', // Use backgroundColor in React Native
        borderRadius: 10,
    },
    deposit: {
        position: 'absolute',
        width: 127,
        height: 30,
        left: 20,
        top: 20,
        backgroundColor: '#F9A602',
        borderRadius: 5,
        justifyContent: 'center', // Center text vertically
        alignItems: 'center', // Center text horizontally
    },
    depositText: {
        color: '#373F41', // Change text color for visibility
        fontFamily: 'Poppins', // Ensure font is loaded
        fontSize: 16,
        fontWeight: 'normal',
    },
    withdraw: {
        position: 'absolute',
        width: 127,
        height: 30,
        left: 180,
        top: 20,
        backgroundColor: '#373F41',
        borderRadius: 5,
        justifyContent: 'center', // Center text vertically
        alignItems: 'center', // Center text horizontally
    },
    withdrawText: {
        color: '#FFFFFF', // Change text color for visibility
        fontFamily: 'Poppins', // Ensure font is loaded
        fontSize: 16,
        fontWeight: 'normal',
    },
    choose: {
        position: 'absolute',
        width: 127,
        height: 18,
        left: 34,
        top: 65,
        fontFamily: 'Poppins', // Ensure this font is loaded correctly
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: 12,
        lineHeight: 18,
        color: '#777777',
    },
    buttonContainer: {
        position: 'absolute',
        top: 100, // Position from the top as specified
        left: 17, // Position from the left
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Space buttons evenly
        marginBottom: 10, // Space between rows
    },
    inputbox: {
        width: 87, // Width as specified
        height: 30, // Height as specified
        backgroundColor: '#FFFFFF',
        borderColor: '#373F41',
        borderWidth: 0.5, // Border thickness
        borderRadius: 5,
        justifyContent: 'center', // Center text vertically
        alignItems: 'center', // Center text horizontally
        marginHorizontal: 5, // Horizontal gap between buttons
    },
    buttonText: {
        fontFamily: 'Poppins', // Ensure this font is loaded
        fontSize: 14, // Adjust font size as needed
        color: '#373F41', // Text color
    },
    desiredamount: {
        position: 'absolute',
        width: 180, // Adjust width as necessary
        height: 18,
        left: 35,
        top: 390, // Adjust top position as necessary
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: 12,
        lineHeight: 18,
        color: '#777777',
    },
    inputContainer: {
        flexDirection: 'row', // Aligns children in a row
        alignItems: 'center', // Centers items vertically
        top: 365,
        left: 50,
    },
    numberInput: {
        boxSizing: 'border-box',
        width: 127,
        height: 30,
        backgroundColor: '#FFFFFF',
        borderColor: '#373F41',
        borderWidth: 0.5,
        borderRadius: 5,
        marginRight: 10, // Space between input and dropdown
        textAlign: 'center', // Center the text in the input
        top: 15,
        left: -10,
    },
    dropdown: {
        position: 'absolute', // Absolute positioning
        width: 130,
        height: 30,
        left: 137, // Adjust as needed
        top: -1, // Adjust as needed
        backgroundColor: '#FFFFFF',
        borderColor: '#373F41',
        borderWidth: 0.5,
        borderRadius: 5,
    },
    mode: {
        position: 'absolute',
        width: 105,
        height: 18,
        left: 163, // Adjust as needed
        top: -20, // Adjust as needed
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: 12,
        lineHeight: 18,
        color: '#777777',
    },
    confirm: {
        position: 'absolute',
        width: 119,
        height: 35,
        left: 100, // Adjust as needed
        top: 290, // Adjust as needed
        backgroundColor: '#373F41',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmText: {
        color: '#F9A602', // Changed color
        fontSize: 13, // Updated font size
        fontWeight: '600', // Updated font weight
        textAlign: 'center',
        textTransform: 'uppercase', // Added text transformation
    },
    navbar: {
        position: 'absolute',
        width: 360,
        height: 47,
        left: 0,
        top: 719,
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
    tintColor: '#F9A602', // Tint color
    flex: 0, // Equivalent to `flex: none`
    order: 0, // Not applicable in React Native, but kept for reference
    flexGrow: 0, // Ensures it does not grow
    left: 5,
},
funds: {
    width: 30,
    height: 30,
    tintColor: '#FFFFFF', // Tint color
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
