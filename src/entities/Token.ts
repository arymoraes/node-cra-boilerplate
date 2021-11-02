import {
    Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, OneToMany,
} from 'typeorm';
import { Game } from './Game';
import { Investment } from './Investment';
import { User } from './User';

@Entity()
export class Token extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    contract: string;

    @Column()
    name: string;

    @Column()
    symbol: string;

    @Column({
        nullable: true,
    })
    is_main: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    @ManyToMany(() => User, (user) => user.tokens)
    users: User[];

    @ManyToOne(() => Game, (game: Game) => game.token)
    game: Game;

    @OneToMany(() => Investment, (investment) => investment.token)
    investment: Investment[];
}