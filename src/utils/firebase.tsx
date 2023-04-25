import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword, User } from 'firebase/auth';
import { DocumentData, DocumentReference, collection, doc, getDoc, getFirestore, setDoc, writeBatch, getDocs } from 'firebase/firestore';
import { LocalUser } from '../contexts/UserContext';

/** Authentication */

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

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        console.log(error);
    }
}

export const loginWithMail = async (email: string, password: string): Promise<User> => {
    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return new Promise((resolve) => resolve(userCredential.user));
    } catch (error) {
        return Promise.reject(error);
    }

} 

export const createLocalUserFromFirebase = async (
    userCredential: UserCredential,
) => {
    const userDocRef: DocumentReference<DocumentData> | undefined = await createUserDocFromAuth(userCredential.user, {});
    if (!userDocRef) {
        console.error('No doc avaliable');
        return;
    }
    const userDoc: DocumentData | undefined = await getDoc(userDocRef);
    if (!userDoc) {
        console.error('Could not extract doc');
        return;
    }
    const userData = userDoc.data();
    const newUser: LocalUser = new LocalUser(userData.displayName, userData.email, true);

    return newUser;
};

export const signOutUser = async () => {
    const auth = getAuth();
    const res = await auth.signOut();
    return res;
}

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
    /**
     * This function is used to listen to auth state changes.
     * Permantly listening to auth state changes is not recommended.
     * 
     */
    const auth = getAuth();
    return auth.onAuthStateChanged(callback);
}

/** Storage */

export const createUserDocFromAuth = async (userAuth: FirebaseUserAuth, additionalData: any) => {
    if (!userAuth) return;

    const userRef = doc(db, 'users', userAuth.uid);
    const snapShot = await getDoc(userRef);

    if (!snapShot.exists()) {
        let { displayName, email } = userAuth;

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

export const getUserDoc = async (userAuth: FirebaseUserAuth) => {
    if (!userAuth) return;
    try {
        const userRef = doc(db, 'users', userAuth.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
            return userSnapshot.data();
        } else {
            console.log('No such document!');
        }
    } catch (error) {
        console.log('Error getting document:', error);
    }
}

export const addCollectionAndDocuments = async (collectionKey: string, objectsToAdd: any) => {
    const collectionRef = collection(db, collectionKey);
    // This allows us to batch write to the database, which is more efficient
    // and prevents us from hitting the rate limit. Furthermore, it allows us
    // to rollback the entire batch if one of the writes fails.
    const batch = writeBatch(db);
    objectsToAdd.forEach((obj: any) => {
        const newDocRef = doc(collectionRef, obj.title.toLowerCase());
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
}

export const getDocumentsFromCollection = async (collectionKey: string) => {
    const collectionRef = collection(db, collectionKey);
    const collectionSnapshot = await getDocs(collectionRef);
    const collectionMap = collectionSnapshot.docs.map((doc: any) => doc.data());
    return collectionMap;
}
