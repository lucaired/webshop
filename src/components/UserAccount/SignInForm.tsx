import {  useState } from "react";
import { SignUpInput } from "./UserAccountInput";
import { loginWithMail } from "../../utils/firebase";

interface SignInFields {
    email: string;
    password: string;
}

const SignInForm = () => {

    // setting the user will cause the app to re-render

    const [form, setForm] = useState<SignInFields>({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        // [attribute]: value is a computed property name
        setForm({
            ...form,
            [id]: value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents page refresh
        if (!form.password && !form.email) {
            alert("Enter email and password");
            return;
        } else {
            try {
                await loginWithMail(form.email, form.password);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h2>I already have an account</h2>
                <h3>Sign in with your email and password</h3>
            </div>
            <form 
                onSubmit={handleSubmit}
                style={{
                    display: "flex", 
                    flexDirection: "column",
                    alignContent: "flex-start",
                    rowGap: "0.5rem",
                }}
            >
                <SignUpInput
                    type="email"
                    name="email"
                    label="Email"
                    handler={handleChange}
                    value={form.email}
                />
                <SignUpInput
                    type="password"
                    name="password"
                    label="Password"
                    handler={handleChange}
                    value={form.password}
                />
                <button 
                    type="submit"
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem',
                    }}
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}
export default SignInForm;