import { createContext, useState } from 'react';

export class LocalUser {
    name: string;
    email: string;
    isLoggedIn: boolean;

    constructor(name: string, email: string, isLoggedIn: boolean) {
        this.name = name;
        this.email = email;
        this.isLoggedIn = isLoggedIn;
    }
}

export const LocalUserContext = createContext<{
    localUser: LocalUser | null,
    setLocalUser: (localUser: LocalUser | null) => void
}
>({
    localUser: null,
    setLocalUser: (localUser: LocalUser | null) => {}
});

interface LocalUserContextProviderProps {
    children: React.ReactNode;
}

export const LocalUserContextProvider = (props: LocalUserContextProviderProps) => {
    const [localUser, setLocalUser] = useState<LocalUser | null>(null);
    const {children} = props;

    return (
        <LocalUserContext.Provider value={{localUser, setLocalUser}}>
            {children}
        </LocalUserContext.Provider>
    );
}