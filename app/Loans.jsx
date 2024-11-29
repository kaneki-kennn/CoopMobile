import { View, Image, TouchableOpacity, Text, TextInput, StyleSheet, handleRowPress } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';  // <-- Add this import
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import UUID from 'react-native-uuid';
import { supabase } from './supabase';
import { Dimensions } from 'react-native';


const Loans = () => {
    const handleRowPress = (index) => {
      };
    const navigation = useNavigation();  // Now this will work
    const route = useRoute();
    const { userId } = route.params || {}; 

    const [loanType, setLoanType] = useState("regular");
    const [amount, setAmount] = useState("");
    const [interest, setInterest] = useState("");
    const [loanTerms, setLoanTerms] = useState("6 months");
    const [monthlyPayment, setMonthlyPayment] = useState(""); 

    const handleLogoClick = () => {
        alert("Coop clicked! The page will refresh.");
    };

    const calculateMonthlyPayment = () => {
        if (!amount || !interest || !loanTerms) return ""; 

        const principal = parseFloat(amount);
        const rate = parseFloat(interest) / 100 / 12;  
        const terms = parseInt(loanTerms.split(" ")[0]); // Number of payments

        if (isNaN(principal) || isNaN(rate) || isNaN(terms)) return ""; // Validate numbers

        const calculatedPayment = (principal * rate * Math.pow(1 + rate, terms)) /
            (Math.pow(1 + rate, terms) - 1);
        
        return calculatedPayment.toFixed(2); // Return formatted monthly payment
    };

    // Update monthlyPayment whenever amount, interest, or loanTerms changes
    useEffect(() => {
        const payment = calculateMonthlyPayment();
        setMonthlyPayment(payment);
    }, [amount, interest, loanTerms]);

    const applyLoan = async () => {
        if (!loanType || !amount || !interest || !loanTerms) {
            console.error('Missing loan type, amount, interest, or loan terms');
            return;
        }

        try {
            const loanApplicationData = {
                application_id: UUID.v4(),
                user_id: userId,
                application_status: 'pending',
                loan_type: loanType,
                interest: parseFloat(interest),
                amount: parseFloat(amount),
                monthly_payment: parseFloat(monthlyPayment),
                loan_term: loanTerms,
                number_of_payments: parseInt(loanTerms.split(" ")[0]),
                date_sent: new Date(),
            };

            const { data, error } = await supabase
                .from('Loan_applications')
                .insert([loanApplicationData]);

            if (error) throw error;

            alert(`Loan application for ${amount} submitted for approval.`);
            setLoanType("regular");
            setAmount("");
            setInterest("");
            setLoanTerms("6 months");
            setMonthlyPayment(""); // Reset monthly payment
        } catch (err) {
            console.error("Loan application submission error:", err);
            alert("Loan application request failed. Please try again.");
        }
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
                <TouchableOpacity onPress={() => alert("Bell clicked! Notifications.")} style={styles.bellContainer}>
                    <Image
                        source={require('./../assets/images/bell.png')}
                        style={styles.bell}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert("Email clicked! Check your inbox.")} style={styles.emailContainer}>
                    <Image
                        source={require('./../assets/images/email.png')}
                        style={styles.email}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert("Profile clicked! View your profile.")} style={styles.profileContainer}>
                    <Image
                        source={require('./../assets/images/profile.png')}
                        style={styles.profile}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.loaninfo}>
            <View style={styles.loanguide}>
                <Text style={styles.loantype}>Loan Type</Text>
                <Text style={styles.amount}>Amount</Text>
                <Text style={styles.interest}>Interest</Text>
                <Text style={styles.loanterms}>Loan Terms</Text>
                <Text style={styles.monthlypayment}>Monthly Payment</Text>
            </View>
            <View style={styles.fillin}>
                <Picker
                    selectedValue={loanType}
                    style={styles.picker}
                    onValueChange={(itemValue) => setLoanType(itemValue)}
                >
                    <Picker.Item label="Regular" value="regular" />
                    <Picker.Item label="Home" value="Home" />
                    <Picker.Item label="Car" value="Car" />
                </Picker>

                <TextInput
                    style={styles.input}
                    placeholder="Enter Amount"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter Interest Rate"
                    keyboardType="numeric"
                    value={interest}
                    onChangeText={setInterest}
                />

                <Picker
                    selectedValue={loanTerms}
                    style={styles.picker}
                    onValueChange={(itemValue) => setLoanTerms(itemValue)}
                >
                    <Picker.Item label="6 Months" value="6 months" />
                    <Picker.Item label="12 Months" value="12 months" />
                    <Picker.Item label="24 Months" value="24 months" />
                </Picker>

                <TextInput
                    style={styles.input}
                    placeholder="Monthly Payment"
                    keyboardType="numeric"
                    value={monthlyPayment}
                    editable={false}  // Make monthly payment read-only
                />
            </View>

            <TouchableOpacity style={styles.applyloan} onPress={applyLoan}>
                <Text style={styles.aploan}>Apply Loan</Text>
            </TouchableOpacity>
        </View>

            <View style={styles.table}>
                {/* Header Row */}
                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>Loan ID</Text>
                    <Text style={styles.headerText}>Type</Text>
                    <Text style={styles.headerText}>Start Date</Text>
                    <Text style={styles.headerText}>End Date</Text>
                </View>

                {/* Data Rows */}
                {Array.from({ length: 4 }).map((_, index) => (
                    <TouchableOpacity key={index} onPress={() => handleRowPress(index)}>
                        <View style={styles.dataRow}>
                            <Text style={styles.dataText}>Data {index + 1}</Text>
                            <Text style={styles.dataText}>Type {index + 1}</Text>
                            <Text style={styles.dataText}>Start {index + 1}</Text>
                            <Text style={styles.dataText}>End {index + 1}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

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
    loaninfo: {
        position: 'absolute',
        width: width * 0.9, // 80% of the screen width
        height: height * 0.35, // 35% of the screen height
        left: width * 0.05, // 10% from the left
        top: height * 0.1, // 10% from the top
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        padding: width * 0.04, // Padding scales with screen width (4% of screen width)
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
    },    
    loanguide: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 0,
        gap: height * 0.04, // Gap between elements scales with screen height (3% of screen height)
        position: 'absolute',
        width: width * 0.2, // 20% of the screen width for the loanguide container
        height: height * 0.4, // 30% of the screen height
        left: width * 0.06, // 10% from the left edge
        top: height * 0.03, // 5% from the top of the container
    },
    
    loantype: {
        top: height * -0.01, // 5% from the top of the container
        fontSize: width * 0.04, // Font size scales with screen width (4% of screen width)
        color: '#373F41',
    },
    
    amount: {
        top: height * -0.01, // 5% from the top of the container
        fontSize: width * 0.04, // Font size scales with screen width (4% of screen width)
        color: '#373F41',
    },
    
    interest: {
        top: height * -0.01, // 5% from the top of the container
        fontSize: width * 0.04, // Font size scales with screen width (4% of screen width)
        color: '#373F41',
    },
    
    loanterms: {
        fontSize: width * 0.04, // Font size scales with screen width (4% of screen width)
        color: '#373F41',
    },
    
    monthlypayment: {
        fontSize: width * 0.04, // Font size scales with screen width (4% of screen width)
        color: '#373F41',
    },
    fillin: {
        marginTop: height * 0.02, // 2% of screen height for margin top
        padding: width * 0.03, // 4% of screen width for padding
        borderRadius: 10,
        width: width * 0.6, // 60% of screen width for width
        height: height * 0.2, // 20% of screen height for height
        top: -height * 0.06, // Adjusted top position based on screen height
        left: width * 0.2, // 20% from the left
    },
    picker: {
        height: height * 0.04, // Set a more appropriate height for the Picker
        width: '100%',
        marginBottom: height * 0.02, // Adjusted margin for spacing
    },
    
    input: {
        height: height * 0.04, // Adjusted height based on screen height (5%)
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: width * 0.04, // Horizontal padding relative to screen width
        marginBottom: height * 0.02, // Adjusted margin for spacing
        width: '100%', // Ensure input takes full width
    },
    applyloan: {
        width: width * 0.3, // 50% of screen width for apply button width
        height: height * 0.05, // 6% of screen height for better button height
        left: width * 0.25, // Centered horizontally on screen
        top: height * 0.15, // Adjusted to avoid overlap, 60% from top of the screen
        backgroundColor: '#373F41',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        zIndex: 2, // Ensure it stays on top of other components
    },    
    aploan: {
        color: '#F9A602',
        fontSize: width * 0.04, // Font size scales with screen width
    },
    table: {
        position: 'absolute',
        width: width * 0.85, // 85% of screen width for the table width
        left: width * 0.07, // 7% from the left edge of the screen
        top: height * 0.6, // Start table from middle of the screen
        backgroundColor: '#FFFFFF',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height * 0.02, // Vertical padding based on screen height
        paddingHorizontal: width * 0.03, // Horizontal padding based on screen width
        backgroundColor: '#373F41',
    },
    headerText: {
        flex: 1,
        color: '#F9A602',
        textAlign: 'center',
        fontSize: width * 0.04, // Font size scales with screen width
    },
    dataRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height * 0.02, // Vertical padding based on screen height
        paddingHorizontal: width * 0.03, // Horizontal padding based on screen width
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    dataText: {
        flex: 1,
        color: '#373F41',
        textAlign: 'center',
        fontSize: width * 0.035, // Font size scales with screen width
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
        tintColor: '#F9A602', // Tint color
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
        tintColor: '#FFFFFF', // Tint color
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
  });

export default Loans;
