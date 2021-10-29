import React from 'react'
import TokenI from '../../interfaces/Token'

interface Props {
    token: TokenI,
}

export const Token = ({token}: Props) => {
    return (
        <div>
            {token.symbol}: {token.name}
        </div>
    )
}
