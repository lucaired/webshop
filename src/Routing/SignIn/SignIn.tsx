import { signInWithGooglePopup } from "../../Utils/Firebase/firebase";
import SignUpForm from "../../Components/UserAccount/SignUpForm";
import SignInForm from "../../Components/UserAccount/SignInForm";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

    const navigate = useNavigate();

    const logGoogleIn = async () => {
        await signInWithGooglePopup();
        navigate("/shop");
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