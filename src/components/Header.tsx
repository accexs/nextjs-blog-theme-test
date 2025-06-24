import Link from 'next/link';

interface HeaderProps {
    name: string;
}

const Header = ({name}: HeaderProps) => (
    <header className="pt-12 pb-8">
        <div
            className="block w-12 h-12 mx-auto mb-2 rounded-full bg-conic-180 from-gradient-3 from-0% to-gradient-4 to-100%"/>
        <nav className="flex justify-center space-x-6 text-xl dark:text-white">
            <Link href="/" className="font-semibold">
                {name}
            </Link>
            <Link href="/posts" className="hover:underline">Blog</Link>
            <Link href="/about" className="hover:underline">About</Link>
        </nav>
    </header>
);

export default Header;
