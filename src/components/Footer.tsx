import {ThemeSwitcher} from "@/components/ThemeSwitcher";

interface FooterProps {
    copyrightText: string;
}

const Footer = ({copyrightText}: FooterProps) => (
    <footer className="flex flex-col items-center py-16">
        <p className="mb-3 font-bold uppercase dark:text-white opacity-60">
            {copyrightText}
        </p>
        <ThemeSwitcher/>
    </footer>
);

export default Footer;
