import { createContext, useState, useEffect } from 'react';

export const BackendStatusContext = createContext();

export function BackendStatusProvider({ children }) {
    const [isBackendOnline, setIsBackendOnline] = useState(true);

    useEffect(() => {
        async function checkBackend() {
            try {
                const response = await fetch('http://localhost:8080/posts', {method: 'HEAD'});
                setIsBackendOnline(response.ok);
            } catch (err) {
                setIsBackendOnline(false);
            }
        }

        checkBackend();

        const interval = setInterval(checkBackend, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <BackendStatusContext.Provider value={{ isBackendOnline }}>
            {children}
        </BackendStatusContext.Provider>
    )
}