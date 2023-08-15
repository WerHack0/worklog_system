import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_info')
export class UserInfo {
    @PrimaryGeneratedColumn()
    ID: number;
    @Column()
    user_ID: number;
    @Column()
    name: string;
    @Column()
    surname: string;
    @Column()
    job_position: string;
}
