import { useContext } from "react";

import { UserCredential } from "firebase/auth";
import { createUserDocFromAuth, signInWithGooglePopup } from "../../utils/firebase";
import { UserContext, User } from "../../contexts/UserContext";
import { DocumentData, DocumentReference, getDoc } from "firebase/firestore";
import SignUpForm from "../../components/SignUpForm";

const SignIn = () => {
    const {setUser} = useContext(UserContext);

    const logGoogleIn = async () => {
        const userCredential: UserCredential = await signInWithGooglePopup();
        if (!userCredential) {
            console.error('No user credential');
            return;
        }
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
        const newUser: User = new User(userData.displayName, userData.email, true);
        setUser(newUser)
    };
    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleIn}>Sign in with Google</button>
            <SignUpForm/>
        </div>
    );
}
export default SignIn;