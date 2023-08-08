import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    ID: number;
    @Column()
    email: string;
    @Column()
    password: string;
}
