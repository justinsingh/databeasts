import React from 'react';
import classnames from 'classnames'
import styles from './Button.module.css';

interface ButtonProps {
    text: string;
    onClick: (() => void)
    sync?: boolean
}

const Button = ({text, onClick, sync=false}: ButtonProps) => {
    const classNames = classnames({
        [styles.button]: true,
        [styles.sync]: sync
    })
    return (
        <button type="button" className={classNames} onClick={onClick}>
            {text}
        </button>);
};

export default Button;