import React, { ReactElement, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { apiGetInvestments } from '../../pages/api/investments/apiInvestment';
import { investmentsState, investmentsTotalState } from '../../recoil/atoms';
import { GameInvestmentCard } from '../elements/GameInvestmentCard';

export default function InvestmentsPage(): ReactElement {

    const [investments, setInvestments] = useRecoilState<any>(investmentsState);
    const [investmentsTotal, setInvestmentsTotal] = useRecoilState<any>(investmentsTotalState);

    useEffect(() => {
        apiGetInvestments().then(res => {
            setInvestments(res.investments);
            setInvestmentsTotal(res.totalInvestments);
        });
    }, [])

    return (
        <div>
            Total Profit: {investmentsTotal && Object.values(investmentsTotal).reduce((a, b) => a + b, 0)}
            {investments && Object.values(investments).map((investment: any, index: number) => {
                const gameName = Object.keys(investments)[index];
                const totalInvestment = investmentsTotal[gameName];
                return (
                <GameInvestmentCard key={gameName} totalInvestment={totalInvestment} gameName={gameName} investmentGame={investment} />
                )
            })}
        </div>
    )
}
