<<<<<<< HEAD


import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID } from '@env';
=======
import {
    FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID
} from '@env';
>>>>>>> e780207 (Added Business Info Page by selecting Business)


const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };