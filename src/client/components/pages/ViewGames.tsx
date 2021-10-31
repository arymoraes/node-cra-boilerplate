import React, { ReactElement, useEffect } from 'react';
import { GameI } from '../../interfaces/Game';
import { apiGetGames } from '../../pages/api/games/apiGames';
import { GameCard } from '../elements/GameCard';
import styles from '../../styles/ViewGames.module.scss';
import { Button, Input } from 'antd';
import AddGameModal from '../modals/AddGameModal';

const { Search } = Input;

export default function ViewGames(): ReactElement {

    const [games, setGames] = React.useState<GameI[]>([]);
    const [filteredGames, setFilteredGames] = React.useState<GameI[]>([]);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    useEffect(() => {
        apiGetGames().then(res => {
            setGames(res);
            setFilteredGames(res);
        });
    }, []);

    const handleAddGame = (game: GameI) => {
        setGames([...games, game]);
        setFilteredGames([...filteredGames, game]);
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilteredGames(games.filter(game => game.name.toLowerCase().includes(event.target.value.toLowerCase())));
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const handleGameDeletion = (gameId : number) => {
        const newGames = games.filter(game => game.id != gameId);
        setGames(newGames);
        setFilteredGames(newGames);
    }

    return (
        <>
            <Search placeholder="input search text" style={{ width: 200 }} onChange={handleSearch} />
            <Button type="primary" onClick={openModal}>
                Add Game
            </Button>
            <AddGameModal isOpen={isOpen} closeModal={closeModal} handleAddGame={handleAddGame}/>
            <div className={styles.container}>
                {filteredGames && filteredGames.map((game) => <GameCard handleGameDeletion={handleGameDeletion} key={game.id} game={game} />)}
            </div>
        </>
    )
}
