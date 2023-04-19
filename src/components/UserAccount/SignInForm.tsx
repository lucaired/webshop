import { Fragment, useContext, useState } from "react";
import { LocalUser, LocalUserContext } from "../../contexts/UserContext";
import { SignUpInput } from "./UserAccountInput";

interface SignInFields {
    email: string;
    password: string;
}

const SignInForm = () => {

    const { setLocalUser } = useContext(LocalUserContext);

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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}
export default SignInForm;