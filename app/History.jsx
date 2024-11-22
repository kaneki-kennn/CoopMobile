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
    dropdownContainer: {
        width: 150, // Adjust width as needed
        height: 45, // Height of the dropdown
        marginTop: 20, // Space above the navbar
        alignSelf: 'center', // Center the dropdown
        backgroundColor: '#373F41', // Background color for dropdown container
        borderRadius: 4,
        overflow: 'hidden', // Ensure the corners are rounded
        left: 75,
    },
    dropdown: {
        height: 40,
        backgroundColor: '#373F41', // Match background color
        color: '#F9A602', // Set text color to F9A602
        paddingHorizontal: 5, // Adjust padding to move arrow closer
        paddingVertical: 0, // Remove vertical padding to keep height consistent
        justifyContent: 'center', // Center the text vertically
        textAlign: 'center', // Center the text horizontally
        fontSize: 12, // Set the desired font size (smaller)
    },
    item: {
        height: 44, // Height of each item in the dropdown
        color: '#F9A602', // Set text color of the items to F9A602
        backgroundColor: '#373F41', // Match dropdown background
    },
    table: {
        width: '100%', // Full width
        marginTop: 20, // Space from the top
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#373F41', // Header background
        height: 31, // Row height
        justifyContent: 'space-between', // Even spacing
        alignItems: 'center', // Center items vertically
        paddingHorizontal: 10, // Horizontal padding
    },
    headerCell: {
        flex: 1, // Equal width for each column
        textAlign: 'center', // Center text
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 20,
        color: '#F9A602',
    },
    dataRow: {
        flexDirection: 'row',
        backgroundColor: '#F3F3F3', // Data row background
        height: 31, // Row height
        justifyContent: 'space-between', // Even spacing
        alignItems: 'center', // Center items vertically
        paddingHorizontal: 10, // Horizontal padding
    },
    dataCell: {
        flex: 1, // Equal width for each column
        textAlign: 'center', // Center text
        fontSize: 13,
        lineHeight: 20,
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