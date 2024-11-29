import { useEffect, useState, } from 'react';
import { View, Text, Alert, ActivityIndicator, TouchableOpacity, Image, ScrollView} from 'react-native';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { supabase } from './supabase';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';



const Dashboard = () => {
    const navigation = useNavigation(); 
    const navigateWithUserId = (navigation, userId) => (route) => {
        navigation.navigate(route, { userId });
    };
    const route = useRoute();
    const router = useRouter();
    const { userId } = route.params || {}; 
    const [savings, setSavings] = useState(null);
    const [cbu, setCbu] = useState(null);
    const [loadingSavings, setLoadingSavings] = useState(true); 
    const [loadingCbu, setLoadingCbu] = useState(true);          
    const [errorSavings, setErrorSavings] = useState(null);      
    const [errorCbu, setErrorCbu] = useState(null);      
    const [announcements,  setAnnouncements] = useState([]);
    const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
    const [errorAnnouncements, setErrorAnnouncements] = useState(null);
    const [loans, setLoans] = useState(0);
    const [loadingLoans, setLoadingLoans] =useState(true);
    const [errorLoans, setErrorLoans] =useState (null);

    const [refreshKey, setRefreshKey] = useState(0);

    const fetchUserCbu = async () => {
        setLoadingCbu(true);
        setErrorCbu(null);
    
        try {
            console.log('Fetching CBU for User ID:', userId); 
            const { data, error } = await supabase
                .from('Cbus') 
                .select('amount') 
                .eq('user_id', userId) 
                .single(); 
    
            if (error) {
                console.error('Error fetching CBU:', error);  
                throw error;  
            }
    
            console.log('Fetched CBU:', data); 
            setCbu(data?.amount || 0);
        } catch (err) {
            console.error('Error fetching CBU:', err);  
            setErrorCbu('Failed to fetch CBU.');
        } finally {
            setLoadingCbu(false);
        }
    };

    const fetchUserLoans = async () => {
        setLoadingLoans(true);
        setErrorLoans(null);
    
        try {
            console.log('Fetching Loan Balance for User ID:', userId); 
            const { data, error } = await supabase
                .from('Loans') 
                .select('loan_status, balance') 
                .eq('user_id', userId) 
                .maybeSingle();  // Using maybeSingle() to handle no data returned gracefully
    
            if (error) {
                console.error('Error fetching Loans:', error);  
                throw error;  
            }
    
            console.log('Fetched Loans:', data); 
            
            // If no loan is found or if the loan balance is 0 or the loan status is not active, return 'No active loans'
            if (!data || data.balance === 0 || data.loan_status !== 'active') {
                setLoans('No active loans');
            } else {
                setLoans(data?.balance || 0); // Ensure loans is a valid number (0 if undefined or null)
            }
        } catch (err) {
            console.error('Error fetching Loans:', err);  
            setErrorLoans('Failed to fetch Loans.');
        } finally {
            setLoadingLoans(false);
        }
    }    
    

    const fetchUserSavings = async () => {
        setLoadingSavings(true);
        setErrorSavings(null);

        try {
            const { data, error } = await supabase
                .from('Savings') 
                .select('amount') 
                .eq('user_id', userId) 
                .single(); 

            if (error) throw error;

            setSavings(data?.amount || 0);
        } catch (err) {
            setErrorSavings('Failed to fetch savings.');
        } finally {
            setLoadingSavings(false);
        }
    };

    useEffect(() => {
        if (userId) {
            console.log('Fetching savings and CBU for User ID:', userId);
            fetchUserSavings();
            fetchUserCbu();
            fetchAnnouncements();
            fetchUserLoans ();
        }
    }, [userId, refreshKey]); 

    
    useEffect(() => {
        if (userId) {
          navigateWithUserId();
        }
    }, [userId]); 

    useEffect(() => {
        console.log('Updated loan balance, savings and CBU:', loans, savings, cbu); 
    }, [loans, savings, cbu]);

    const fetchAnnouncements = async () => {
        setLoadingAnnouncements(true);
        setErrorAnnouncements(null);
    
        try {
            const { data, error } = await supabase
                .from('Contents')  // Table containing announcements
                .select('content_title, content')  // Selecting the necessary columns
                .order('createdAt', { ascending: false })  // Order by 'createdAt', latest first
                .limit(1);  // Limit to 1 announcement (most recent)
    
            if (error) {
                console.error('Error fetching Announcements:', error);
                throw error;
            }
    
            if (data && data.length > 0) {
                setAnnouncements(data);  // Set fetched data if available
            } else {
                setAnnouncements([]);  // Set an empty array if no data
            }
    
        } catch (err) {
            setErrorAnnouncements('Failed to fetch announcements.');
            console.error(err);  // Log the error for debugging
        } finally {
            setLoadingAnnouncements(false);  // Always stop loading, regardless of success or failure
        }
    };
    

    useEffect(() => {
        console.log('announcements:', announcements);
    }, [announcements]);
    const handleLogoClick = () => {
        Alert.alert("Coop clicked! The page will refresh.");
        setRefreshKey(prevKey => prevKey + 1); 
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
                <TouchableOpacity onPress={() => navigation.navigate('Notification', { userId })}
                style={styles.bellContainer}>
                    <Image source={require('./../assets/images/bell.png')}style={styles.bell}/>
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
            {loadingLoans ? (
                <ActivityIndicator size="small" color="#F9A602" />
            ) : loans !== null && loans !== 'No active loans' && !isNaN(loans) ? (
                <Text style={styles.loanbalancemoney}>{loans.toFixed(2)}</Text>
            ) : (
                <Text style={styles.loanbalancemoney}>{loans}</Text>
            )}
            <View style={styles.loancontainer}>
                <Text style={styles.loanbalance}>Loan Balance</Text>
            </View>
        </View>
    </View>

    <View style={styles.save}>
        <View style={styles.savebal}>
            {loadingSavings ? (
                <ActivityIndicator size="small" color="#F9A602" />
            ) : errorSavings ? (
                <Text style={{ color: 'red' }}>{errorSavings}</Text>
            ) : (
                <Text style={styles.savebalancemoney}>
                    {savings !== null && !isNaN(savings) ? savings.toFixed(2) : 'No savings found'}
                </Text>
            )}
            <View style={styles.savecontainer}>
                <Text style={styles.savings}>Savings</Text>
            </View>
        </View>
    </View>

    <View style={styles.cbu}>
        <View style={styles.cbubal}>
            {loadingCbu ? (
                <ActivityIndicator size="small" color="#F9A602" />
            ) : errorCbu ? (
                <Text style={{ color: 'red' }}>{errorCbu}</Text>
            ) : (
                <Text style={styles.cbubalancemoney}>
                    {cbu !== null && !isNaN(cbu) ? cbu.toFixed(2) : 'No CBU found'}
                </Text>
            )}
            <View style={styles.cbucontainer}>
                <Text style={styles.cbus}>CBU</Text>
            </View>
        </View>
    </View>
    <View style={styles.containeradvisory}>
  <Image source={require('./../assets/images/megaphone.png')} style={styles.megaphone} />
  <Text style={styles.coopad}>Cooperative Advisory</Text>

  {loadingAnnouncements ? (
    <ActivityIndicator
      size="small"
      color="#F9A602"
      style={styles.loadingAnimation}
    />
  ) : errorAnnouncements ? (
    <Text style={{ color: 'red' }}>{errorAnnouncements}</Text>
  ) : announcements.length === 0 ? (
    <Text style={styles.content}>There are no announcements...</Text>
  ) : (
    <>
      {/* Fixed content title */}
      <Text style={styles.contenttitle}>
        {announcements[0]?.content_title || 'No title available'}
      </Text>
      
      {/* Scrollable announcement content */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer} // Optional for styling
      >
        <View style={styles.announce}>
          <Text style={styles.contnt}>
            {announcements[0]?.content || 'No content available'}
          </Text>
        </View>
      </ScrollView>
    </>
  )}
</View>


            <View style={styles.coopfunds}>
                <Text style={styles.coopfnds}>2024 COOP FUNDS</Text>
                <View style={styles.legend}>
                    <Image
                        source={require('./../assets/images/green.png')}
                        style={styles.green}
                    />
                    <Image
                        source={require('./../assets/images/red.png')}
                        style={styles.red}
                    />
                    <Image
                        source={require('./../assets/images/yellow.png')}
                        style={styles.yellow}
                    />
                    <Image
                        source={require('./../assets/images/blue.png')}
                        style={styles.blue}
                    />
                    <Text style={styles.greenlegend}>Cash and Equivalents</Text>
                    <Text style={styles.redlegend}>Expenses</Text>
                    <Text style={styles.yellowlegend}>Receivables</Text>
                    <Text style={styles.bluelegend}>Fixed Assets</Text>
                </View>
            </View>

            <View style={styles.graph}>
                <Text style={styles.linegraph}>Sample Graph here!</Text>
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
    welcome: {
        position: 'absolute', // Position it absolutely
        left: width * 0.08, // 8% from the left of the screen
        top: height * 0.08, // Adjusted to 15% from the top of the screen (move it lower)
        width: width * 0.85, // 85% of the screen width
        height: height * 0.10, // 10% of the screen height
        backgroundColor: '#F9A602', // Fill color
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
        borderRadius: 10, // Add border radius for rounded corners
    },
    welcomemess: {
        fontSize: height * 0.04, // Font size is 4% of the screen height
        color: '#373F41', // Text color
        fontWeight: 'bold', // You can keep this if needed
    },
    money: {
        flexDirection: 'row', // Row layout for the children
        alignItems: 'center',  // Center align items vertically
        justifyContent: 'space-between', // Distribute space between items (optional, can be adjusted)
        padding: 0,
        width: width * 0.85, // 85% of the screen width for better responsiveness
        height: height * 0.08, // Adjusted height to be responsive
        top: height * 0.16,  // Move down based on screen height
        left: width * 0.08, // Adjust left based on screen width
    },
    loanbal: {
        position: 'absolute',
        width: width * 0.25,  // 24% of the screen width for responsiveness
        height: height * 0.07, // 7% of the screen height for responsiveness
        left: width * 0.01,    // 5% from the left of the screen for better alignment
        top: height * 0,    // Adjusted top for dynamic placement
        backgroundColor: '#F3F3F3', // Background color
        borderWidth: 1,
        borderColor: '#FFFFFF', // Border color
        borderRadius: 5, // Border radius
    },
    loanbalancemoney: {
        position: 'absolute',
        width: width * 0.18, // 18% of screen width
        height: height * 0.025, // 2.5% of screen height
        left: width * 0.04, // 4% from the left for dynamic positioning
        top: height * -0.00, // Adjusted to position it properly based on screen height
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: width * 0.035, // Font size is proportional to screen width (3.5% of screen width)
        lineHeight: height * 0.03, // Line height adjusted for better vertical alignment
        textAlign: 'center', // Center the text horizontally
        color: '#373F41', // Text color
    },
    loanbalance: {
        position: 'absolute',
        width: 'auto', // Allow the width to adjust based on the content
        height: 17,
        top: 2, // Position it at the top of the parent container
        left: '60%', // Position it horizontally in the center
        transform: [{ translateX: -37.5 }], // Offset to center based on width (adjust this value if needed)
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 11,
        lineHeight: 16,
        textAlign: 'center', // Center the text
        textTransform: 'capitalize', // Capitalize text
        color: '#F9A602', // Text color
        zIndex: 3, // Ensure it's on top
    },    
    loancontainer: {
        position: 'absolute',
        width: '99%',  // Use percentage to adjust the width relative to the parent container
        height: 23,
        left: '1%',  // Use percentage to adjust the left position based on the parent container's width
        top: '50%',    // Use percentage for top positioning to be relative to the screen's height
        backgroundColor: '#373F41', // Background color
        borderBottomLeftRadius: 5, // Adjust the radius as needed
        borderBottomRightRadius: 5, // Adjust the radius as needed
    },    
    save: {
        width: width * 0.30, // 30% of the screen width
        height: height * 0.07, // 8% of the screen height
        position: 'absolute',
        top: height * 0.21, // 25% of the screen height
        left: width * 0.38, // 35% of the screen width
        zIndex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    savebal: {
        position: 'absolute',
        width: '100%', // Take up the full width of its parent container
        height: '60%', // Take up the full height of its parent container
        left: -9,
        top: 0,
        backgroundColor: '#F3F3F3',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 5,
    },
    savebalancemoney: {
        position: 'absolute',
        width: width * 0.25, // 25% of the screen width
        height: height * 0.04, // Adjusted to 4% of screen height to make the text proportionate
        left: width * 0.02, // 5% from the left of the screen
        top: height * -0.01, // 1% from the top of the savebal container
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: width * 0.035, // Font size as 3.5% of screen width
        lineHeight: height * 0.05, // Line height should ideally match the height of the text container
        textAlign: 'center',
        color: '#373F41',
    },
    savings: {
        position: 'absolute',
        width: width * 0.2, // 20% of the screen width
        height: height * 0.03, // 3% of the screen height
        left: width * 0.05, // 3% from the left of the screen
        top: height * -0.01, // 2% from the top of the container
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: width * 0.03, // Font size as 3% of screen width
        lineHeight: height * 0.05, // Line height should be proportional to height
        textAlign: 'center',
        textTransform: 'capitalize', // Capitalize text
        color: '#F9A602', // Text color
        zIndex: 3, // Set the stacking order
    },
    savecontainer: {
        position: 'absolute',
        width: width * 0.30, // 23% of the screen width
        height: height * 0.03, // 4% of the screen height
        left: width * 0.00, // 2% from the left
        top: height * 0.03, // 5% from the top of the parent container
        backgroundColor: '#373F41',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    cbu: {
        width: width * 0.25, // 25% of the screen width
        height: height * 0.07, // 8% of the screen height
        position: 'absolute',
        top: height * 0.2, // 30% of the screen height from the top
        left: width * 0.7, // 60% of the screen width from the left
        zIndex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    cbubal: {
        position: 'absolute',
        width: '100%', // Take up the full width of its parent container
        height: '70%', // Take up the full height of its parent container
        left: -7,
        top: 7,
        backgroundColor: '#F3F3F3',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 5,
    },
    cbubalancemoney: {
        position: 'absolute',
        width: width * 0.3, // 70% of the screen width
        height: height * 0.04, // Increase the height slightly for better visibility
        left: width * -0.03, // Center the text horizontally within the container
        top: height * -0.01, // Position text within the container
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: width * 0.03, // Increase the font size for better visibility
        lineHeight: height * 0.05, // Adjust line height to match the new font size
        textAlign: 'center',
        color: '#373F41',
        zIndex: 10, // Ensure it's above other elements
    },    
    cbus: {
        position: 'absolute',
        width: width * 0.25, // 25% of the screen width
        height: height * 0.03, // 3% of the screen height
        left: width * -0.00, // Center the text horizontally within the container
        top: height * 0.00, // Position the text within the container
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: width * 0.03, // Font size as 3% of screen width
        lineHeight: height * 0.03, // Line height proportional to the screen height
        textAlign: 'center',
        textTransform: 'capitalize',
        color: '#F9A602',
        zIndex: 3,
    },
    cbucontainer: {
        position: 'absolute',
        width: '100%', // Full width of the parent container
        height: height * 0.03, // 5% of the screen height
        left: 0,
        top: height * 0.03, // Position the container a bit lower
        backgroundColor: '#373F41',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    loadingAnimation: {
        marginTop: 77,  // Adjust this value to move it down or up
        marginLeft: 5,  // Adjust this to move it left or right
        alignSelf: 'center', // Optionally center it horizontally
    },    
    containeradvisory: {
        height: height * 0.22, // Fixed height for the container
        width: width * 0.90, // 90% of the screen width
        backgroundColor: '#373F41',
        borderColor: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 10,
        overflow: 'hidden',
        padding: width * 0.04, // 4% of the screen width for padding
        marginHorizontal: width * 0.05, // Center horizontally with 5% margin
        marginVertical: height * 0.02, // 2% of the screen height for vertical spacing
        top: width * 0.3,
      },
      megaphone: {
        width: width * 0.12, // 12% of the screen width for image width
        height: height * 0.06, // 6% of the screen height for image height
        marginBottom: height * 0.01, // 1% of screen height for spacing
        tintColor: '#F9A602',
        resizeMode: 'contain',
        position: 'absolute',
        left: width * 0.05,
        top: height * 0.01,
      },
      coopad: {
        fontWeight: '800',
        fontSize: width * 0.05, // 5% of the screen width for font size
        color: '#F9A602',
        marginBottom: height * 0.01, // 1% of screen height for spacing
        position: 'absolute',
        left: width * 0.25,
        top: height * 0.01,
      },
      scrollContainer: {
        marginTop: height * 0.02, // Below the title and megaphone
        height: '80%', // Occupies 70% of the container's height for scrolling
      },
      scrollContentContainer: {
        paddingBottom: height * 0.02, // Extra padding for the scroll content
      },
      announce: {
        flexGrow: 1,
      },
      contenttitle: {
        fontSize: width * 0.04, // 4% of the screen width for font size
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: height * 0.01, // 1% of screen height for spacing
        top: height * 0.02,
        left: width * 0.3, // Aligned within the container
      },
      contnt: {
        fontSize: width * 0.04, // 4% of the screen width for font size
        color: '#FFFFFF',
        lineHeight: height * 0.03, // 3% of the screen height for line spacing
        marginBottom: height * 0.01, // 1% of screen height for spacing
        marginLeft: width * 0.02, // Proper left margin
      },
      coopfunds: {
        position: 'absolute',  // Positioning
        width: width * 0.90,  // 85% of the screen width (responsive width)
        height: height * 0.4, // 40% of the screen height (responsive height)
        left: width * 0.06,  // 5% from the left edge of the screen
        top: height * 0.52, // 45% from the top of the screen
        backgroundColor: '#373F41', // Background color
        borderColor: '#FFFFFF', // Border color
        borderWidth: 2, // Border width
        borderRadius: 10, // Border radius
        overflow: 'hidden', // Ensures children stay within rounded corners
    },
    coopfnds: {
        position: 'absolute',
        width: width * 0.5, // 50% of the screen width (responsive width)
        height: height * 0.04, // 4% of the screen height (responsive height)
        left: width * 0.20,  // Centers the text horizontally (50% - 25% left margin)
        top: height * 0.01, // 2% from the top of the container
        fontWeight: '800', // Bold weight
        fontSize: width * 0.05, // Font size based on screen width (5% of the width)
        lineHeight: height * 0.04, // Line height based on screen height
        textAlign: 'center', // Center text
        color: '#F9A602', // Text color
    },
    legend: {
        position: 'absolute', // Positioning
        width: width * 0.01, // 1% of screen width
        height: height * 0.02, // 2% of screen height
        left: width * 0.02, // 2% from the left of the container
        top: height * 0.07, // 25% from the top of the container
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
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 11,
        lineHeight: 16,
        color: '#FFFFFF',
      },
      linegraph: {
        position: 'absolute',
        width: width * 0.4, // 40% of screen width for responsiveness
        height: height * 0.04, // 4% of screen height
        left: width * 0.3, // 30% from the left to center the text
        top: height * 0.4, // 60% from the top to position above the graph
        fontStyle: 'normal',
        fontWeight: '800',
        fontSize: width * 0.04, // Font size responsive to screen width
        lineHeight: height * 0.05, // Line height responsive to screen height
        textAlign: 'center',
        color: '#F9A602', // Maintain the original text color
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
        tintColor: '#FFFFFF', // Tint color
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

};
export default Dashboard;