import { createContext, useState } from 'react';

interface User {
    name: string;
    email: string;
    isLoggedIn: boolean;
}

export const UserContext = createContext<{
    user: User | null,
    setUser: (user: User) => void
}
>({
    user: null,
    setUser: (user: User) => {}
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