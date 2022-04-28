import { IsEnum } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn, Unique, OneToMany, AfterInsert, ManyToMany, JoinTable } from "typeorm";

import { Model } from './Models/Model'
import { User } from './User';

@Entity()
export class Reward extends Model {
    @Column({
        nullable: false,
        type: 'enum',
        enum: ['post', 'comment', 'likeIt'],
    })
    @IsEnum(['post', 'comment', 'likeIt'])
    type!: string;

    @ManyToOne(() => User, user => user.rewardForId, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    user!: User;
}
