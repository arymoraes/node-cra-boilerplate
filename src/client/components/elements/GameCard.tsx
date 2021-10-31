import React from 'react';
import styles from '../../styles/GameCard.module.scss';
import { GameI } from '../../interfaces/Game';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { apiDeleteGame } from '../../pages/api/games/apiGames';

interface Props {
    game: GameI,
    handleGameDeletion: (gameId: number) => void,
}

export const GameCard = ({ game, handleGameDeletion }: Props) => {

    const handleDelete = async (event: any) => {
        const response = await apiDeleteGame(game);
        if (response) {
            handleGameDeletion(game.id);
        }
    }

    const cancel = (event: any) => {
    }

    return (
        <a>
            <main className={styles.container} style={{ backgroundImage: `url(${game.img})` }}>
                <div className={styles.title}>
                    {game.name}
                </div>
                <Popconfirm
                    title={`Are you sure to delete ${game.name} ?`}
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
