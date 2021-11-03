import React from 'react';
import styles from '../../styles/GameInvestmentCard.module.scss';
import { Collapse } from 'antd';
import ViewInvestmentModal from '../modals/ViewInvestmentModal';
const { Panel } = Collapse;

interface Props {
    investmentGame: any,
    gameName: string,
    totalInvestment: number,
}

export const GameInvestmentCard = ({ investmentGame, gameName, totalInvestment }: Props) => {

    const [isOpen, setIsOpen] = React.useState<any>({});

    const openModal = () => {
        setIsOpen({
            ...isOpen,
            [gameName]: true
        });
    }

    const closeModal = () => {
        setIsOpen({
            ...isOpen,
            [gameName]: false
        });
    }

    return (
        <>
            <ViewInvestmentModal gameName={gameName} key={gameName} isOpen={isOpen} closeModal={closeModal} totalEarnings={totalInvestment} investmentGame={investmentGame} />
            <main className={styles.container} onClick={openModal}>
                <div className={styles.symbol}>
                    {investmentGame.length}
                </div>
                <div className={styles.title}>
                    {gameName}
                </div>
                <div className={totalInvestment > 0 ? styles.price : styles.priceNegative}>
                    ${totalInvestment.toFixed(2)}
                </div>
            </main>
        </>
    )
}
