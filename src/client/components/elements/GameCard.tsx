import React from 'react';
import styles from '../../styles/GameCard.module.scss';
import { GameI } from '../../interfaces/Game';

interface Props {
    game: GameI,
}

export const GameCard = ({ game }: Props) => {

    return (
        <a href={game.url}>
            <main className={styles.container} style={{backgroundImage: `url(${game.img})`}}>
                <div className={styles.title}>
                    {game.name}
                </div>
            </main>
        </a>
    )
}
