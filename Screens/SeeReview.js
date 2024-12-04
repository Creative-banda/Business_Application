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

const url = "https://res.cloudinary.com/divva13vc/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1733322042/username_udfzdw.jpg"

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
        // Function to calculate the time difference from the current date
        const getTimeDifference = (createdAt) => {
            const givenDate = new Date(createdAt);
            const currentDate = new Date();

            const diffInMilliseconds = currentDate - givenDate;
            const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            const diffInHours = Math.floor(diffInMinutes / 60);
            const diffInDays = Math.floor(diffInHours / 24);

            if (diffInDays > 0) {
                return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
            } else if (diffInHours > 0) {
                return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
            } else if (diffInMinutes > 0) {
                return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
            } else {
                return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
            }
        };

        return (
            <View style={styles.reviewCard}>
                <View style={styles.topSection}>
                    <Image
                        source={{
                            uri: item.user?.profilePic || url,
                        }}
                        style={styles.profilePic}
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{item.user?.userName || 'Anonymous'}</Text>
                        {/* Display the time difference here */}
                        <Text style={styles.reviewDate}>{getTimeDifference(item.createdAt)}</Text>
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
                    <MaterialIcons name="arrow-back" size={30} />
                </TouchableOpacity>
                <Text style={[styles.header]}>Reviews</Text>
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
                <View style={{flex : 1, justifyContent : 'center'}}>

                    <Text style={[styles.noReviewText]}>
                        No reviews available.
                    </Text>
                </View>
            )}
        </View>
    );
};

export default SeeReview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 25,
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
        fontFamily: 'Outfit-bold',
        marginTop: 10
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
        fontFamily: 'Outfit'
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
        fontFamily: 'Outfit'
    },
});
