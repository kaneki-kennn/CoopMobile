import {
    View,
    Image,
    TouchableOpacity,
    Text,
    TextInput,
    ActivityIndicator,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { Picker } from "@react-native-picker/picker";
  import { useRoute, useNavigation } from "@react-navigation/native";
  import UUID from "react-native-uuid";
  import { supabase } from "./supabase";
  import { Dimensions } from 'react-native';
  
  const Funds = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params || {};
  
    if (!userId) {
      console.log("User ID is not available in route params");
    } else {
      console.log("Logged-in user ID:", userId);
    }
  
    const [savings, setSavings] = useState(null);
    const [cbu, setCbu] = useState(null);
    const [loadingSavings, setLoadingSavings] = useState(true);
    const [loadingCbu, setLoadingCbu] = useState(true);
    const [errorSavings, setErrorSavings] = useState(null);
    const [errorCbu, setErrorCbu] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
  
    const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);
    const [savingsId, setSavingsId] = useState(null);
    const [cbuId, setCbuId] = useState(null);

    const [loadingInterest, setLoadingInterest] = useState(false);
const [errorInterest, setErrorInterest] = useState(null);
const [interest, setInterest] = useState(null);

const [loadingTotalRevenue, setLoadingTotalRevenue] = useState(false);
const [errorTotalRevenue, setErrorTotalRevenue] = useState(null);
const [totalRevenue, setTotalRevenue] = useState(null);
  
    const fetchUserCbu = async () => {
      setLoadingCbu(true);
      setErrorCbu(null);
  
      try {
        const { data, error } = await supabase
          .from("Cbus")
          .select("cbu_id, amount")
          .eq("user_id", userId)
          .single();
  
        if (error) throw error;
  
        setCbu(data?.amount || 0);
        setCbuId(data?.cbu_id);
      } catch (err) {
        setErrorCbu("Failed to fetch CBU.");
      } finally {
        setLoadingCbu(false);
      }
    };
  
    const fetchUserSavings = async () => {
      setLoadingSavings(true);
      setErrorSavings(null);
  
      try {
        const { data, error } = await supabase
          .from("Savings")
          .select("savings_id, amount")
          .eq("user_id", userId)
          .single();
  
        if (error) throw error;
  
        setSavings(data?.amount || 0);
        setSavingsId(data?.savings_id);
      } catch (err) {
        setErrorSavings("Failed to fetch savings.");
      } finally {
        setLoadingSavings(false);
      }
    };
  
    useEffect(() => {
      if (userId) {
        console.log("Fetching savings and CBU for User ID:", userId);
        fetchUserSavings();
        fetchUserCbu();
      }
    }, [userId, refreshKey]);
  
    const handleSelect = (option) => {
      setSelectedOption(option);
    };
  
    const handleActionSelect = (action) => {
      setSelectedAction(action);
    };
  
    const handleTransaction = async () => {
      if (!selectedAction || !amount || !selectedPaymentMode || !selectedOption) {
        console.error(
          "Missing action, amount, payment mode, or selected option"
        );
        return;
      }
  
      const transactionee =
        selectedOption === "savings" ? "Savtransactions" : "Cbutransactions";
      const transactionIdKey =
        selectedOption === "savings" ? "savtransaction_id" : "cbutransaction_id";
  
      const additionalData =
        selectedOption === "savings" ? { savings_id: savingsId } : { cbu_id: cbuId };
  
      try {
        const transactionData = {
          [transactionIdKey]: UUID.v4(),
          user_id: userId,
          amount: parseFloat(amount),
          transaction_type: selectedAction,
          status: "pending",
          mode: selectedPaymentMode,
          date_sent: new Date(),
          ...additionalData,
        };
  
        const { data, error } = await supabase
          .from(transactionTable)
          .insert([transactionData]);
  
        if (error) throw error;
  
        alert(`${selectedAction} request of ${amount} submitted for approval.`);
        setSelectedAction(null);
        setAmount("");
      } catch (err) {
        console.error("Transaction submission error:", err);
        alert("Transaction request failed. Please try again.");
      }
    };
  
    const handleLogoClick = () => {
      alert("Coop clicked! The page will refresh.");
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleLogoClick}>
            <Image
              source={require("./../assets/images/COOP LOGO.png")}
              style={styles.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert("Bell clicked! Notifications.")}
            style={styles.bellContainer}
          >
            <Image
              source={require("./../assets/images/bell.png")}
              style={styles.bell}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert("Email clicked! Check your inbox.")}
            style={styles.emailContainer}
          >
            <Image
              source={require("./../assets/images/email.png")}
              style={styles.email}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert("Profile clicked! View your profile.")}
            style={styles.profileContainer}
          >
            <Image
              source={require("./../assets/images/profile.png")}
              style={styles.profile}
            />
          </TouchableOpacity>
        </View>
  
          <View style={styles.radioButtonContainer}>
          <View style={styles.savings}>
  <TouchableOpacity onPress={() => handleSelect("savings")}>
    {loadingSavings ? (
      <ActivityIndicator size="small" color="#F9A602" style={styles.spinner} />
    ) : errorSavings ? ( 
      <Text style={{ color: "red" }}>{errorSavings}</Text>
    ) : ( 
      <View
        style={[
          styles.radioButton,
          selectedOption === "savings" && styles.selectedRadio,
        ]}
      >
        <Text style={styles.savingsText}>Savings</Text>
        <Text style={styles.savingsBal}>
          {savings !== null && !isNaN(savings)
            ? `${savings.toFixed(2)}`
            : "No savings found"}
        </Text>
      </View>
    )}
  </TouchableOpacity>
</View>




  <View style={styles.cbu}>
  <TouchableOpacity onPress={() => handleSelect("cbu")}>
    {loadingCbu ? (
      <ActivityIndicator size="small" color="#373F41" style={styles.activityIndicator2} />
    ) : errorCbu ? (
      <Text style={{ color: "red" }}>{errorCbu}</Text>
    ) : (
      <View
        style={[
          styles.radioButton,
          selectedOption === "cbu" && styles.selectedRadio,
        ]}
      >
        <Text style={styles.cbuText}>CBU</Text>
        <Text style={styles.cbuBal}>
          {cbu !== null && !isNaN(cbu)
            ? `${cbu.toFixed(2)}`
            : "No CBU found"}
        </Text>
      </View>
    )}
  </TouchableOpacity>
</View>

<View style={styles.interest}>
          <TouchableOpacity onPress={() => handleSelect("interest")}>
            {loadingInterest ? (
              <ActivityIndicator size="small" color="#FFA500" style={styles.spinner} />
            ) : errorInterest ? (
              <Text style={{ color: "red" }}>{errorInterest}</Text>
            ) : (
              <View
                style={[
                  styles.radioButton,
                  selectedOption === "interest" && styles.selectedRadio,
                ]}
              >
                <Text style={styles.interestText}>Interest</Text>
                <Text style={styles.interestBal}>
                  {interest !== null && !isNaN(interest)
                    ? `${interest.toFixed(2)}`
                    : "No interest found"}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
  
        <View style={styles.totalRevenue}>
          <TouchableOpacity onPress={() => handleSelect("totalRevenue")}>
            {loadingTotalRevenue ? (
              <ActivityIndicator size="small" color="#800080" style={styles.spinner} />
            ) : errorTotalRevenue ? (
              <Text style={{ color: "red" }}>{errorTotalRevenue}</Text>
            ) : (
              <View
                style={[
                  styles.radioButton,
                  selectedOption === "totalRevenue" && styles.selectedRadio,
                ]}
              >
                <Text style={styles.totalRevenueText}>Total Revenue</Text>
                <Text style={styles.totalRevenueBal}>
                  {totalRevenue !== null && !isNaN(totalRevenue)
                    ? `${totalRevenue.toFixed(2)}`
                    : "None"}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

</View>

  
        <View style={styles.tabularform}>
          <View style={styles.radioButtonContainer}>
            <TouchableOpacity
              style={[
                styles.deposit,
                selectedAction === "deposit" && styles.selected,
              ]}
              onPress={() => handleActionSelect("deposit")}
            >
              <Text style={styles.depositText}>Deposit</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={[
                styles.withdraw,
                selectedAction === "withdraw" && styles.selected,
              ]}
              onPress={() => handleActionSelect("withdraw")}
            >
              <Text style={styles.withdrawText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
  
                
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
                <TouchableOpacity style={styles.confirm} onPress={handleTransaction}>
                    <Text style={styles.confirmText}>Confirm</Text>
                </TouchableOpacity>
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

const { width, height } = Dimensions.get('window');
const styles = {
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
    savings: {
      position: 'absolute',
      width: width * 0.4, // 40% of the screen width
      height: height * 0.08, // 8% of the screen height
      left: width * 0.05, // 5% from the left edge of the screen
      top: height * 0.05, // 12% from the top edge of the screen
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
      width: width * 0.2, // 20% of screen width
      height: height * 0.03, // 3% of screen height
      left: width * 0.03, // 3% from the left of the screen
      top: height * 0.01, // 2% from the top of the screen
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: width * 0.04, // Font size scales with screen width (4% of screen width)
      lineHeight: height * 0.03, // Line height scales with screen height (3% of screen height)
      color: '#F9A602',
    },
    savingsBal: {
      position: 'absolute',
      width: width * 0.3, // 30% of screen width
      height: height * 0.04, // 4% of screen height
      left: width * 0.10, // 5% from the left of the screen
      top: height * 0.03, // 8% from the top of the screen
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: width * 0.05, // Font size scales with screen width (5% of screen width)
      lineHeight: height * 0.04, // Line height scales with screen height (4% of screen height)
      color: '#F9A602',
    },
    activityIndicator2: {
      alignSelf: 'center', // Center the ActivityIndicator horizontally
      marginTop: height * 0.02, // Adjust marginTop to be 2% of screen height
    },
    spinner: {
      alignSelf: 'center', // Center the spinner horizontally
      marginTop: height * 0.02, // Adjust marginTop to be 2% of screen height
    },
    cbu: {
      position: 'absolute',
      width: width * 0.4, // 40% of the screen width
      height: height * 0.08, // 8% of the screen height
      left: width * 0.55, // 47% from the left edge of the screen (adjusted for positioning next to savings)
      top: height * 0.05, // 12% from the top edge of the screen (same as savings for alignment)
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
      width: width * 0.15, // Adjust width to be 15% of screen width
      height: height * 0.03, // Adjust height based on screen height
      left: width * 0.03, // Adjust left position to be 2% of screen width
      top: height * 0.01, // Adjust top position to be 2% of screen height
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: width * 0.035, // Font size is 3.5% of screen width
      lineHeight: width * 0.045, // Line height is 4.5% of screen width
      color: '#373F41',
    },
    cbuBal: {
      position: 'absolute',
      width: width * 0.25, // Adjust width to be 25% of screen width
      height: height * 0.04, // Adjust height based on screen height
      left: width * 0.10, // Adjust left position to be 10% of screen width
      top: height * 0.04, // Adjust top position to be 5% of screen height
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: width * 0.05, // Font size is 4% of screen width
      lineHeight: width * 0.05, // Line height is 5% of screen width
      color: '#373F41',
    },
    interest: {
      position: 'absolute',
      width: width * 0.4, // 40% of the screen width
      height: height * 0.08, // 8% of the screen height
      left: width * 0.55, // Positioned at 55% of screen width
      top: height * 0.15, // Positioned at the same top margin as savings
      backgroundColor: '#373F41', // Different background color for distinction
      borderWidth: 1,
      borderColor: '#FFFFFF',
      shadowColor: '#373F41',
      shadowOffset: { width: 5, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      borderRadius: 10,
      elevation: 5, // For Android shadow
    },
    interestText: {
      position: 'absolute',
      width: width * 0.2, // 20% of screen width
      height: height * 0.03, // 3% of screen height
      left: width * 0.03, // 3% from the left of the container
      top: height * 0.01, // 2% from the top of the container
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: width * 0.04, // Scaled font size
      lineHeight: height * 0.03, // Line height scales with screen height
      color: '#F9A602', // Text color for contrast
    },
    interestBal: {
      position: 'absolute',
      width: width * 0.3, // 30% of screen width
      height: height * 0.04, // 4% of screen height
      left: width * 0.10, // 10% from the left of the container
      top: height * 0.03, // 3% from the top of the container
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: width * 0.05, // Scaled font size
      lineHeight: height * 0.04, // Scaled line height
      color: '#F9A602',
    },
    totalRevenue: {
      position: 'absolute',
      width: width * 0.4, // 40% of the screen width
      height: height * 0.08, // 8% of the screen height
      left: width * 0.05, // Positioned at 5% of screen width
      top: height * 0.15, // Positioned below savings
      backgroundColor: '#F9A602', // Different background color for distinction
      borderWidth: 1,
      borderColor: '#FFFFFF',
      shadowColor: '#373F41',
      shadowOffset: { width: 5, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      borderRadius: 10,
      elevation: 5,
    },
    totalRevenueText: {
      position: 'absolute',
      width: width * 0.3, // 20% of screen width
      height: height * 0.03, // 3% of screen height
      left: width * 0.03, // 3% from the left of the container
      top: height * 0.01, // 2% from the top of the container
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: width * 0.04, // Scaled font size
      lineHeight: height * 0.03, // Scaled line height
      color: '#FFFFFF', // Text color for contrast
    },
    totalRevenueBal: {
      position: 'absolute',
      width: width * 0.5, // 30% of screen width
      height: height * 0.04, // 4% of screen height
      left: width * 0.14, // 10% from the left of the container
      top: height * 0.03, // 3% from the top of the container
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: width * 0.05, // Scaled font size
      lineHeight: height * 0.04, // Scaled line height
      color: '#FFFFFF',
    },
    
    tabularform: {
      position: 'absolute',
      width: width * 0.90, // 85% of the screen width
      height: height * 0.50, // 35% of the screen height
      left: width * 0.05, // 5% of the screen width from the left
      top: height * 0.3, // 20% from the top of the screen
      backgroundColor: '#D9D9D9',
      borderRadius: 10,
    },
    deposit: {
      position: 'absolute',
      width: width * 0.35, // 35% of the screen width
      height: height * 0.04, // 5% of the screen height
      left: width * 0.05, // 5% from the left
      top: height * 0.03, // 5% from the top of the container
      backgroundColor: '#F9A602',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    depositText: {
      color: '#373F41',
      fontSize: width * 0.05, // Font size is 4% of the screen width
      fontWeight: 'normal',
    },
    withdraw: {
      position: 'absolute',
      width: width * 0.35, // 35% of the screen width
      height: height * 0.04, // 5% of the screen height
      left: width * 0.49, // Position the withdraw button 55% from the left
      top: height * 0.03, // 5% from the top of the container
      backgroundColor: '#373F41',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    withdrawText: {
      color: '#FFFFFF',
      fontSize: width * 0.05, // Font size is 4% of the screen width
      fontWeight: 'normal',
    },
    choose: {
      position: 'absolute',
      width: width * 0.3, // 30% of screen width for responsive size
      height: height * 0.03, // 3% of screen height for text size
      left: width * 0.06, // Position from the left, 10% of screen width
      top: height * 0.08, // Position from the top, 7% of screen height
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: width * 0.03, // Font size as 3% of screen width
      lineHeight: height * 0.03, // Line height based on screen height
      color: '#777777',
    },
    buttonContainer: {
      position: 'absolute',
      top: height * 0.12, // Position from the top, 12% of screen height
      left: width * 0.05, // Position from the left, 5% of screen width
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Space buttons evenly
      marginBottom: height * 0.02, // Vertical margin based on screen height
    },
    inputbox: {
      width: width * 0.24, // 25% of screen width for responsive input width
      height: height * 0.04, // 5% of screen height for input box height
      left: width * -0.02,
      backgroundColor: '#FFFFFF',
      borderColor: '#373F41',
      borderWidth: 0.5,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: width * 0.02, // Horizontal margin based on screen width
    },
    buttonText: {
      fontSize: width * 0.04, // Font size as 4% of screen width
      color: '#373F41',
    },
    desiredamount: {
      position: 'absolute',
      width: width * 0.5, // 50% of the screen width
      height: height * 0.02, // 2% of the screen height for font size
      left: width * 0.10, // 10% from the left edge of the screen
      top: height * 0.56, // 49% from the top of the screen
      fontStyle: 'normal',
      fontWeight: '300',
      fontSize: width * 0.03, // Font size is 3.2% of screen width (adjustable)
      lineHeight: height * 0.03, // Line height scales with screen height
      color: '#777777',
    },
inputContainer: {
  flexDirection: 'row', // Aligns children in a row
  alignItems: 'center', // Centers items vertically
  top: height * 0.55, // 38% of the screen height (adjustable)
  left: width * 0.12, // 12% from the left edge (adjustable)
},
numberInput: {
  boxSizing: 'border-box',
  width: width * 0.3, // 40% of the screen width
  height: height * 0.06, // 5% of the screen height
  backgroundColor: '#FFFFFF',
  borderColor: '#373F41',
  borderWidth: 0.5,
  marginRight: width * 0.03, // Space between input and dropdown, adjustable
  textAlign: 'center', // Center the text in the input
  top: height * 0.01, // Adjust the top position
  left: width * -0.02, // Adjust the left position, making it responsive
},
    dropdown: {
      position: 'absolute', // Absolute positioning
      width: width * 0.4, // 40% of the screen width (adjust as needed)
      height: height * 0.05, // 5% of the screen height for dropdown height (adjustable)
      left: width * 0.38, // 40% from the left edge of the screen (adjustable)
      top: height * 0.01, // Adjusted to move the dropdown higher (1% from the top)
      backgroundColor: '#FFFFFF',
      borderColor: '#373F41',
      borderWidth: 0.5,
      borderRadius: 30, // Increased border radius for rounder corners
    },
     
    mode: {
      position: 'absolute',
  width: width * 0.4, // 40% of the screen width (increased width for testing visibility)
  height: height * 0.04, // 4% of the screen height (slightly increased height)
  left: width * 0.47, // Adjusted to make sure it's within visible area
  top: height * -0.05, // Adjust top position for better visibility
  fontStyle: 'normal',
  fontWeight: '300',
  fontSize: width * 0.03, // Increased font size for better visibility
  lineHeight: height * 0.05, // Line height adjusted
  color: '#777777',
  zIndex: 1, // Ensure it is above other elements
    },
    confirm: {
      position: 'absolute',
      width: width * 0.35, // 35% of screen width for the button
      height: height * 0.06, // 6% of screen height for button height
      left: width * 0.27, // Center the button horizontally (width * 0.32 gives a margin from the left)
      top: height * 0.40, // Adjust top position based on screen height
      backgroundColor: '#373F41',
      borderColor: '#FFFFFF',
      borderWidth: 1,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
  },
  confirmText: {
    color: '#F9A602',
    fontSize: width * 0.035, // Font size scales with screen width (3.5% of screen width)
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase', // Makes the text uppercase
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
      tintColor: '#FFFFFF', // Tint color
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
      tintColor: '#F9A602', // Tint color
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
}
export default Funds;