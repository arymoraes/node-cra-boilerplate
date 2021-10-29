import React from 'react';
import TokenI from '../../interfaces/Token';
import styles from '../../styles/Token.module.scss';

interface Props {
    token: TokenI,
}

export const Token = ({token}: Props) => {
    return (
        <div className={styles.token}>
            {token.symbol}: ${token.price}
        </div>
    )
}
