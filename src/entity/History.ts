import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class History{

    @PrimaryGeneratedColumn({ type: "int" })
    trid: number;

    @Column({ type: "int", nullable: false })
    uid: number;

    @Column({ type: "int", nullable: false })
    drid: number;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    date: Date;

    @Column({ type: "varchar", nullable:true })
    title: string;

    @Column({ type: "varchar", nullable:true})
    medicines: string;

    @Column({ type: "varchar", nullable:true})
    description: string;
}

