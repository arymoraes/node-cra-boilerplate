import React from 'react';
import styles from '../../styles/GameInvestmentCard.module.scss';
import { Collapse } from 'antd';
const { Panel } = Collapse;

interface Props {
    investmentGame: any,
    gameName: string,
}

export const GameInvestmentCard = ({ investmentGame, gameName }: Props) => {

    function callback(key: any) {
        console.log(key);
    }

    console.log(gameName);

    return (
        <Collapse defaultActiveKey={['1']} onChange={callback}>
            <div>{gameName && gameName}</div>  
            {investmentGame.map((investment: any, index: number) => {
                return (
                    <Panel header={investment.date} key={index}>
                        <p>{investment.token}</p>
                        <p className={investment.is_withdrawal ? styles.withdrawal : styles.deposit }>{investment.amount}</p>
                    </Panel>
                )
            })}
        </Collapse>
    )
}
