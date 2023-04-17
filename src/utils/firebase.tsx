import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

/** Authentication */

// TODO: Replace the following with your app's Firebase project configuration
// How to add react environment variables to vs code ?
// https://stackoverflow.com/questions/56238356/using-environment-variables-in-react

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
}
  
const firebase = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
// Force account selection even when one account
// is available.
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth(firebase);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

interface FirebaseUserAuth {
    uid?: any;
    displayName?: any;
    email?: any;
}

/** Firestore */

export const db = getFirestore(firebase);

/** Storage */

export const createUserDocFromAuth = async (userAuth: FirebaseUserAuth, additionalData: any) => {
    if (!userAuth) return;

    const userRef = doc(db, 'users', userAuth.uid);
    const snapShot = await getDoc(userRef);

    if (!snapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error);
        }
    }
    return userRef;
}
