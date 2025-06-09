import React from 'react';
import { ThemeContext } from '../Globals/ThemeContext';
<<<<<<< HEAD
=======
import axios from 'axios';
import { BASE_URL } from "@env"
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomAlert from '../GlobalComponents/Customalert';
import ThankYouMessage from '../FeedbackComponents/ThankYouMessage';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
<<<<<<< HEAD

const Feedback = ({ navigation, route }) => {
    const { mail } = route.params;
    const [emoji, setEmoji] = React.useState('');
    const {themeColor, textColor} = React.useContext(ThemeContext)
=======
import Feather from 'react-native-vector-icons/Feather';

const Feedback = ({ navigation }) => {
    const [emoji, setEmoji] = React.useState('');
    const { themeColor, textColor, userDetails } = React.useContext(ThemeContext)
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
    const [message, setMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [feedback, setFeedback] = React.useState('');
    const [visible, setVisible] = React.useState(false);
    const [alertVisible, setAlertVisible] = React.useState(false);
<<<<<<< HEAD
=======
    const [isReviewEnable, setReviewEnable] = React.useState(true);
    const [buttonText, setButtonText] = React.useState("Publish Feedback");
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2

    const emojiData = [
        { id: 1, emoji: '😡', label: 'Very Bad' },
        { id: 2, emoji: '😞', label: 'Bad' },
        { id: 3, emoji: '😐', label: 'Neutral' },
        { id: 4, emoji: '🙂', label: 'Good' },
        { id: 5, emoji: '😍', label: 'Very Good' }
    ];

<<<<<<< HEAD
    const handleSubmit = async () => {
        const userEmail = mail.replace(/\./g, '_');
=======
    React.useEffect(() => {
        fetchPreviousFeedback();
    }, []);

    const fetchPreviousFeedback = async () => {

        try {
            const response = await axios.get(
                `${BASE_URL}/appreview/${userDetails._id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userDetails.token}`,
                    },
                }
            );

            if (response.data.message !== '') {

                setReviewEnable(false);
                setFeedback(response.data.data[0].review);
                setEmoji(response.data.data[0].rating);
            }
        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    };


    const handleSubmit = async () => {
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
        if (!feedback || !emoji) {
            setMessage('Please fill the required fields.');
            setAlertVisible(true);
            return;
        }

        try {
            setLoading(true);
            const newMessage = {
<<<<<<< HEAD
                reaction: emoji,
                Comment: feedback,
                timestamp: new Date().toISOString(),
                email: userEmail
            };
            const userRatingRef = ref(database, `Rating/${userEmail}`);

            const snapshot = await get(userRatingRef);

            if (snapshot.exists()) {
                await update(userRatingRef, newMessage);
            } else {
                await set(userRatingRef, newMessage);
            }

            setVisible(true);
            setLoading(false);
=======
                user: userDetails._id,
                rating: emoji,
                review: feedback,
            };
            console.log(newMessage);

            const response = await axios.post(`${BASE_URL}/appReview`, newMessage, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userDetails.token}`,
                },
            });
            console.log(response.data);

            if (response.data.sucess === false) {
                setMessage('Failed to Add Rating');
                setAlertVisible(true);
                return;
            }
            setMessage('Rating Added Successfully');
            setButtonText("Publish Feedback")
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
        }
        catch (err) {
            setMessage('Failed to Add Rating');
            setAlertVisible(true);
            console.log(err);
        }
<<<<<<< HEAD
        finally{
=======
        finally {
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
            setVisible(true);
            setLoading(false);
        }
    };
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={[styles.emojiItem]}
<<<<<<< HEAD
                onPress={() => setEmoji(item.label)}
            >
                <Text
                    style={[styles.emoji,emoji === item.label && styles.selectedEmoji  ]}>
                    {item.emoji}
                </Text>
                <Text
                    style={[styles.emojiText,emoji === item.label && styles.selectedEmojiText ]}
=======
                onPress={() => setEmoji(item.id)}
            >
                <Text
                    style={[styles.emoji, emoji === item.id && styles.selectedEmoji]}>
                    {item.emoji}
                </Text>
                <Text
                    style={[styles.emojiText, emoji === item.label && styles.selectedEmojiText]}
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
                >
                    {item.label}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <KeyboardAvoidingView
<<<<<<< HEAD
            style={[styles.container, {backgroundColor : textColor}]}
=======
            style={[styles.container, { backgroundColor: textColor }]}
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={{ paddingVertical: 18 }} onPress={() => navigation.goBack()}>
                        <Ionicons name='arrow-back' size={30} color={themeColor} />
                    </TouchableOpacity>
                    <Text style={styles.header}>Give Feedback</Text>
                </View>
                <Text style={styles.inputHeader}>Email Addresses</Text>
                <TextInput
                    scrollEnabled={false}
<<<<<<< HEAD
                    value={mail}
=======
                    value={userDetails.mail}
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
                    placeholder='Enter your email address'
                    style={styles.Input}
                    editable={false}
                />
                <Text style={styles.inputHeader}>Rate your experience</Text>

                <FlatList
                    data={emojiData}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    style={{ flexGrow: 0 }}
                />

                <Text style={[styles.inputHeader, { marginTop: 20 }]}>Describe your experience</Text>
<<<<<<< HEAD

                <TextInput
                    placeholder="Share your experience"
                    style={styles.input}
                    value={feedback}
                    onChangeText={setFeedback}
                    multiline={true}
                />
                <TouchableOpacity style={[styles.submitButton, {backgroundColor : themeColor}]} onPress={handleSubmit}>
                    {loading ? <ActivityIndicator size="small" color={textColor}/> : <Text style={[styles.submitButtonText, {color : textColor}]}>Publish Feedback</Text>}
=======
                <View>
                    <TouchableOpacity onPress={()=>{setReviewEnable(true); setButtonText("Update Feedback")}}>
                        <Feather name='edit-3' size={24} color={themeColor} style={{ position: 'absolute', top: 15, right: 20 }} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Share your experience"
                        style={styles.input}
                        value={feedback}
                        onChangeText={setFeedback}
                        multiline={true}
                        editable={isReviewEnable} />
                </View>
                <TouchableOpacity style={[styles.submitButton, { backgroundColor: themeColor }, isReviewEnable ? { opacity: 1 } : { opacity: 0.6 }]} onPress={handleSubmit} disabled={!isReviewEnable}>
                    {loading ? <ActivityIndicator size="small" color={textColor} /> : <Text style={[styles.submitButtonText, { color: textColor }]}>{ buttonText }</Text>}
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
                </TouchableOpacity>
            </ScrollView>
            <ThankYouMessage visible={visible} handleClose={() => setVisible(false)} handleGoHome={() => { setVisible(false); navigation.navigate("HomeScreen") }} />
            <CustomAlert visible={alertVisible} message={message} type='error' onClose={() => setAlertVisible(false)} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
    container: { flex: 1,},
    
    scrollContainer: {padding: 10},

    headerContainer: { width: '100%', justifyContent: 'space-between', paddingTop: 40, padding: 10, gap: 10, marginBottom: 40, paddingLeft: 20},

    header: {fontSize: 28,fontFamily: 'Outfit-bold'},

    Input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 10, width: '95%', marginTop: 5, marginLeft: 10},

    inputHeader: { fontSize: 16, marginBottom: 10, fontFamily: 'Outfit', marginLeft: 10},

    emojiItem: { marginHorizontal: 2, alignItems: 'center', paddingLeft: 10, height: 80,},

    emoji: { fontSize: 36, marginHorizontal: 5},

    emojiText: { fontSize: 14, fontFamily: 'Outfit', textAlign: 'center' },
    
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 10, width: '95%', marginTop: 5, marginLeft: 10, height: 130, textAlignVertical: 'top'},

    submitButton: {padding: 10,borderRadius: 7,marginTop: 20,width: '95%',alignSelf: 'center'},

    submitButtonText: { color: '#fff', fontSize: 18, fontFamily: 'Outfit-bold', textAlign: 'center'},

    selectedEmoji: { color: '#4A81AB', fontSize: 36, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius : 100   , justifyContent: 'center', alignContent: 'center'   },

    selectedEmojiText: { color: 'rgba(0,0,0,0.5)', fontSize : 12 },
=======
    container: { flex: 1, },

    scrollContainer: { padding: 10 },

    headerContainer: { width: '100%', justifyContent: 'space-between', paddingTop: 40, padding: 10, gap: 10, marginBottom: 40, paddingLeft: 20 },

    header: { fontSize: 28, fontFamily: 'Outfit-bold' },

    Input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 10, width: '95%', marginTop: 5, marginLeft: 10 },

    inputHeader: { fontSize: 16, marginBottom: 10, fontFamily: 'Outfit', marginLeft: 10 },

    emojiItem: { marginHorizontal: 2, alignItems: 'center', paddingLeft: 10, height: 80, },

    emoji: { fontSize: 36, marginHorizontal: 5 },

    emojiText: { fontSize: 14, fontFamily: 'Outfit', textAlign: 'center' },

    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 10, width: '95%', marginTop: 5, marginLeft: 10, height: 130, textAlignVertical: 'top' },

    submitButton: { padding: 10, borderRadius: 7, marginTop: 20, width: '95%', alignSelf: 'center' },

    submitButtonText: { color: '#fff', fontSize: 18, fontFamily: 'Outfit-bold', textAlign: 'center' },

    selectedEmoji: { color: '#4A81AB', fontSize: 36, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 100, justifyContent: 'center', alignContent: 'center' },

    selectedEmojiText: { color: 'rgba(0,0,0,0.5)', fontSize: 12 },
>>>>>>> a1b059bed495c65f960444ccb4eca280479d54b2
});

export default Feedback;
