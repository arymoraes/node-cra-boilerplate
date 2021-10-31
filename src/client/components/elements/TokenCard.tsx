import React from 'react';
import styles from '../../styles/TokenCard.module.scss';
import { TokenI } from '../../interfaces/Token';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { apiDeleteToken } from '../../pages/api/api';

interface Props {
    token: TokenI,
    handleTokenDeletion: (tokenId: number) => void,
}

export const TokenCard = ({ token, handleTokenDeletion }: Props) => {

    const handleDelete = async (event: any) => {
        const response = await apiDeleteToken(token.id);
        if (response) {
            handleTokenDeletion(token.id);
        }
    }

    const cancel = (event: any) => {
    }

    return (
        <a>
            <main className={styles.container}>
                <div className={styles.symbol}>
                    {token.symbol}
                </div>
                <div className={styles.title}>
                    {token.name}
                </div>
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
