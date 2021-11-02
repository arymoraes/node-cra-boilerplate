import { Response } from "express";
import { Investment } from "../entities/Investment";
import { AuthRequest } from "../middleware/auth";

export const addUserInvestment = (req: AuthRequest, res: Response) => {
    try {
        const { user } = req;
        const { date, amount, is_withdrawal, game, token, token_amount } = req.body;
        const userInvestment = {
            user: user.id,
            date, amount, is_withdrawal, game, token, token_amount
        };
        const newUserInvestment = Investment.create(userInvestment);
        newUserInvestment.save()
            .then(() => res.status(201).json(newUserInvestment))
            .catch(err => res.status(500).json({ message: err.message }));
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getUserInvestments = async (req: AuthRequest, res: Response) => {
    try {
        const { user } = req;
        const userInvestments = await Investment.find({ where: {user: user.id}, relations: ['game', 'token', 'user'] });

        const investmentObject: any = {};
        const totalInvestments: any = {};

        userInvestments.forEach(investment => {
            investmentObject[investment.game.name] = [...(investmentObject[investment.game.name] || []), {
                date: investment.date,
                amount: investment.amount,
                is_withdrawal: investment.is_withdrawal,
                token_amount: investment.token_amount,
                token: investment.token.symbol,
            }];
            const withdrawalMultiplier = investment.is_withdrawal ? 1 : -1;
            totalInvestments[investment.game.name] = (totalInvestments[investment.game.name] || 0) + (investment.amount * withdrawalMultiplier);
        });

        res.status(200).send({
            investments: investmentObject,
            totalInvestments,
        });
    } catch (error) {
        res.status(500).send(error);
    }
}