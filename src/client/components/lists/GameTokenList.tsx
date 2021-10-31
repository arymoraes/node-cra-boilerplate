import React, { ReactElement } from 'react';
import styles from '../../styles/GameTokenList.module.scss';
import { GameI } from '../../interfaces/Game';
import { useRecoilValue } from 'recoil';
import { gamesState } from '../../recoil/atoms';

interface Props {
    gameId?: number,
    handleGameChange: (gameId: number) => void,
}

function GameTokenList({gameId, handleGameChange}: Props): ReactElement {
    const games: GameI[] = useRecoilValue(gamesState);
    const [selected, setSelected] = React.useState<number | null>(gameId || null);

    const handleSelect = (_: any, gameId: number) => {
        setSelected(gameId);
        handleGameChange(gameId);
    }

    return (
        <div className={styles.tokenList}>
            Game:
            {games && games.map((game, index) => <li onClick={(event: any) => handleSelect(event, game.id)} className={game.id === selected ? styles.selected : ''} key={game.id}>{game.name}</li>)}
        </div>
    )
}

export default GameTokenList;