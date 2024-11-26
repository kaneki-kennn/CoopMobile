import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import { Picker } from "@react-native-picker/picker";
  import { useRouter } from "expo-router";
  import { Dimensions } from 'react-native';
  
  export default function History() {
    const router = useRouter(); // Using `useRouter` for navigation
    const [selectedTimeFrame, setSelectedTimeFrame] = useState(""); // State for dropdown
  
    const dataRows = [
      { id: "001", amount: "Php 1000", type: "Deposit", status: "Completed", date: "2023-10-01" },
      { id: "002", amount: "Php 2000", type: "Withdraw", status: "Pending", date: "2023-10-02" },
    ];
  
    const handleLogoClick = () => {
      Alert.alert("Coop clicked!", "The page will refresh."); // Replace with your refresh logic
    };
  
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleLogoClick}>
            <Image
              source={require("./../assets/images/COOP LOGO.png")}
              style={styles.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Alert.alert("Bell clicked!", "Notifications.")}
            style={styles.bellContainer}
          >
            <Image
              source={require("./../assets/images/bell.png")}
              style={styles.bell}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Alert.alert("Email clicked!", "Check your inbox.")}
            style={styles.emailContainer}
          >
            <Image
              source={require("./../assets/images/email.png")}
              style={styles.email}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Alert.alert("Profile clicked!", "View your profile.")}
            style={styles.profileContainer}
          >
            <Image
              source={require("./../assets/images/profile.png")}
              style={styles.profile}
            />
          </TouchableOpacity>
        </View>
  
        {/* Dropdown */}
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedTimeFrame}
            onValueChange={(itemValue) => setSelectedTimeFrame(itemValue)}
            style={styles.dropdown}
          >
            <Picker.Item label="Select Time Frame" value="" />
            <Picker.Item label="Last hour" value="last_hour" />
            <Picker.Item label="Last 24 hours" value="last_24" />
            <Picker.Item label="Last 7 days" value="last_7" />
            <Picker.Item label="Last 4 weeks" value="last_4" />
            <Picker.Item label="All time" value="all_time" />
          </Picker>
        </View>
  
        {/* Table */}
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Request ID</Text>
            <Text style={styles.headerCell}>Amount</Text>
            <Text style={styles.headerCell}>Type</Text>
            <Text style={styles.headerCell}>Status</Text>
            <Text style={styles.headerCell}>Date</Text>
          </View>
          {dataRows.map((row, index) => (
            <TouchableOpacity key={index} style={styles.dataRow}>
              <Text style={styles.dataCell}>{row.id}</Text>
              <Text style={styles.dataCell}>{row.amount}</Text>
              <Text style={styles.dataCell}>{row.type}</Text>
              <Text style={styles.dataCell}>{row.status}</Text>
              <Text style={styles.dataCell}>{row.date}</Text>
            </TouchableOpacity>
          ))}
        </View>
  
        {/* Navbar */}
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => router.push("/Announcement")}>
            <Image
              style={styles.announcement}
              source={require("./../assets/images/megaphone.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/Funds")}>
            <Image
              style={styles.funds}
              source={require("./../assets/images/dollar-bill.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/Dashboard")}>
            <Image
              style={styles.dashboard}
              source={require("./../assets/images/dashboard.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/Loans")}>
            <Image
              style={styles.loans}
              source={require("./../assets/images/personal.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/History")}>
            <Image
              style={styles.history}
              source={require("./../assets/images/history.png")}
            />
          </TouchableOpacity>
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
dropdownContainer: {
  width: width * 0.45, // 60% of the screen width (adjustable)
  height: height * 0.05, // 5% of the screen height for dropdown container height
  marginTop: height * 0.05, // Adjust margin-top relative to screen height
  left: width * 0.50, // Position it 5% from the left side of the screen
  backgroundColor: '#373F41',
  borderRadius: 4,
  overflow: 'hidden',
  zIndex: 10, // Ensures dropdown is above other components if necessary
},
dropdown: {
  height: height * 0.05, // 5% of the screen height for dropdown container height
  width: width * 0.40, // Adjust the width to match your design or preference
  backgroundColor: '#373F41', // Match background color
  paddingHorizontal: 10, // Horizontal padding for better spacing
  paddingVertical: 0, // Remove vertical padding to keep height consistent
  justifyContent: 'center', // Vertically center content
  alignItems: 'center', // Horizontally center content
  flexDirection: 'row', // Ensure text and arrow are in a row
  fontSize: width * 0.03, // Font size based on screen width
  color: '#F9A602', // Text color
  lineHeight: height * 0.05, // Ensure line height matches the dropdown container height
  textAlign: 'center', // Center text horizontally
  left: width * 0.03,
  top: width * -0.02,
},


    item: {
      height: height * 0.05,// Height of each item in the dropdown
      color: '#F9A602', // Set text color of the items to F9A602
      backgroundColor: '#373F41', // Match dropdown background
    },
    table: {
      width: width * 0.9,  // Full width
      marginTop: height * 0.02, // Space from the top
      left: width * 0.05,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#373F41', // Header background
        height: height * 0.05,  // Row height
        justifyContent: 'space-between', // Even spacing
        alignItems: 'center', // Center items vertically
        paddingHorizontal: width * 0.010, // Horizontal padding
    },
    headerCell: {
        flex: 1, // Equal width for each column
        textAlign: 'center', // Center text
        fontWeight: '500',
        fontSize: width * 0.04,
        lineHeight: height * 0.025,
        color: '#F9A602',
    },
    dataRow: {
        flexDirection: 'row',
        backgroundColor: '#F3F3F3', // Data row background
        height: height * 0.05,  // Row height
        justifyContent: 'space-between', // Even spacing
        alignItems: 'center', // Center items vertically
        paddingHorizontal: width * -0.10, // Horizontal padding
    },
    dataCell: {
        flex: 1, // Equal width for each column
        textAlign: 'center', // Center text
        fontSize: width * 0.035,
        lineHeight: height * 0.025,
        color: '#000000', // Text color for data
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
      tintColor: '#F9A602', // Tint color
      flex: 0, // Ensures it does not grow or shrink
      left: width * -0.01, // Adjust position slightly left
  },     
  history: {
      width: width * 0.08, // 7% of the screen width for a consistent size
      height: height * 0.035, // 3.5% of the screen height
      tintColor: '#FFFFFF', // Tint color
      flex: 0, // Ensures it does not grow or shrink
      left: width * -0.015, // Slight inward adjustment for alignment
  },  
}