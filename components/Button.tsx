import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    onClick: (() => void) | (() => Promise<void>)
}

const Button = ({onClick}: ButtonProps) => {
    return (
        <button type="button" className={styles.button} onClick={onClick}>
            Sync Wallet
        </button>);
};

export default Button;