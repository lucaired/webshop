import { UserCredential } from "firebase/auth";
import { createUserDocFromAuth, signInWithGooglePopup } from "../../utils/firebase";

const SignIn = () => {
    const logGoogleIn = async () => {
        const userCredential: UserCredential = await signInWithGooglePopup();
        const userDoc = await createUserDocFromAuth(userCredential.user, {});
        console.log(userDoc);
    };
    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleIn}>Sign in with Google</button>
        </div>
    );
}
export default SignIn;