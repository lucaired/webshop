import { Fragment, useState } from "react";

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

    const [form, setForm] = useState<SignUpFields>({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target);
        const { id, value } = e.target;
        // [attribute]: value is a computed property name
        setForm({
            ...form,
            [id]: value
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        } else {
            console.log(form);
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