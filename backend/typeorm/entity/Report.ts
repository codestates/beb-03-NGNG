import { Entity, Column, ManyToOne, Unique, OneToMany, AfterInsert, ManyToMany, JoinTable } from "typeorm";
import { Post } from "./Post";

import { Model } from './Models/Model'
import { User } from "./User";

@Entity()
@Unique(["reporter", "post"])
export class Report extends Model {

    @Column({ type: "text" })
    content: string
    @ManyToOne(() => User, user => user.reports, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: true,
    })
    reporter!: User;

    @ManyToOne(() => Post, post => post.reports, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: true,
    })
    post!: Post;

}
