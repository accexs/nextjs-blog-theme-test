"use client"

import {useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {ThemeSwitcher} from "@/components/ThemeSwitcher";
import {useTheme} from "@/providers/themeProvider";
import darkLogo from '../../public/images/vulcanbyte-logo-dark-transparent.png'
import lightLogo from '../../public/images/vulcanbyte-logo-light-transparent.png'

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const {theme, setTheme} = useTheme();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const navLinks = [
        {href: "/", label: "Home"},
        {href: "/posts", label: "Blog"},
        {href: "/about", label: "About"},
    ]

    return (
        <nav
            className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Image
                            src={theme === 'dark' ? darkLogo : lightLogo}
                            alt="VulcanByte"
                            width={150}
                            height={40}
                            className="h-8 w-auto"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                                        index === 0
                                            ? "text-gray-900 dark:text-white hover:text-volcano-primary"
                                            : "text-gray-600 dark:text-gray-300 hover:text-volcano-primary"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Dark Mode Toggle & Mobile Menu */}
                    <ThemeSwitcher/>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div
                            className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block px-3 py-2 text-base font-medium transition-colors ${
                                        index === 0
                                            ? "text-gray-900 dark:text-white hover:text-volcano-primary"
                                            : "text-gray-600 dark:text-gray-300 hover:text-volcano-primary"
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export {Navbar}