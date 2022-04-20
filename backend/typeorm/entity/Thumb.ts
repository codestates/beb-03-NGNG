import { Entity, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Post } from './Post';
import { User } from './User'
import { Model } from "./Models/Model";


@Entity()
export class Thumb extends Model {
    @Column({
        nullable: false,
        default: false
    })
    likeIt!: boolean

    @ManyToOne(_ => User, user => user.index, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    user!: User

    @ManyToOne(_ => Post, post => post.index, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    post!: Post
}  