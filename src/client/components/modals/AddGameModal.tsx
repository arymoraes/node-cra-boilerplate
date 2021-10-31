import React, { ReactElement } from 'react';
import { Modal, Input, Alert } from 'antd';
import { GameI, GameRawI } from '../../interfaces/Game';
import { apiAddGame } from '../../pages/api/games/apiGames';
import styles from '../../styles/AddGameModal.module.scss';

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    handleAddGame: (game: GameI) => void;
}

export default function AddGameModal({ isOpen, closeModal, handleAddGame }: Props): ReactElement {

    const [gameInput, setGameInput] = React.useState<GameRawI>({
        name: '',
        url: '',
        img: '',
    });
    const [axiosResponse, setAxiosResponse] = React.useState<any>({
        status: '',
        message: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGameInput({
            ...gameInput,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const res = await apiAddGame(gameInput);
        console.log(res);
        if (res) {
            handleAddGame(res);
            setAxiosResponse({
                status: 'success',
                message: 'Game successfully added',
            });
        }
    }

    return (
        <>
            <Modal
                title="Add game"
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
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <Input placeholder="Name" className={styles.input} onChange={handleChange} name="name" required />
                    <label htmlFor="url" className={styles.label}>URL</label>
                    <Input placeholder="URL" className={styles.input} onChange={handleChange} name="url" required />
                    <label htmlFor="img" className={styles.label}>Image (Link)</label>
                    <Input placeholder="Image (link)" className={styles.input} onChange={handleChange} name="img" required />
                </form>
            </Modal>
        </>
    )
}
