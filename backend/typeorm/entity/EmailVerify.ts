import { Entity, Column } from "typeorm";
import { Model } from './Models/Model'

@Entity()
export class EmailVerify extends Model {
    @Column()
    email!: string

    @Column()
    token!: string
}
