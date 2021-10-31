import React, { ReactElement, useEffect } from 'react';
import { TokenI } from '../../interfaces/Token';
import styles from '../../styles/ViewTokens.module.scss';
import {  Button, Input } from 'antd';
import { apiGetTokens } from '../../pages/api/api';
import AddTokenModal from '../modals/AddTokenModal';
import { TokenCard } from '../elements/TokenCard';
import { useRecoilState } from 'recoil';
import { tokensState } from '../../recoil/atoms';

const { Search } = Input;

export default function ViewTokens(): ReactElement {

    const [tokens, setTokens] = useRecoilState(tokensState);
    const [filteredTokens, setFilteredTokens] = React.useState<TokenI[]>([]);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    useEffect(() => {
        apiGetTokens().then(res => {
            setTokens(res);
            setFilteredTokens(res);
        });
    }, []);

    const handleAddToken = (token: TokenI) => {
        setTokens([...tokens, token]);
        setFilteredTokens([...filteredTokens, token]);
    }

    const handleEditToken = (token: TokenI) => {
        setTokens([...tokens].map((updatedToken: TokenI) => {
            if (updatedToken.id === token.id) {
                return token;
            }
            return updatedToken;
        }));
        setFilteredTokens([...tokens].map((updatedToken: TokenI) => {
            if (updatedToken.id === token.id) {
                return token;
            }
            return updatedToken;
        }));
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilteredTokens(tokens.filter(token => token.name.toLowerCase().includes(event.target.value.toLowerCase())));
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const handleTokenDeletion = (tokenId : number) => {
        const newTokens = tokens.filter(token => token.id != tokenId);
        setTokens(newTokens);
        setFilteredTokens(newTokens);
    }

    return (
        <>
            <Search placeholder="input search text" style={{ width: 200 }} onChange={handleSearch} />
            <Button type="primary" onClick={openModal}>
                Add Token
            </Button>
            <AddTokenModal isOpen={isOpen} closeModal={closeModal} handleAddToken={handleAddToken}/>
            <div className={styles.container}>
                {filteredTokens && filteredTokens.map((token) => <TokenCard handleEditToken={handleEditToken} handleTokenDeletion={handleTokenDeletion} key={token.id} token={token} />)}
            </div>
        </>
    )
}
