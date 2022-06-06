import { Thumb } from "./Thumb";
import { Comment } from "./Comment";
import { IsEmail, IsEnum, Length } from "class-validator";
import { Entity, Column, OneToMany } from "typeorm";
import { Model } from "./Models/Model";
import { Post } from "./Post";
import { Report } from "./Report";
import { Reward } from "./Reward";

@Entity()
export class User extends Model {
  @Column({ unique: true })
  @Length(5, 30)
  id!: string;

  @Column({
    nullable: true,
    type: "text",
  })
  imageUri!: string;

  @Column({ unique: true })
  @Length(1, 255)
  @IsEmail()
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: "enum",
    enum: ["user", "admin", "superadmin"],
    default: "user",
  })
  @IsEnum(["user", "admin", "superadmin"])
  role!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  emailToken!: string | null;

  @Column({
    type: "text",
  })
  @Length(66, 66)
  privateKey!: string;

  @Column()
  isVerified!: boolean;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];

  @OneToMany((_) => Report, (report) => report.reporter)
  reports!: Report[];

  @OneToMany(() => Comment, (comment) => comment.user_id)
  commentsForId!: Comment[];

  @OneToMany(() => Reward, (reward) => reward.user)
  rewardForId!: Reward[];

  // @OneToMany(() => Comment, comment => comment.user_imageUri)
  // commentsForImageUri!: Comment[]

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];

  @OneToMany(() => Thumb, (thumb) => thumb.user)
  thumbs!: Thumb[];

  toJSON() {
    return {
      ...this,
      // id: undefined,
      index: undefined,
      emailToken: undefined,
      isVerified: undefined,
    };
  }
}
