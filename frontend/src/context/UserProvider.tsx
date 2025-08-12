import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
    authenticated: boolean;
    authToken: (token: string) => void;
    logoutToken: () => void;
    getToken: () => string | null;
};

export const AuthContext = createContext<AuthContextType>({
    authenticated: false,
    authToken: () => {},
    logoutToken: () => {},
    getToken: () => null,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [authenticated, setAuthenticated] = useState(true || false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []);

    const authToken = (token: string) => {
        localStorage.setItem("token", token);
        setAuthenticated(true);
    };

    const logoutToken = () => {
        localStorage.removeItem("token");
        setAuthenticated(false);
    };

    const getToken = () => {
        return localStorage.getItem("token")
    }

    return (
        <AuthContext.Provider value={{ authenticated, authToken, logoutToken, getToken }}>
            {children}
        </AuthContext.Provider>
    )
}