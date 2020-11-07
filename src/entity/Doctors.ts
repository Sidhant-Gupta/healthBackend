import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Doctors{

    @PrimaryGeneratedColumn({ type: "int" })
    drid: number;

    @Column({ type: "varchar", nullable: false, unique: true })
    registration_id: string;

    @Column({ type: "varchar", nullable:true })
    name: string;

    @Column({ type: "varchar", nullable:true})
    email_id: string;

    @Column({ type: "varchar", nullable: true })
    mobile: string;

    @Column({ type: "varchar", nullable:true })
    specialisation: string;

    @Column({ type: "varchar", nullable:true})
    degree: string;

}

