import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

export interface UserAccountInputProps {
    type: string;
    name: string;
    label: string;
    handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const UserAccountInput = (props: UserAccountInputProps) => {
    const { type, name, label, handler, value } = props;
    const id = uuidv4();
    return (
        <Fragment>
            <label htmlFor={name}>{label}</label>
            <input 
                type={type}
                name={name}
                required
                onChange={handler}
                id={name+id}
                value={value}
            />
        </Fragment>
    )
}

export default UserAccountInput;