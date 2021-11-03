import { Modal } from 'antd';
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil';
import { gamesState, tokensState } from '../../recoil/atoms';
import InvestmentForm from '../elements/InvestmentForm';

interface Props {
    isOpen: boolean;
    closeModal: () => void;
}

export default function AddInvestmentModal({isOpen, closeModal}: Props): ReactElement {

    const games = useRecoilValue(gamesState);
    const tokens = useRecoilValue(tokensState);

    return (
        <Modal
            title={'Add Investment'}
            centered
            width={'45vw'}
            bodyStyle={{ height: '45vh' }}
            visible={isOpen}
            okText={'Close'}
            onCancel={closeModal}
            onOk={closeModal}
        >
            {games && Object.values(games).length && tokens && <InvestmentForm games={games} tokens={tokens} gameName={''} />}
        </Modal>
    )
}
