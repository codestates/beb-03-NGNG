import { Entity, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Post } from './Post';
import { User } from './User'
import { Model } from "./Models/Model";


@Entity()
export class Comment extends Model {
    @Column({
        nullable: false,
        type: 'longtext'
    })
    content!: string;

    @Column('boolean', {
        default: false
    })
    deleted!: boolean;

    @Column({
        nullable: true
    })
    anonymouseId?: string;

    @Column({
        nullable: true
    })
    password?: string;

    @Column({
        nullable: false,
        default: false
    })
    isMember!: boolean;

    @ManyToOne(_ => Comment, comment => comment.childComments)
    parentComment!: Comment

    @OneToMany(_ => Comment, comment => comment.parentComment, {
        primary: true
    })
    childComments!: Comment[]

    @ManyToOne(() => User, user => user.comments, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    user!: User;

    @ManyToOne(() => User, user => user.commentsForId, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user_id!: User;


    @ManyToOne(() => Post, post => post.comments, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    post!: Post;



    toJSON() {
        return {
            ...this,
            password: undefined
        }
    }
}