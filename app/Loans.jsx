import { View, Image, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function Loans() {
    const router = useRouter();
    
    // State for dropdowns and inputs
    const [loanType, setLoanType] = useState("Personal");
    const [amount, setAmount] = useState("");
    const [interest, setInterest] = useState("");
    const [loanTerms, setLoanTerms] = useState("6 Months");
    const [monthlyPayment, setMonthlyPayment] = useState("");

    const handleLogoClick = () => {
        alert("Coop clicked! The page will refresh.");
    };

    // Define the handleRowPress function
    const handleRowPress = (index) => {
        console.log(`Row ${index + 1} clicked`);
        // You can add any additional logic here if needed
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
                    {/* First Dropdown Menu */}
                    <Picker
                        selectedValue={loanType}
                        style={styles.picker}
                        onValueChange={(itemValue) => setLoanType(itemValue)}
                    >
                        <Picker.Item label="Personal" value="Personal" />
                        <Picker.Item label="Home" value="Home" />
                        <Picker.Item label="Car" value="Car" />
                    </Picker>

                    {/* Amount Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Amount"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />

                    {/* Interest Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Interest Rate"
                        keyboardType="numeric"
                        value={interest}
                        onChangeText={setInterest}
                    />

                    {/* Loan Terms Dropdown Menu */}
                    <Picker
                        selectedValue={loanTerms}
                        style={styles.picker}
                        onValueChange={(itemValue) => setLoanTerms(itemValue)}
                    >
                        <Picker.Item label="6 Months" value="6 Months" />
                        <Picker.Item label="12 Months" value="12 Months" />
                        <Picker.Item label="24 Months" value="24 Months" />
                    </Picker>

                    {/* Monthly Payment Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Monthly Payment"
                        keyboardType="numeric"
                        value={monthlyPayment}
                        onChangeText={setMonthlyPayment}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.applyloan}>
                <Text style={styles.aploan}>Apply Loan</Text>
            </TouchableOpacity>

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
                <TouchableOpacity onPress={()=>router.push('Annoucement')}>
                    <Image style={styles.announcement} source={require('./../assets/images/megaphone.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>router.push('Funds')}>
                    <Image style={styles.funds} source={require('./../assets/images/dollar-bill.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>router.push('Dashboard')}>
                    <Image style={styles.dashboard} source={require('./../assets/images/dashboard.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('Loans')}>
                    <Image style={styles.loans} source={require('./../assets/images/personal.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>router.push('History')}>
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
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: '#373F41',
    },
    amount: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: '#373F41',
    },
    interest: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: '#373F41',
    },
    loanterms: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: '#373F41',
    },
    monthlypayment: {
        fontFamily: 'Poppins-SemiBold',
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
        position: 'absolute',
        width: 95,
        height: 30,
        left: 129,
        top: 350,
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
        fontFamily: 'Poppins-SemiBold',
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
        fontFamily: 'Poppins-SemiBold',
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
        fontFamily: 'Poppins-Regular',
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
