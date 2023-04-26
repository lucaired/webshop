import { Fragment } from "react";

export interface SignUpInputProps {
    type: string;
    name: string;
    label: string;
    handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

export const SignUpInput = (props: SignUpInputProps) => {
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