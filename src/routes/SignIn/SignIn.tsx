import { UserCredential } from "firebase/auth";
import { signInWithGooglePopup, createLocalUserFromFirebase } from "../../utils/firebase";
import SignUpForm from "../../components/UserAccount/SignUpForm";
import { useContext } from "react";
import { LocalUserContext } from "../../contexts/UserContext";
import SignInForm from "../../components/UserAccount/SignInForm";

const SignIn = () => {

    const { setLocalUser } = useContext(LocalUserContext);

    const logGoogleIn = async () => {
        const userCredential: UserCredential = await signInWithGooglePopup();
        if (!userCredential) {
            console.error('No user credential');
            return;
        }
        const newUser = await createLocalUserFromFirebase(userCredential);
        if (!newUser) {
            console.error('No new user');
            return;
        }
        setLocalUser(newUser);
    }

    return (
        <div 
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <SignInForm/>
                <button 
                    onClick={logGoogleIn}
                    style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem',
                    }}
                >
                    Sign in with Google
                </button>
            </div>
            <div>
                <SignUpForm/>
            </div>
        </div>
    );
}
export default SignIn;