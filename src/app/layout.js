import '@/styles/globals.css';
import { generateCssVariables } from '@/utils/theme-utils';

export const metadata = {
  title: 'Vulcanbyte Blog',
};

export default function RootLayout({ children }) {
  const cssVars = generateCssVariables();

  return (
    <html lang="en" className="theme-compiled">
      <head>
        <style>{`:root{${cssVars}}`}</style>
      </head>
      <body className="antialiased text-lg bg-white dark:bg-gray-900 dark:text-white leading-base">
        {children}
      </body>
    </html>
  );
}
