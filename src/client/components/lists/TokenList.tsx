import React, { ReactElement } from 'react';
import { TokenI } from '../../interfaces/Token';
import { Token } from '../elements/Token';
import styles from '../../styles/TokenList.module.scss';

interface Props {
    tokens: TokenI[];
}

function TokenList({tokens}: Props): ReactElement {
    return (
        <div className={styles.tokenList}>
            {tokens.map((token: TokenI) => <Token token={token} key={token.id}/>)}
        </div>
    )
}

export default TokenList
