import React, { ReactElement, useEffect } from 'react';
import { GameI, GameRawI } from '../../interfaces/Game';
import { apiAddGame, apiGetGames } from '../../pages/api/games/apiGames';
import { GameCard } from '../elements/GameCard';
import styles from '../../styles/ViewGames.module.scss';
import { AutoComplete, Input } from 'antd';

const { Search } = Input;

export default function ViewGames(): ReactElement {

    const [games, setGames] = React.useState<GameI[]>([]);
    const [gameInput, setGameInput] = React.useState<GameRawI>({
        name: '',
        url: '',
        img: '',
    });
    const [filteredGames, setFilteredGames] = React.useState<GameI[]>([]);

    useEffect(() => {
        apiGetGames().then(res => {
            setGames(res);
            setFilteredGames(res);
        });
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGameInput({
            ...gameInput,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const res = await apiAddGame(gameInput);
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilteredGames(games.filter(game => game.name.toLowerCase().includes(event.target.value.toLowerCase())));
    }

    return (
        <>
            <Search placeholder="input search text" style={{ width: 200 }} onChange={handleSearch} />
            <div className={styles.container}>
                {filteredGames && filteredGames.map((game) => <GameCard key={game.id} game={game} />)}
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={handleChange} name="name" />
                    <input type="text" onChange={handleChange} name="url" />
                    <input type="text" onChange={handleChange} name="img" />
                    <button type="submit">Boilimax</button>
                </form>
            </div>
        </>
    )
}
