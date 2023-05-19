import { Fragment } from "react";

export interface UserAccountInputProps {
    type: string;
    name: string;
    label: string;
    handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const UserAccountInput = (props: UserAccountInputProps) => {
    const { type, name, label, handler, value } = props;
    return (
        <Fragment>
            <label htmlFor={name}>{label}</label>
            <input 
                type={type}
                name={name}
                required
                onChange={handler}
                id={name}
                value={value}
            />
        </Fragment>
    )
}

export default UserAccountInput;