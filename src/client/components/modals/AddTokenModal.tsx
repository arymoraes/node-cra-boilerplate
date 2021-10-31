import React, { ReactElement } from 'react';
import { Modal, Input, Alert } from 'antd';
import { TokenI, TokenRawI } from '../../interfaces/Token';
import { apiAddToken } from '../../pages/api/api';
import styles from '../../styles/AddTokenModal.module.scss';

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    handleAddToken: (token: TokenI) => void;
}

export default function AddTokenModal({ isOpen, closeModal, handleAddToken }: Props): ReactElement {

    const [tokenInput, setTokenInput] = React.useState<TokenRawI>({
        contract: '',
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
            handleAddToken(res);
            setAxiosResponse({
                status: 'success',
                message: 'Token successfully added',
            });
        }
    }

    return (
        <>
            <Modal
                title="Add token"
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
                </form>
            </Modal>
        </>
    )
}
