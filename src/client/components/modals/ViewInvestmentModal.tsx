import React, { ReactElement } from 'react';
import { Button, Collapse, DatePicker, Form, Input, InputNumber, Modal, Select, Switch } from 'antd';
import { format } from 'date-fns';
import styles from '../../styles/ViewInvestmentModal.module.scss';
import { useRecoilValue } from 'recoil';
import { gamesState, tokensState } from '../../recoil/atoms';
import { apiAddInvestment } from '../../pages/api/investments/apiInvestment';

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

    const [amountInDollar, setAmountInDollar] = React.useState(0);
    const [selected, setSelected] = React.useState('deposit');
    
    const games = useRecoilValue(gamesState);
    const tokens = useRecoilValue(tokensState);
    
    const [formData, setFormData] = React.useState({
        amount: 0,
        game: (games && games.find((game: any) => game.name === gameName)).id || 1,
        token: 0,
        date: format(new Date(Date.now()), 'dd/MM/yyyy'),
        is_withdrawal: false,
    });

    function onChange(value: any, property: string) {
        setFormData({
            ...formData,
            [property]: value,
        });
        if (property === 'amount') {
            const tokenPrice: any = tokens.find((token: any) => token.id === formData.token);
            setAmountInDollar(value * parseFloat(tokenPrice && tokenPrice.price || 1));
        }
      }
      
      function onBlur() {
        console.log('blur');
      }
      
      function onFocus() {
        console.log('focus');
      }
      
      function onSearch(val: any) {
        console.log('search:', val);
      }

      const handleSubmit = async() => {
          setFormData({...formData});
          const response = await apiAddInvestment({...formData,
            token_amount: +formData.amount,
            amount: amountInDollar,
            is_withdrawal: selected === 'withdrawal' ? true : false});
      };

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
                <div className={styles.form}>
                    <Form name="nest-messages" className={styles.formData} onFinish={handleSubmit} >
                        <div className={styles.container}>
                            <Form.Item name="Game" label="Game">
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select a game"
                                    optionFilterProp="children"
                                    onChange={(event) => onChange(event, 'game')}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    onSearch={onSearch}
                                    filterOption={(input, option: any) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    defaultValue={(games && games.find((game: any) => game.name === gameName)).id || 1}
                                >
                                    {games.map((game: any, index: number) => {
                                        return (
                                            <Option key={index} value={game.id}>{game.name}</Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item name="Token" label="Token">
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select a token"
                                    optionFilterProp="children"
                                    onChange={(event) => onChange(event, 'token')}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    onSearch={onSearch}
                                    value={formData.token}
                                    filterOption={(input, option: any) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {tokens.map((token: any, index: number) => {
                                        return (
                                            <Option key={index} value={token.id}>{token.symbol}</Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item name="Date" label="Date">
                                <DatePicker onChange={(event: any) => onChange(format(new Date(event), 'dd/MM/yyyy'), 'date')} />
                            </Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </div>
                        <div className={styles.containerRight}>
                            <Form.Item name="Amount (token)" label="Amount (token)">
                                <Input type="number" value={formData.amount} onChange={(event) => onChange(event.target.value, 'amount')} />
                            </Form.Item>
                            <Form.Item label="Withdrawal" valuePropName="checked">
                                <Button type={selected === 'withdrawal' ? 'primary' : 'dashed'} onClick={() => setSelected('withdrawal')}>Withdrawal</Button>
                                <Button type={selected === 'deposit' ? 'primary' : 'dashed'} onClick={() => setSelected('deposit')}>Deposit</Button>
                            </Form.Item>
                            <Form.Item name="Amount in $" label="Amount in $">
                                <Input type="number" defaultValue={amountInDollar} disabled />
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    )
}
