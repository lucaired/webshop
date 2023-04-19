import { UserCredential } from "firebase/auth";
import { signInWithGooglePopup, createNewUserFromFireBaseDoc } from "../../utils/firebase";
import SignUpForm from "../../components/SignUpForm";
import { useContext } from "react";
import { LocalUserContext } from "../../contexts/UserContext";

const SignIn = () => {

    const { setLocalUser } = useContext(LocalUserContext);

    const logGoogleIn = async () => {
        const userCredential: UserCredential = await signInWithGooglePopup();
        if (!userCredential) {
            console.error('No user credential');
            return;
        }
        const newUser = await createNewUserFromFireBaseDoc(userCredential);
        if (!newUser) {
            console.error('No new user');
            return;
        }
        setLocalUser(newUser);
    }

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleIn}>Sign in with Google</button>
            <SignUpForm/>
        </div>
    );
}
export default SignIn;