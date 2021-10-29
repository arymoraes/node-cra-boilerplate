import React, { ReactElement } from 'react'
import TokenI from '../../interfaces/Token'
import { Token } from '../elements/Token';

interface Props {
    tokens: TokenI[];
}

function TokenList({tokens}: Props): ReactElement {
    return (
        <div>
            {tokens.map((token: TokenI) => <Token token={token} key={token.id}/>)}
        </div>
    )
}

export default TokenList
