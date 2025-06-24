import '@/styles/globals.css';
import CSSVariableInjector from '../components/CssVariablesInjector';
import React, {ReactNode} from 'react';
import {ThemeProvider} from "@/providers/themeProvider";
import Header from "@/components/Header";
import {getGlobalData, GlobalData} from "@/utils/globalData";
import Footer from "@/components/Footer";

const metadata = {
    title: process.env.BLOG_NAME,
};

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout = ({children}: RootLayoutProps) => {
    const globalData: GlobalData = getGlobalData();
    return (
        <html lang="en" className="theme-compiled">
        <head>
            <CSSVariableInjector/>
            <title>{metadata.title}</title>
        </head>
        <body className="antialiased text-lg bg-white dark:bg-gray-900 dark:text-white leading-base">
        <ThemeProvider>
            <div className="relative pb-24 overflow-hidden">
                <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
                    <Header name={globalData.name}/>
                    {children}
                    <Footer copyrightText={globalData.footerText}/>
                </div>
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}

export default RootLayout;
