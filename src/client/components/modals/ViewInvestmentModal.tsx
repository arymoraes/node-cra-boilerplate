import React, { ReactElement } from 'react';
import { Collapse, Modal, Select } from 'antd';
import { format } from 'date-fns';
import styles from '../../styles/ViewInvestmentModal.module.scss';
import { useRecoilValue } from 'recoil';
import { gamesState, tokensState } from '../../recoil/atoms';
import InvestmentForm from '../elements/InvestmentForm';

const { Panel } = Collapse;
const { Option } = Select;

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
