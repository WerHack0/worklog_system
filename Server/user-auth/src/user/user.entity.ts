
import { UserInfo } from "src/user-info/user-info.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    ID: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @OneToOne(() => UserInfo, (userInfo) => userInfo.user,  { eager: true })
    @JoinColumn({name:'user_ID'})
    userInfo: UserInfo;
}
