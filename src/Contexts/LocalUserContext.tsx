import { createContext, useEffect, useState } from 'react';
import { getUserDoc, onAuthStateChanged } from '../Utils/firebase';

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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(async (user) => {
            if (user) {
                const firebaseUserAuth = {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                } 
                const userDoc = await getUserDoc(firebaseUserAuth);
                if (!userDoc) {
                    console.error('No user doc');
                    return;
                }
                setLocalUser(new LocalUser(userDoc.displayName || 'No name', userDoc.email || 'No mail', true));
            } else {
                setLocalUser(null);
            }
        });
        return unsubscribe;
    }, []);

    return (
        <LocalUserContext.Provider value={{localUser, setLocalUser}}>
            {children}
        </LocalUserContext.Provider>
    );
}