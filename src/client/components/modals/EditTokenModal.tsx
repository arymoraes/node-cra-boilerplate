import React, { ReactElement } from 'react';
import { Modal, Input, Alert } from 'antd';
import { TokenEditI, TokenI, TokenRawI } from '../../interfaces/Token';
import { apiAddToken } from '../../pages/api/api';
import styles from '../../styles/AddTokenModal.module.scss';

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    handleEditToken: (token: TokenI) => void;
}

export default function EditTokenModal({ isOpen, closeModal, handleEditToken }: Props): ReactElement {

    const [tokenInput, setTokenInput] = React.useState<TokenEditI>({
        contract: '',
        name: '',
        symbol: '',
        game: undefined,
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
        const res = await apiAddToken(tokenInput);
        console.log(res);
        if (res) {
            handleEditToken(res);
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
                    <Input placeholder="Contract Address" className={styles.input} onChange={handleChange} name="contract" required />
                    <label htmlFor="Name" className={styles.label}>Name</label>
                    <Input placeholder="Name" className={styles.input} onChange={handleChange} name="name" required />
                    <label htmlFor="symbol" className={styles.label}>Contract Address</label>
                    <Input placeholder="Symbol" className={styles.input} onChange={handleChange} name="symbol" required />
                </form>
            </Modal>
        </>
    )
}
