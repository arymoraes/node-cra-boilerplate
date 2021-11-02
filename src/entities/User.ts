import {
    Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, OneToMany,
} from 'typeorm';
import { Game } from './Game';
import { Investment } from './Investment';
import { Token } from './Token';

export enum UserRole {
    ADMIN = 'admin',
    OWNER = 'owner',
    USER = 'user'
}

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    username: string;

    @Column()
    password: string;

    @Column({
        nullable: true,
    })
    resetPassword: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole

    @ManyToMany(() => Token, (token) => token.users)
    @JoinTable({ name: 'users_tokens' })
    tokens: Token[];

    @ManyToMany(() => Game, (game) => game.users)
    @JoinTable({ name: 'users_games' })
    game: Game[];

    @OneToMany(() => Investment, (investment) => investment.user)
    investment: Investment[];
}