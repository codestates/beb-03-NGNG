import { Thumb } from './Thumb';
import { IsIP, Length } from "class-validator";
import { Entity, Column, ManyToOne, OneToMany, AfterInsert, ManyToMany, JoinTable } from "typeorm";
import { Post } from "./Post";

import { Model } from './Models/Model'
import { User } from './User'

@Entity()
export class HashTags extends Model {

    @Column({ type: "text" })
    tag!: string;

    @ManyToMany(() => Post)
    @JoinTable()
    posts: Post[];

}
