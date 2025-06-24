'use client';

import React, {useEffect, useState, createContext, useContext} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    setTheme: () => {
    },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme | null>(null); // null = uninitialized

    useEffect(() => {
        const stored = localStorage.getItem('theme') as Theme | null;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const resolvedTheme = stored || (prefersDark ? 'dark' : 'light');

        document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
        setTheme(resolvedTheme);
    }, []);

    const updateTheme = (newTheme: Theme) => {
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        setTheme(newTheme);
    };

    // Avoid rendering until the theme is resolved
    if (theme === null) return null;

    return (
        <ThemeContext.Provider value={{theme, setTheme: updateTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};