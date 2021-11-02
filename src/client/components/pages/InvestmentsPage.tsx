import React, { ReactElement, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { apiGetInvestments } from '../../pages/api/investments/apiInvestment';
import { investmentsState } from '../../recoil/atoms';
import { GameInvestmentCard } from '../elements/GameInvestmentCard';

export default function InvestmentsPage(): ReactElement {

    const [investments, setInvestments] = useRecoilState<any>(investmentsState);

    useEffect(() => {
        apiGetInvestments().then(res => {
            setInvestments(res.investments);
            console.log(res.investments);
        });
    }, [])

    return (
        <div>
            {investments && Object.values(investments).map((investment: any, index: number) => {
                return <GameInvestmentCard key={investment.id} gameName={Object.keys(investments)[index]} investmentGame={investment} />
            })}
        </div>
    )
}
