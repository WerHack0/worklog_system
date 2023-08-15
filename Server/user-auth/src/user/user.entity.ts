import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    ID: number;
    @Column()
    email: string;
    @Column()
    password: string;

}
