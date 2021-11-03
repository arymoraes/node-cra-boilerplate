import React from 'react';
import styles from '../../styles/TotalProfit.module.scss';
import { Popover, Button } from 'antd';

interface Props {
    investmentsTotal: any,
    isHeader: boolean,
}

export const TotalProfit = ({ investmentsTotal, isHeader }: Props) => {

    const totalValue = investmentsTotal && Object.values(investmentsTotal).reduce((a, b) => a + b, 0);
    const positiveValues = investmentsTotal && Object.values(investmentsTotal).filter((value:any) => value > 0).reduce((a, b) => a + b, 0);
    const negativeValues = investmentsTotal && Object.values(investmentsTotal).filter((value:any) => value < 0).reduce((a, b) => a + b, 0);

    const content = (
        <div>
          <p>Deposited: ${positiveValues.toFixed(2)}</p>
          <p>Withdrawn: ${Math.abs(negativeValues.toFixed(2))}</p>
        </div>
    );

    return (
        <Popover content={content} title={totalValue}>
            {!isHeader && <span className={styles.gainloss}>Total Gain/Loss: </span>}
            <Button className={totalValue > 0 ? styles.buttonPositive : styles.buttonNegative} type="primary">${totalValue.toFixed(2)}</Button>
        </Popover>
    )
}
