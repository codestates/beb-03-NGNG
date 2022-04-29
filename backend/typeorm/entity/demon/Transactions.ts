import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";

@Entity({ database: process.env.DATABASE_DEMON_NAME })
export class Transactions extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: true
    })
    hash: string

    @Column({
        nullable: true
    })
    nonce: number

    @Column({
        nullable: true
    })
    blockHash: string

    @Column({
        nullable: true
    })
    blockNumber: number

    @Column({
        nullable: true
    })
    transactionIndex: number

    @Column({
        nullable: true
    })
    from: string

    @Column({
        nullable: true
    })
    to: string

    @Column({
        nullable: true
    })
    value: string

    @Column({
        nullable: true
    })
    gas: number

    @Column({
        nullable: true
    })
    gasPrice: string

    @Column({ type: "text" })
    input: string

    @Column({
        nullable: true
    })
    v: string

    @Column({
        nullable: true
    })
    r: string

    @Column({
        nullable: true
    })
    s: string

}