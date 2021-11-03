import { Button } from 'antd';
import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { investmentsState, investmentsTotalState } from '../../recoil/atoms';
import { GameInvestmentCard } from '../elements/GameInvestmentCard';
import { TotalProfit } from '../elements/TotalProfit';
import AddInvestmentModal from '../modals/AddInvestmentModal';
import styles from '../../styles/InvestmentPage.module.scss';

export default function InvestmentsPage(): ReactElement {

    const investments = useRecoilValue(investmentsState);
    const investmentsTotal = useRecoilValue(investmentsTotalState);

    const [isOpen, setIsOpen] = React.useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    return (
        <div>
            <Button className={styles.addInvestment} type="primary" onClick={openModal}>Add Investment</Button>
            <br></br>
            <AddInvestmentModal isOpen={isOpen} closeModal={closeModal}/>
            {investmentsTotal && <div className={styles.totalProfit}><TotalProfit isHeader={false} investmentsTotal={investmentsTotal} /></div>}
            {investments && investmentsTotal && Object.values(investments).length && Object.values(investments).map((investment: any, index: number) => {
                const gameName = Object.keys(investments)[index];
                const totalInvestment = investmentsTotal[gameName];
                return (
                        <GameInvestmentCard key={gameName} totalInvestment={totalInvestment} gameName={gameName} investmentGame={investment} />
                )
            })}
        </div>
    )
}
