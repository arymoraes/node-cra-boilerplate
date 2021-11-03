import { Response } from "express";
import { Token } from "../entities/Token";
import { Investment } from "../entities/Investment";
import { AuthRequest } from "../middleware/auth";

export const addUserInvestment = async (req: AuthRequest, res: Response) => {
    try {
        const { user } = req;
        const { date, amount, is_withdrawal, game, token, token_amount } = req.body;

        const fetchedToken = await Token.findOne(token);

        const userInvestment = {
            user: user.id,
            date, amount, is_withdrawal, game, token, token_amount
        };
        const newUserInvestment = Investment.create(userInvestment);
        newUserInvestment.save()
            .then(() => res.status(201).json({
                id: newUserInvestment.id,
                amount: newUserInvestment.amount.toFixed(2),
                date: newUserInvestment.date,
                is_withdrawal: newUserInvestment.is_withdrawal,
                token: fetchedToken.symbol,
                token_amount: newUserInvestment.token_amount.toFixed(2),
            }))
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
                id: investment.id
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

export const deleteInvestment = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
  
      await Investment.delete(id);
  
      res.status(200).send({
        investment: id,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  