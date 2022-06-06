import { Thumb } from "./Thumb";
import { Entity, Column, ManyToOne, OneToMany, AfterInsert } from "typeorm";
import { Comment } from "./Comment";

import { Model } from "./Models/Model";
import { User } from "./User";
import { HashTag } from "./HashTag";
import { Report } from "./Report";

@Entity()
export class Post extends Model {
  @Column({ type: "text" })
  content!: string;

  @Column({
    type: "enum",
    enum: ["user", "admin", "superadmin"],
    default: "user",
  })
  permision!: string;

  @Column({
    nullable: false,
    default: 0,
  })
  delete!: boolean;

  @Column({
    nullable: true,
    type: "text",
  })
  imageUri!: string;

  @Column({
    nullable: false,
    default: true,
  })
  useComment!: boolean;

  @Column({
    nullable: false,
    default: 0,
  })
  commentCount!: number;

  @ManyToOne(() => User, (post) => post.posts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user!: User;

  @OneToMany((_) => HashTag, (hashTag) => hashTag.post)
  hashTags!: HashTag[];

  @OneToMany((_) => Report, (report) => report.post)
  reports!: Report[];

  @OneToMany((_) => Comment, (comment) => comment.post)
  comments!: Comment[];

  @OneToMany((_) => Thumb, (thumb) => thumb.post)
  thumbs!: Thumb[];

  toJSON() {
    return {
      ...this,
    };
  }
}
