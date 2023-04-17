import { createContext, useState } from 'react';

export class User {
    name: string;
    email: string;
    isLoggedIn: boolean;

    constructor(name: string, email: string, isLoggedIn: boolean) {
        this.name = name;
        this.email = email;
        this.isLoggedIn = isLoggedIn;
    }
}

export const UserContext = createContext<{
    user: User | null,
    setUser: (user: User | null) => void
}
>({
    user: null,
    setUser: (user: User | null) => {}
});

interface UserContextProviderProps {
    children: React.ReactNode;
}

export const UserContextProvider = (props: UserContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const {children} = props;

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}