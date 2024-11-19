import { View, Image, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';  // <-- Add this import
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import UUID from 'react-native-uuid';
import { supabase } from './supabase';

const Loans = () => {
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

const styles = StyleSheet.create({
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
        position: 'relative',
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
    loaninfo: {
        position: 'absolute',
        width: 312,
        height: 250,
        left: 25,
        top: 75,
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        padding: 16,
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
        gap: 27,
        position: 'absolute',
        width: 73,
        height: 176,
        left: 25,
        top: 20,
    },
    loantype: {
        fontSize: 15,
        color: '#373F41',
    },
    amount: {
        fontSize: 15,
        color: '#373F41',
    },
    interest: {
        fontSize: 15,
        color: '#373F41',
    },
    loanterms: {
        fontSize: 15,
        color: '#373F41',
    },
    monthlypayment: {
        fontSize: 15,
        color: '#373F41',
    },
    fillin: {
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        width: 200,
        height: 100,
        top: -35,
        left: 80,
        marginTop: 10,
    },
    picker: {
        height: 0, // Adjusted height for the Picker
        width: '100%',
        marginBottom: 10, // Reduced margin for better spacing
    },
    input: {
        height: 30, // Adjusted height for the TextInput
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10, // Reduced margin for better spacing
        width: '100%',
    },
    applyloan: {
       
        width: 95,
        height: 30,
        left: 129,
        top: 150,
        backgroundColor: '#373F41',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    aploan: {
        color: '#F9A602',
        fontSize: 14,
    },
    table: {
        position: 'absolute',
        width: 338,
        left: 9,
        top: 404,
        backgroundColor: '#FFFFFF',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#373F41',
    },
    headerText: {
        flex: 1,
        color: '#F9A602',
        textAlign: 'center',
    },
    dataRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    dataText: {
        flex: 1,
        color: '#373F41',
        textAlign: 'center',
    },
    navbar: {
        position: 'absolute',
        width: 360,
        height: 47,
        left: 0,
        top: 719,
        backgroundColor: '#373F41',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 5,
    },
    announcement: {
        width: 30,
        height: 30,
        tintColor: '#F9A602',
    },
    funds: {
        width: 30,
        height: 30,
        tintColor: '#F9A602',
    },
    dashboard: {
        width: 30,
        height: 30,
        tintColor: '#F9A602',
    },
    loans: {
        width: 30,
        height: 30,
        tintColor: '#FFFFFF',
    },
    history: {
        width: 30,
        height: 30,
        tintColor: '#F9A602',
    },
});

export default Loans;
