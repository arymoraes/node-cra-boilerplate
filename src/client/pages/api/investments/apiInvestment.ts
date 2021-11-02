import { InvestmentRawI } from "../../../interfaces/Investment";
import api from "../apiConfig";

export const apiGetInvestments = async () => {
    try {
        const investments = await api().get('/user/investments');
        return investments.data;
    } catch (err) {
        return false;
    }
}

export const apiAddInvestment = async (investment: InvestmentRawI) => {
    try {
        const newInvestment = await api().post('/user/investment', investment);
        return newInvestment.data;
    } catch (err) {
        return false;
    }
}
