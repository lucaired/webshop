import { Fragment, useContext, useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../utils/firebase";
import { LocalUser, LocalUserContext } from "../contexts/UserContext";

interface SignUpFields {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface SignUpInputProps {
    type: string;
    name: string;
    label: string;
    handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const SignUpInput = (props: SignUpInputProps) => {
    const { type, name, label, handler, value } = props;
    return (
        <Fragment>
            <label htmlFor={name}>{label}</label>
            <input 
                type={type}
                name={name}
                id={name}
                required
                onChange={handler}
                value={value}
            />
        </Fragment>
    )
}

const SignUpForm = () => {

    const { setLocalUser } = useContext(LocalUserContext);

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
                const userCredential = await createAuthUserWithEmailAndPassword(form.email, form.password);
                if (!userCredential) {
                    console.error('No user credential');
                    return;
                }
                const newUser = await createUserDocFromAuth(userCredential, {displayName: form.name});
                if (!newUser) {
                    console.error('No new user');
                    return;
                }
                console.log('New user created: ', newUser);
                setLocalUser(new LocalUser(form.name,form.email,true));

            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form 
                onSubmit={handleSubmit}
                style={{
                    display: "flex", 
                    flexDirection: "column",
                    alignItems: "center",
                    rowGap: "0.5rem"
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}
export default SignUpForm;