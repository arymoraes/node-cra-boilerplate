import {
    Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany, ManyToOne,
} from 'typeorm';
import { Game } from './Game';
import { Token } from './Token';
import { User } from './User';

@Entity()
export class Investment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    date: Date;

    @Column("decimal", { precision: 5, scale: 2 })
    amount: number;

    @Column("decimal", { precision: 10, scale: 2, nullable: true })
    token_amount: number;

    @Column({
        default: false,
    })
    is_withdrawal: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    @ManyToOne(() => Game, (game: Game) => game.investment)
    game: Game;

    @ManyToOne(() => Token, (token: Token) => token.investment)
    token: Token;

    @ManyToOne(() => User, (user: User) => user.investment)
    user: User;
}