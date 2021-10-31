import React from 'react';
import { TokenI } from '../../interfaces/Token';
import styles from '../../styles/Token.module.scss';
import { Popover, Button } from 'antd';

interface Props {
    token: TokenI,
}

export const Token = ({ token }: Props) => {

    const content = (
        <div>
          <p>{token.name}</p>
          <p>{token.contract}</p>
        </div>
    );

    return (
        <Popover content={content} title={token.name}>
            <Button className={styles.button} type="primary">{token.symbol}: ${token.price}</Button>
        </Popover>
    )
}
