import classNames from 'classnames';
import styles from '../styles/GradientBackground.module.css';

export interface GradientBackgroundProps {
    variant: 'large' | 'small';
    className?: string;
}

const GradientBackground = ({variant, className}: GradientBackgroundProps) => {
    const classes = classNames(
        {
            [styles.colorBackground]: variant === 'large',
            [styles.colorBackgroundBottom]: variant === 'small',
        },
        className
    );

    return <div className={classes}/>;
};

export {GradientBackground};
