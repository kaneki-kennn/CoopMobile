import { View, Image, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router'

export default function Dashboard() {
    const router = useRouter();
    const handleLogoClick = () => {
        alert("Coop clicked! The page will refresh."); // Replace with your refresh logic
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

            <View style={styles.welcome}>
                <Text style={styles.welcomemess}>Welcome</Text>
            </View>

            <View style={styles.money}>
                <View style={styles.loanbal}>
                    <Text style={styles.loanbalancemoney}>50000.00</Text>
                    <View style={styles.loancontainer}>
                        <Text style={styles.loanbalance}>Loan Balance</Text>
                    </View>
                </View>
            </View>

            <View style={styles.save}>
                <View style={styles.savebal}>
                    <Text style={styles.savebalancemoney}>500.00</Text>
                    <View style={styles.savecontainer}>
                        <Text style={styles.savings}>Savings</Text>
                    </View>
                </View>
            </View>

            <View style={styles.cbu}>
                <View style={styles.cbubal}>
                    <Text style={styles.cbubalancemoney}>500.00</Text>
                    <View style={styles.cbucontainer}>
                        <Text style={styles.cbus}>CBU</Text>
                    </View>
                </View>
            </View>

            <View style={styles.containeradvisory}>
                <Image
                        source={require('./../assets/images/megaphone.png')}
                        style={styles.megaphone}>
                </Image>
                <Text style={styles.coopad}>Cooperative Advisory</Text>
                <Text style={styles.content}>There are no announcements...</Text>
                <Image
                        source={require('./../assets/images/chat.png')}
                        style={styles.chat}>
                </Image>
            </View>

            <View style={styles.coopfunds}>
                <Text style={styles.coopfnds}>2024 COOP FUNDS</Text>
                <View style={styles.legend}>
                <Image
                        source={require('./../assets/images/green.png')}
                        style={styles.green}>
                </Image>
                <Image
                        source={require('./../assets/images/red.png')}
                        style={styles.red}>
                </Image>
                <Image
                        source={require('./../assets/images/yellow.png')}
                        style={styles.yellow}>
                </Image>
                <Image
                        source={require('./../assets/images/blue.png')}
                        style={styles.blue}>
                </Image>
                <Text style={styles.greenlegend}>Cash and Equivalents</Text>
                <Text style={styles.redlegend}>Expenses</Text>
                <Text style={styles.yellowlegend}>Receivables</Text>
                <Text style={styles.bluelegend}>Fixed Assests</Text>
                </View>
            </View>

            <View styles={styles.graph}>
            <Text style={styles.linegraph}>Sample Graph here!</Text>
            </View>

            <View style={styles.navbar}>
                    <TouchableOpacity onPress={()=>router.push('Announcement')}>
                        <Image style={styles.announcement}source={require('./../assets/images/megaphone.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>router.push('Funds')}>
                        <Image style={styles.funds}source={require('./../assets/images/dollar-bill.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>router.push('Dashboard')}>
                        <Image style={styles.dashboard}source={require('./../assets/images/dashboard.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>router.push('Loans')}>
                        <Image style={styles.loans}source={require('./../assets/images/personal.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>router.push('History')}>
                        <Image style={styles.history}source={require('./../assets/images/history.png')}></Image>
                    </TouchableOpacity>
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
    welcome: {
        position: 'absolute', // Position it absolutely
        left: 30, // x coordinate
        top: 50,   // y coordinate
        width: 303,
        height: 86,
        backgroundColor: '#F9A602', // Fill color
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
        borderRadius: 10, // Add border radius for rounded corners
    },
    welcomemess: {
        fontSize: 30, // Font size
        color: '#373F41', // Text color
        fontFamily: 'Poppins-Bold', // Ensure you have the Poppins font loaded
        fontWeight: 'bold', // You can keep this if needed
    },
      money: {
        display: 'flex', // React Native uses flex by default, so you can omit this
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
        gap: 18, // Note: Gap is not supported in React Native. You can use margin for spacing
        width: 303,
        height: 51,
        flex: 0, // Equivalent to `flex: none`
        order: 1, // This is not supported in React Native
        flexGrow: 0, // React Native does not require this as it is managed automatically
        top: 120,
        left: 30,
    },
    loanbal: {
        position: 'absolute',
        width: 89,
        height: 51,
        left: 0,
        top: 0,
        backgroundColor: '#F3F3F3', // Background color
        borderWidth: 1,
        borderColor: '#FFFFFF', // Border color
        borderRadius: 5, // Border radius
        boxSizing: 'border-box', // Not applicable in React Native, width and height include padding
    },
    loanbalancemoney: {
        position: 'absolute',
        width: 63,
        height: 20,
        left: 14,
        top: 7,
        fontFamily: 'Poppins', // Make sure you have this font available in your project
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 20, // Line height should ideally match the height of the text
        textAlign: 'center', // Center the text
        color: '#373F41', // Text color
    },
    loanbalance: {
        position: 'absolute',
        width: 75,
        height: 17,
        left: 8,
        top: 2,
        fontFamily: 'Poppins', // Ensure this font is available in your project
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 11,
        lineHeight: 16,
        textAlign: 'center', // Center the text
        textTransform: 'capitalize', // Capitalize text
        color: '#F9A602', // Text color
        zIndex: 3, // Set the stacking order
    },
    loancontainer: {
        position: 'absolute',
        width: 87,
        height: 20,
        left: 0,
        top: 30,
        backgroundColor: '#373F41', // Background color
        borderBottomLeftRadius: 5, // Adjust the radius as needed
        borderBottomRightRadius: 5, // Adjust the radius as needed
    },
    save: {
        width: 89, // Width in pixels
        height: 51, // Height in pixels
        position: 'absolute', // Assuming you want it positioned absolutely
        top: 155, // Y coordinate
        left: 137, // X coordinate
        zIndex: 1, // Stacking order
        alignItems: 'center', // Center content vertically
        flexDirection: 'row', // Align items in a row
    },
    savebal: {
        position: 'absolute',
        width: 89,
        height: 51,
        left: 0,
        top: 0,
        backgroundColor: '#F3F3F3', // Background color
        borderWidth: 1,
        borderColor: '#FFFFFF', // Border color
        borderRadius: 5, // Border radius
        boxSizing: 'border-box', // Not applicable in React Native, width and height include padding
    },
    savebalancemoney: {
        position: 'absolute',
        width: 63,
        height: 20,
        left: 14,
        top: 7,
        fontFamily: 'Poppins', // Make sure you have this font available in your project
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 20, // Line height should ideally match the height of the text
        textAlign: 'center', // Center the text
        color: '#373F41', // Text color
    },
    savings: {
        position: 'absolute',
        width: 75,
        height: 17,
        left: 8,
        top: 2,
        fontFamily: 'Poppins', // Ensure this font is available in your project
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 11,
        lineHeight: 16,
        textAlign: 'center', // Center the text
        textTransform: 'capitalize', // Capitalize text
        color: '#F9A602', // Text color
        zIndex: 3, // Set the stacking order
    },
    savecontainer: {
        position: 'absolute',
        width: 87,
        height: 20,
        left: 0,
        top: 30,
        backgroundColor: '#373F41', // Background color
        borderBottomLeftRadius: 5, // Adjust the radius as needed
        borderBottomRightRadius: 5, // Adjust the radius as needed
    },
    cbu: {
        width: 89, // Width in pixels
        height: 51, // Height in pixels
        position: 'absolute', // Assuming you want it positioned absolutely
        top: 155, // Y coordinate
        left: 245, // X coordinate
        zIndex: 1, // Stacking order
        alignItems: 'center', // Center content vertically
        flexDirection: 'row', // Align items in a row
    },
    cbubal: {
        position: 'absolute',
        width: 89,
        height: 51,
        left: 0,
        top: 0,
        backgroundColor: '#F3F3F3', // Background color
        borderWidth: 1,
        borderColor: '#FFFFFF', // Border color
        borderRadius: 5, // Border radius
        boxSizing: 'border-box', // Not applicable in React Native, width and height include padding
    },
    cbubalancemoney: {
        position: 'absolute',
        width: 63,
        height: 20,
        left: 14,
        top: 7,
        fontFamily: 'Poppins', // Make sure you have this font available in your project
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 20, // Line height should ideally match the height of the text
        textAlign: 'center', // Center the text
        color: '#373F41', // Text color
    },
    cbus: {
        position: 'absolute',
        width: 75,
        height: 17,
        left: 8,
        top: 2,
        fontFamily: 'Poppins', // Ensure this font is available in your project
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 11,
        lineHeight: 16,
        textAlign: 'center', // Center the text
        textTransform: 'capitalize', // Capitalize text
        color: '#F9A602', // Text color
        zIndex: 3, // Set the stacking order
    },
    cbucontainer: {
        position: 'absolute',
        width: 87,
        height: 20,
        left: 0,
        top: 30,
        backgroundColor: '#373F41', // Background color
        borderBottomLeftRadius: 5, // Adjust the radius as needed
        borderBottomRightRadius: 5, // Adjust the radius as needed
    },
    containeradvisory: {
        position: 'absolute', // Positioning
        width: 303, // Width in pixels
        height: 131, // Height in pixels
        left: 30, // X coordinate
        top: 230, // Y coordinate
        backgroundColor: '#373F41', // Background color
        borderColor: '#FFFFFF', // Border color
        borderWidth: 2, // Border width
        borderRadius: 10, // Border radius
        overflow: 'hidden', // Ensures children stay within rounded corners
    },
    megaphone: {
        position: 'absolute',
        left: '5.83%',  // Percentage for left position
        top: 5,   // Percentage for top position
        width: 25, // Set a width (adjust as necessary)
        height: 25, // Set a height (adjust as necessary)
        tintColor: '#F9A602', // Background color
        resizeMode: 'contain', // Ensures the image maintains aspect ratio
    },
    coopad: {
        position: 'absolute',
        width: 171,
        height: 23, // Make sure height is set to show the text
        left: 90, // Adjusted left position for visibility
        top: 5, // Adjusted top position for visibility
        fontFamily: 'Poppins', // Ensure Poppins is linked correctly
        fontWeight: '800',
        fontSize: 15,
        lineHeight: 22,
        color: '#F9A602',
    }, 
    content: {
        position: 'absolute',
        width: 204,
        height: 19,
        left: 73, // Adjusted left position for better visibility
        top: 60, // Adjusted top position to move it lower
        fontFamily: 'Poppins', // Ensure Poppins is linked correctly
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 19,
        color: '#FFFFFF', // Text color
    },
    chat: {
        position: 'absolute',
        width: 25, // Set width to 50px
        height: 25, // Set height to 28px
        left: 260, // Set left position
        top: 90, // Set top position
        tintColor: '#F9A602',
    },
    coopfunds: {
        position: 'absolute', // Positioning
        width: 303, // Width in pixels
        height: 275, // Height in pixels
        left: 30, // X coordinate
        top: 400, // Y coordinate
        backgroundColor: '#373F41', // Background color
        borderColor: '#FFFFFF', // Border color
        borderWidth: 2, // Border width
        borderRadius: 10, // Border radius
        overflow: 'hidden', // Ensures children stay within rounded corners
    },
    coopfnds: {
        position: 'absolute',
        width: 148, // Set width to 148px
        height: 24, // Set height to 24px
        left: 75, // Set x coordinate
        top: 10, // Set y coordinate
        fontFamily: 'Poppins', // Ensure Poppins is linked correctly
        fontWeight: '800', // Bold weight
        fontSize: 16, // Font size
        lineHeight: 24, // Line height
        textAlign: 'center', // Center text
        color: '#F9A602', // Text color
    },
    legend: {
        position: 'absolute', // Allows you to position it anywhere
        width: 3, // Width of the legend
        height: 10, // Height of the legend
        left: 0, // Aligns it to the left side
        top: 50, // Adjust this value to position vertically
    },
    green: {
        position: 'absolute',
        width: 10, // Width
        height: 10, // Height
        left: 20, // Adjusted x coordinate for visibility
        top: -10, // Adjusted y coordinate for visibility
    },
    red: {
        position: 'absolute',
        width: 10, // Width
        height: 10, // Height
        left: 20, // Adjusted x coordinate for visibility
        top: 10, // Adjusted y coordinate for visibility
    }, 
    yellow: {
        position: 'absolute',
        width: 10, // Width
        height: 10, // Height
        left: 20, // Adjusted x coordinate for visibility
        top: 30, // Adjusted y coordinate for visibility
    }, 
    blue: {
        position: 'absolute',
        width: 10, // Width
        height: 10, // Height
        left: 20, // Adjusted x coordinate for visibility
        top: 50 , // Adjusted y coordinate for visibility
    },  
    greenlegend: {
        position: 'absolute',
        width: 122,
        height: 17,
        left: 41,
        top: -13,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 11,
        lineHeight: 16,
        color: '#FFFFFF',
      },   
      redlegend: {
        position: 'absolute',
        width: 122,
        height: 17,
        left: 41,
        top: 7,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 11,
        lineHeight: 16,
        color: '#FFFFFF',
      }, 
      yellowlegend: {
        position: 'absolute',
        width: 122,
        height: 17,
        left: 41,
        top: 27,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 11,
        lineHeight: 16,
        color: '#FFFFFF',
      },
      bluelegend: {
        position: 'absolute',
        width: 122,
        height: 17,
        left: 41,
        top: 47,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 11,
        lineHeight: 16,
        color: '#FFFFFF',
      },
      linegraph: {
        position: 'absolute',
        width: 148,
        height: 24,
        left: 100, // Center the text relative to the graph
        top: 525,  // Adjust to position it above the graph
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '800',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        color: '#F9A602',
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
    tintColor: '#F9A602', // Tint color
    flex: 0, // Equivalent to `flex: none`
    order: 0, // Not applicable in React Native, but kept for reference
    flexGrow: 0, // Ensures it does not grow
    left: -5,
},
dashboard: {
    width: 30,
    height: 30,
    tintColor: '#FFFFFF', // Tint color
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
