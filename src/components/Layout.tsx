import classNames from 'classnames';
import {type ReactNode} from 'react';
import styles from './Layout.module.css';

export interface GradientBackgroundProps {
    variant: 'large' | 'small';
    className?: string;
}

export const GradientBackground = ({variant, className}: GradientBackgroundProps) => {
    const classes = classNames(
        {
            [styles.colorBackground]: variant === 'large',
            [styles.colorBackgroundBottom]: variant === 'small',
        },
        className
    );

    return <div className={classes}/>;
};

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({children}: LayoutProps) => {
    return (
        <div className="relative pb-24 overflow-hidden">
            <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
                {children}
            </div>
        </div>
    );
};

export default Layout;
