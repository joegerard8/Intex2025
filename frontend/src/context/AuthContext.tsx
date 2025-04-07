import React, { createContext, useContext, ReactNode } from 'react';

// Define a minimal user type
interface User {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
}

// Define the context type
interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => {},
    register: async () => {},
    logout: () => {},
    loading: false,
});

// Create a hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

// Create a provider component
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // Define mock auth functions that do nothing
    const login = async () => {
        console.log('Mock login function called');
    };

    const register = async () => {
        console.log('Mock register function called');
    };

    const logout = () => {
        console.log('Mock logout function called');
    };

    const value = {
        user: null, // No user for now
        login,
        register,
        logout,
        loading: false,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;