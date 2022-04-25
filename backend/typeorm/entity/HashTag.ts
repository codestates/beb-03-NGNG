import { Thumb } from './Thumb';
import { IsIP, Length } from "class-validator";
import { Entity, Column, ManyToOne, OneToMany, AfterInsert, ManyToMany, JoinTable } from "typeorm";
import { Post } from "./Post";

import { Model } from './Models/Model'

@Entity()
export class HashTag extends Model {

    @Column({ type: "text" })
    tag!: string;

    @ManyToOne(() => Post, post => post.hashTags, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: true,
    })
    post!: Post;

}
