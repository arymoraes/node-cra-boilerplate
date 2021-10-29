import {
    Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable,
} from 'typeorm';
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

    // @ManyToMany(() => Token)
    // @JoinTable({
    //     name: 'users_tokens'
    // })
    // tokens: Token[];

    @ManyToMany(() => Token, (token) => token.users)
    @JoinTable({ name: 'users_tokens' })
    tokens: Token[];
  
}