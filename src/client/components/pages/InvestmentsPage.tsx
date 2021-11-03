import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { investmentsState, investmentsTotalState } from '../../recoil/atoms';
import { GameInvestmentCard } from '../elements/GameInvestmentCard';
import { TotalProfit } from '../elements/TotalProfit';

export default function InvestmentsPage(): ReactElement {

    const investments = useRecoilValue(investmentsState);
    const investmentsTotal = useRecoilValue(investmentsTotalState);

    return (
        <div>
            {investmentsTotal && <TotalProfit isHeader={false} investmentsTotal={investmentsTotal} />}
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
