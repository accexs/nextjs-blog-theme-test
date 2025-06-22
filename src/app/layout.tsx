import '@/styles/globals.css';
import CSSVariableInjector from '../components/CssVariablesInjector';
import type {ReactNode} from 'react';
import {ThemeProvider} from "@/providers/themeProvider";

const metadata = {
    title: process.env.BLOG_NAME,
};

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout = ({children}: RootLayoutProps) => (
    <html lang="en" className="theme-compiled">
    <head>
        <CSSVariableInjector/>
        <title>{metadata.title}</title>
    </head>
    <body className="antialiased text-lg bg-white dark:bg-gray-900 dark:text-white leading-base">
    <ThemeProvider>{children}</ThemeProvider>
    </body>
    </html>
);

export default RootLayout;
