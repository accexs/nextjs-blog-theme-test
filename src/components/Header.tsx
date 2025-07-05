import Link from 'next/link';
import {Navbar} from "@/components/Navbar";

interface HeaderProps {
    name: string;
}

const Header = ({name}: HeaderProps) => (
    <header className="pt-12 pb-8">
        <Navbar/>
    </header>
);

export default Header;
