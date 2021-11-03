import React, { ReactElement } from 'react';
import { Button, Collapse, Modal, Select } from 'antd';
import { format } from 'date-fns';
import styles from '../../styles/ViewInvestmentModal.module.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gamesState, investmentsState, tokensState } from '../../recoil/atoms';
import InvestmentForm from '../elements/InvestmentForm';
import { apiDeleteInvestment } from '../../pages/api/investments/apiInvestment';

const { Panel } = Collapse;

interface Props {
    isOpen: any;
    closeModal: () => void;
    investmentGame: any;
    gameName: string;
    totalEarnings: number;
}

export default function ViewInvestmentModal({ investmentGame, isOpen, closeModal, gameName, totalEarnings }: Props): ReactElement {
   
    const games = useRecoilValue(gamesState);
    const tokens = useRecoilValue(tokensState);
    const [investments, setInvestments] = useRecoilState(investmentsState);

    const handleDelete = async (id: number) => {
        const response = await apiDeleteInvestment(id);
        if (response) {
            setInvestments({
                ...investments,
                [gameName]: investments[gameName].filter((investment: any) => investment.id !== id)});
        }
    }

    return (
        <>
            <Modal
                title={gameName}
                centered
                width={'85vw'}
                bodyStyle={{ height: '85vh' }}
                visible={isOpen[gameName]}
                okText={'Close'}
                onCancel={closeModal}
                onOk={closeModal}
            >
                Total Earnings: {totalEarnings}
                <Collapse
                    defaultActiveKey={['1']}
                    className={styles.collapse}
                >
                    {investmentGame.map((game: any, index: number) => {
                        const investmentDate = format(new Date(game.date), 'dd/MM/yyyy');
                        return (
                            <Panel header={`${game.is_withdrawal ? 'Sold' : 'Bought'} ${game.token_amount || `$${game.amount} worth of `} ${game.token} on ${investmentDate}`} key={index} style={{ background: game.is_withdrawal ? '#90EE90' : '#ff4d4f' }}>
                                <div>
                                    <p>
                                        <b>Token:</b> {game.token}
                                    </p>
                                    {
                                        game.token_amount &&
                                        <p>
                                            <b>Token Amount:</b> {game.token_amount}
                                        </p>
                                    }
                                    <p>
                                        <b>Investment Amount:</b> ${game.amount}
                                    </p>
                                    <p>
                                        <b>Investment Date:</b> {investmentDate}
                                    </p>
                                    <Button danger type="primary" onClick={() => handleDelete(game.id)}>Delete</Button>
                                </div>
                            </Panel>
                        )
                    })}
                </Collapse>
                <InvestmentForm gameName={gameName} games={games} tokens={tokens}/>
            </Modal>
        </>
    )
}
