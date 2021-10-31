import React from 'react';
import styles from '../../styles/TokenCard.module.scss';
import { TokenI } from '../../interfaces/Token';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { apiDeleteToken } from '../../pages/api/api';
import EditTokenModal from '../modals/EditTokenModal';

interface Props {
    token: TokenI,
    handleTokenDeletion: (tokenId: number) => void,
    handleEditToken: (token: TokenI) => void,
}

export const TokenCard = ({ token, handleTokenDeletion, handleEditToken }: Props) => {

    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const handleDelete = async (event: any) => {
        const response = await apiDeleteToken(token.id);
        if (response) {
            handleTokenDeletion(token.id);
        }
    }

    const cancel = (event: any) => {
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <a>
            <EditTokenModal isOpen={isOpen} token={token} closeModal={closeModal} handleEditToken={handleEditToken}/>
            <main className={styles.container} onClick={openModal}>
                <div className={styles.symbol}>
                    {token.symbol}
                </div>
                <div className={styles.title}>
                    {token.name}
                </div>
                {token.game && <span>{token.game.name}</span>}
                <div className={styles.price}>
                    ${token.price}
                </div>
                <Popconfirm
                    title={`Are you sure to delete ${token.name} ?`}
                    onConfirm={handleDelete}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" danger className={styles.delete}>
                        <DeleteOutlined />
                    </Button>
                </Popconfirm>

            </main>
        </a>
    )
}
