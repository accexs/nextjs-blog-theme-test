import '@/styles/globals.css';
import CSSVariableInjector from '../components/CssVariablesInjector';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Vulcanbyte Blog',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" className="theme-compiled">
    <head>
      <CSSVariableInjector />
      <title>{metadata.title}</title>
    </head>
    <body className="antialiased text-lg bg-white dark:bg-gray-900 dark:text-white leading-base">
      {children}
    </body>
  </html>
);

export default RootLayout;
