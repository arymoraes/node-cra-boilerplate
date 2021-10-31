import React, { ReactElement } from 'react';
import { Modal, Input, Alert } from 'antd';
import { TokenEditI, TokenI } from '../../interfaces/Token';
import { apiEditToken } from '../../pages/api/api';
import styles from '../../styles/AddTokenModal.module.scss';

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    handleEditToken: (token: TokenI) => void;
    token: TokenI;
}

export default function EditTokenModal({ token, isOpen, closeModal, handleEditToken }: Props): ReactElement {

    const [tokenInput, setTokenInput] = React.useState<TokenEditI>({
        contract: token.contract,
        name: token.name,
        symbol: token.symbol,
        game: token.game,
    });

    const [axiosResponse, setAxiosResponse] = React.useState<any>({
        status: '',
        message: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTokenInput({
            ...tokenInput,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const res = await apiEditToken({
            ...token,
            ...tokenInput,
        });

        if (res) {
            handleEditToken({
                ...token, ...tokenInput
            });
            setAxiosResponse({
                status: 'success',
                message: 'Token successfully edited.',
            });
        }
    }

    return (
        <>
            <Modal
                title="Edit token"
                centered
                visible={isOpen}
                okText="Submit"
                okButtonProps={{
                    htmlType: 'submit',
                }}
                onOk={handleSubmit}
                onCancel={closeModal}
            >
                {axiosResponse.status && <Alert message={axiosResponse.message} type={axiosResponse.status} />}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="contract" className={styles.label}>Contract Address</label>
                    <Input placeholder="Contract Address" className={styles.input} onChange={handleChange} name="contract" value={tokenInput.contract} required />
                    <label htmlFor="Name" className={styles.label}>Name</label>
                    <Input placeholder="Name" className={styles.input} onChange={handleChange} name="name" value={tokenInput.name} required />
                    <label htmlFor="symbol" className={styles.label}>Contract Address</label>
                    <Input placeholder="Symbol" className={styles.input} onChange={handleChange} name="symbol" value={tokenInput.symbol} required />
                </form>
            </Modal>
        </>
    )
}
