import '@/styles/globals.css';
import CSSVariableInjector from "../components/CssVariablesInjector";

export const metadata = {
  title: 'Vulcanbyte Blog',
};

export default function RootLayout({children}) {
  return (
    <html lang="en" className="theme-compiled">
    <head>
      <CSSVariableInjector/>
      <title>{metadata.title}</title>
    </head>
    <body className="antialiased text-lg bg-white dark:bg-gray-900 dark:text-white leading-base">
    {children}
    </body>
    </html>
  );
}
