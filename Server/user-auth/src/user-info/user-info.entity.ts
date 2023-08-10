import { User } from "src/user/user.entity";
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

    @OneToOne(() => User, (user) => user.userInfo)
    @JoinColumn({name: 'user_ID'})
    user: User;

}
