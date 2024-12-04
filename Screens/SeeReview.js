import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Image,
  } from 'react-native';
  import React from 'react';
  import { ThemeContext } from '../Globals/ThemeContext';
  import axios from 'axios';
  import { BASE_URL } from '@env';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  
  const SeeReview = ({ route, navigation }) => {
    const { item } = route.params;
    const { textColor, themeColor, userDetails } = React.useContext(ThemeContext);
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
  
    React.useEffect(() => {
      getRating();
    }, []);
  
    const getRating = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/review/${item._id}`, {
          headers: {
            Authorization: `Bearer ${userDetails.token}`,
          },
        });
        setData(res.data.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };
  
    const renderItem = ({ item }) => {
      return (
      <View style={styles.reviewCard}>
        {/* Top section: Profile Image and Details */}
        <View style={styles.topSection}>
        <Image
          source={{
          uri: item.user?.profilePic || 'https://via.placeholder.com/150',
          }}
          style={styles.profilePic}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user?.userName || 'Anonymous'}</Text>
          <Text style={styles.reviewDate}>{item.createdAt || 'N/A'}</Text>
        </View>
        <View style={styles.rating}>
          {Array(item.rating).fill().map((_, i) => (
          <MaterialIcons key={i} name="star" size={18} color="#FFD700" />
          ))}
        </View>
        </View>
        {/* Review Text */}
        <Text style={styles.reviewText}>{item.review}</Text>
      </View>
      );
    };
  
    return (
      <View style={[styles.container, { backgroundColor: textColor }]}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={30} color={themeColor} />
          </TouchableOpacity>
          <Text style={[styles.header, { color: themeColor }]}>Reviews</Text>
        </View>
  
        {loading ? (
          <ActivityIndicator size={'large'} color={themeColor} />
        ) : data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <Text style={[styles.noReviewText, { color: themeColor }]}>
            No reviews available.
          </Text>
        )}
      </View>
    );
  };
  
  export default SeeReview;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 20,
      justifyContent: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingHorizontal: 20,
      paddingBottom: 10,
    },
    backButton: {
      position: 'absolute',
      left: 20,
    },
    header: {
      fontSize: 24,
      fontFamily: 'Outfit-Bold',
    },
    listContainer: {
      paddingHorizontal: 20,
    },
    reviewCard: {
      padding: 15,
      borderRadius: 10,
      marginVertical: 10,
      borderTopWidth: 0.5,
      borderTopColor: '#333',
    },
    topSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    profilePic: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },
    reviewDate: {
      fontSize: 12,
      color: '#000',
      marginTop: 2,
    },
    rating: {
      flexDirection: 'row',
      fontSize: 14,
      fontWeight: 'bold',
      color: '#000',
    },
    reviewText: {
      fontSize: 14,
      color: '#000',
      lineHeight: 20,
    },
    noReviewText: {
      textAlign: 'center',
      fontSize: 16,
      marginTop: 20,
    },
  });
  