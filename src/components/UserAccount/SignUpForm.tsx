import { Fragment, useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase";
import { SignUpInput } from "./UserAccountInput";

interface SignUpFields {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUpForm = () => {

    const [form, setForm] = useState<SignUpFields>({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
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
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        } else {
            try {
                await createAuthUserWithEmailAndPassword(form.email, form.password);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <Fragment>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h2>I do not have an account</h2>
                <h3>Sign up with your email and password</h3>
            </div>
            <form 
                onSubmit={handleSubmit}
                style={{
                    display: "flex", 
                    flexDirection: "column",
                    rowGap: "0.5rem",
                    alignContent: "flex-start"
                }}
            >
                <SignUpInput
                    type="text"
                    name="name"
                    label="Name"
                    handler={handleChange}
                    value={form.name}
                />
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
                <SignUpInput
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    handler={handleChange}
                    value={form.confirmPassword}
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
        </Fragment>
    )
}
export default SignUpForm;