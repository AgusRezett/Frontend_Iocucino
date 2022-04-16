import React, { useState, createContext } from 'react';

// Components
import AsyncStorage from '@react-native-async-storage/async-storage';

// Functions

export const sessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [sessionToken, setSessionToken] = useState("");

    const getSessionToken = async () => {
        try {
            const token = await AsyncStorage.getItem('sessionToken');
            if (token) {
                setSessionToken(token);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSessionToken();
    }, []);

    return (
        <sessionContext.Provider value={{ sessionToken: sessionToken, setSessionToken: setSessionToken }}>
            {children}
        </sessionContext.Provider>
    );
}
