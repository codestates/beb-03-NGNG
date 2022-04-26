import { Entity, Column, ManyToOne, OneToMany, AfterInsert, ManyToMany, JoinTable } from "typeorm";
import { Post } from "./Post";

import { Model } from './Models/Model'

@Entity()
export class Report extends Model {

    // @Column({ type: "text" })
    // reporter:

    // @Column({})


    // @ManyToOne(() => Post, post => post.hashTags, {
    //     onDelete: "CASCADE",
    //     onUpdate: "CASCADE",
    //     nullable: true,
    // })
    // post!: Post;

}
