import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    text: string;
    onClick: (() => void)
}

const Button = ({text, onClick}: ButtonProps) => {
    return (
        <button type="button" className={styles.button} onClick={onClick}>
            {text}
        </button>);
};

export default Button;