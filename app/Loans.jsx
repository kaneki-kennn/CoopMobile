import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Dimensions,
  Button,
  handleLogoClick, 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import UUID from 'react-native-uuid';
import { supabase } from './supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Loans = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params || {};
  const handleLogout = async () => {
    try {
      // Supabase sign-out
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear session data
      await AsyncStorage.clear();

      // Redirect to login
      navigation.replace('Login');
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  const [loanType, setLoanType] = useState('regular');
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [loanTerms, setLoanTerms] = useState('6 months');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [loans, setUserLoans] = useState(null);
  const [loadingUserLoans, setLoadingUserLoans] = useState(true);
  const [errorUserLoans, setErrorUserLoans] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedLoan, setSelectedLoan] = useState(null); // Store loan details for the modal
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility

  const handleEmailClick = () => {
    setIsModalVisible(true); // Show the modal
  };

  const handleLogoClick = () => {
    alert('Coop clicked! The page will refresh.');
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const calculateMonthlyPayment = () => {
    if (!amount || !interest || !loanTerms) return '';

    const principal = parseFloat(amount);
    const rate = parseFloat(interest) / 100 / 12; // Convert annual interest to monthly
    const terms = parseInt(loanTerms.split(' ')[0]); // Number of payments

    if (isNaN(principal) || isNaN(rate) || isNaN(terms)) return ''; // Validate numbers

    const calculatedPayment =
      (principal * rate * Math.pow(1 + rate, terms)) /
      (Math.pow(1 + rate, terms) - 1);

    return calculatedPayment.toFixed(2); // Return formatted monthly payment
  };

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
        number_of_payments: parseInt(loanTerms.split(' ')[0]),
        date_sent: new Date(),
      };

      const { data, error } = await supabase
        .from('Loan_applications')
        .insert([loanApplicationData]);

      if (error) throw error;

      alert(`Loan application for ${amount} submitted for approval.`);
      setLoanType('regular');
      setAmount('');
      setInterest('');
      setLoanTerms('6 months');
      setMonthlyPayment('');
    } catch (err) {
      console.error('Loan application submission error:', err);
      alert('Loan application request failed. Please try again.');
    }
  };

  const fetchUserLoans = async () => {
    setLoadingUserLoans(true);
    setErrorUserLoans(null);

    try {
      const { data, error } = await supabase
        .from('Loans')
        .select(
          'loan_id, loan_type, loan_amount, interest, start_date, end_date, loan_term')
        .eq('user_id', userId)
        .eq('loan_status', 'active');

      if (error) {
        console.error('Error fetching Loans:', error);
        throw error;
      }

      setUserLoans(data || []); // Set loans or an empty array if no data
    } catch (err) {
      setErrorUserLoans('Failed to fetch Loans.');
      console.error(err);
    } finally {
      setLoadingUserLoans(false);
    }
  };

  useEffect(() => {
    fetchUserLoans();
  }, [refreshKey]);

  const handleRowPress = (loan) => {
    setSelectedLoan(loan); // Set selected loan data
    setIsModalVisible(true); // Show modal
  };

  const closeModal = () => {
    setSelectedLoan(null);
    setIsModalVisible(false);
  };

    return (
        <View style={styles.container}>
 <View style={styles.header}>
        {/* Logo */}
        <TouchableOpacity onPress={handleLogoClick}>
          <Image
            source={require('./../assets/images/COOP LOGO.png')}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Notification Bell Icon */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Notification', { userId })}
          style={styles.bellContainer}
        >
          <Image source={require('./../assets/images/bell.png')} style={styles.bell} />
        </TouchableOpacity>

        {/* Email Icon */}
        <TouchableOpacity onPress={handleEmailClick} style={styles.emailContainer}>
          <Image
            source={require('./../assets/images/email.png')}
            style={styles.email}
          />
        </TouchableOpacity>

        {/* Profile Icon */}
        <TouchableOpacity
           onPress={handleLogout}
          style={styles.profileContainer}
        >
          <Image
            source={require('./../assets/images/profile.png')}
            style={styles.profile}
          />
        </TouchableOpacity>

        {/* Modal for Email Popup */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeModal}
        >
          <View style={styles.modalBack}>
            <View style={styles.modalCon}>
              <Text style={styles.modalTxt}>Please open your Gmail App to view email.</Text>
              <Button title="Open" onPress={closeModal} />
            </View>
          </View>
        </Modal>
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
        {loadingUserLoans ? (
          <ActivityIndicator size="large" color="#F9A602" />
        ) : errorUserLoans ? (
          <Text style={{ color: 'red' }}>{errorUserLoans}</Text>
        ) : loans.length === 0 ? (
          <Text style={styles.dataText}>There are no loans</Text>
        ) : (
          <>
            {/* Header Row */}
            <View style={styles.headerRow}>
              <Text style={styles.headerText}>Loan ID</Text>
              <Text style={styles.headerText}>Type</Text>
              <Text style={styles.headerText}>Start Date</Text>
              <Text style={styles.headerText}>End Date</Text>
            </View>

            {/* Data Rows */}
            {loans.map((loan) => (
              <TouchableOpacity
                key={loan.loan_id}
                onPress={() => handleRowPress(loan)}
              >
                <View style={styles.dataRow}>
                  <Text style={styles.dataText}>{loan.loan_id}</Text>
                  <Text style={styles.dataText}>{loan.loan_type}</Text>
                  <Text style={styles.dataText}>{loan.start_date}</Text>
                  <Text style={styles.dataText}>{loan.end_date}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>

      {/* Modal for Loan Details */}
      {selectedLoan && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Loan Details</Text>
              <Text style={styles.modalText}>
                Name: {userId} {/* Replace with actual user name if available */}
              </Text>
              <Text style={styles.modalText}>
                Loan Amount: {selectedLoan.loan_amount}
              </Text>
              <Text style={styles.modalText}>
                Loan Interest Rate: {selectedLoan.interest}%
              </Text>
              <Text style={styles.modalText}>
                Loan Term: {selectedLoan.loan_term}
              </Text>
              <Text style={styles.modalText}>
                Monthly Payment: {selectedLoan.monthly_payment}
              </Text>
              <Text style={styles.modalText}>
                Total Amount to be Paid:{' '}
                {(
                  selectedLoan.monthly_payment *
                  selectedLoan.loan_term.split(' ')[0]
                ).toFixed(2)}
              </Text>
              <Text style={styles.modalText}>
                Loan Period: {selectedLoan.start_date} - {selectedLoan.end_date}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}


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
    modalBack: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalCon: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: width * 0.8, // Set modal width to 80% of the screen width
        height: height * 0.3, // Set modal height to 30% of the screen height
        maxWidth: 350,  // Maximum width of modal
        maxHeight: 150, // Maximum height of modal
      },
      modalTxt: {
        marginBottom: 20,
        fontSize: width > 350 ? 18 : 16, // Adjust font size based on screen width
        textAlign: 'center',  // Make text centered
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
      },
      modalContent: {
        backgroundColor: 'white',
        padding: width * 0.05, // 5% of screen width for padding
        borderRadius: 10,
        width: width * 0.8, // 80% of screen width
        maxHeight: height * 0.8, // 80% of screen height to prevent overflow
        alignItems: 'center',
        position: 'absolute',
        top: height * 0.2, // 10% from top of the screen
      },
      modalTitle: {
        fontSize: width * 0.07, // 7% of screen width for title font size
        fontWeight: 'bold',
        marginBottom: height * 0.02, // 2% of screen height for bottom margin
      },
      modalText: {
        fontSize: width * 0.05, // 5% of screen width for text font size
        marginBottom: height * 0.02, // 2% of screen height for bottom margin
        color: '#333',
      },
       closeButton: {
    marginTop: height * 0.03, // 3% of screen height for spacing
    backgroundColor: '#F9A602',
    paddingVertical: height * 0.015, // 1.5% of screen height
    paddingHorizontal: width * 0.1, // 10% of screen width for padding
    borderRadius: 5,
  },
      closeButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
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
