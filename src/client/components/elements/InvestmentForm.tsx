import { Button, DatePicker, Form, Input, Select } from 'antd'
import React, { ReactElement } from 'react'
import { GameI } from '../../interfaces/Game';
import { TokenI } from '../../interfaces/Token';
import { apiAddInvestment } from '../../pages/api/investments/apiInvestment';
import styles from '../../styles/ViewInvestmentModal.module.scss';
import { format } from 'date-fns';
import { useRecoilState } from 'recoil';
import { investmentsState } from '../../recoil/atoms';

interface Props {
    games: GameI[],
    tokens: TokenI[],
    gameName: string,
}

const { Option } = Select;

export default function InvestmentForm({ games, tokens, gameName }: Props): ReactElement {

    const [amountInDollar, setAmountInDollar] = React.useState(0);
    const [selected, setSelected] = React.useState('deposit');
    const [investments, setInvestments] = useRecoilState(investmentsState);

    const currentGame = games && gameName && games.find((game: any) => game.name === gameName);
    let currentGameId = 1;
    if (currentGame) {
        currentGameId = currentGame.id;
    }

    const [formData, setFormData] = React.useState({
        amount: 0,
        game: currentGameId,
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

    const handleSubmit = async () => {
        setFormData({ ...formData });
        const response = await apiAddInvestment({
            ...formData,
            token_amount: +formData.amount,
            amount: amountInDollar,
            is_withdrawal: selected === 'withdrawal' ? true : false
        });
        if (response) {
            setInvestments({
                ...investments,
                [gameName]: [...investments[gameName], response]
            });
        }
    };

    return (
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
                            filterOption={(input, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            defaultValue={currentGameId}
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
    )
}
