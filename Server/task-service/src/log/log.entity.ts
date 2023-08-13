import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_id: number;
    @Column()
    day: number;
    @Column()
    month: number;
    @Column()
    work_hours: number;
    @Column()
    task: string;
    @Column({default: false})
    seend: boolean;
    @Column({default: false})
    check: boolean;
}
