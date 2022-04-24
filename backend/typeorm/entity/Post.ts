import { Thumb } from './Thumb';
import { IsIP, Length } from "class-validator";
import { Entity, Column, ManyToOne, OneToMany, AfterInsert } from "typeorm";
import { Comment } from "./Comment";

import { Model } from './Models/Model'
import { User } from './User'
import { HashTag } from './HashTag';

@Entity()
export class Post extends Model {

    @Column({ type: "text" })
    content!: string;

    @Column({
        type: 'enum',
        enum: ['user', 'admin', 'superadmin'],
        default: 'user'
    })
    permision!: string;

    @Column()
    category!: string;

    @Column({
        nullable: false,
        default: false
    })
    views!: number;

    @Column({
        nullable: false,
        default: 0
    })
    delete!: boolean;

    @Column({
        nullable: false,
        default: true
    })
    useComment!: boolean;

    @Column({
        nullable: false,
        default: 0
    })
    commentCount!: number;

    @Column()
    @IsIP()
    ipAddress!: string;

    @ManyToOne(() => User, post => post.posts, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    user!: User

    @OneToMany(_ => HashTag, hashTag => hashTag.post)
    hashTags!: HashTag[]

    @OneToMany(_ => Comment, comment => comment.post)
    comments!: Comment[]

    @OneToMany(_ => Thumb, thumb => thumb.post)
    thumbs!: Thumb[]

    toJSON() {
        const ipAddress = "X.X." + this.ipAddress.split('.').slice(2, 4).join('.')
        return {
            ...this,
            ipAddress
        }


    }
}
