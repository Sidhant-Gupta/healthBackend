import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "varchar", nullable: false, unique: true })
    registration_id: string;

    @Column({ type: "varchar", default: "" })
    name: string;

    @Column({ type: "varchar", default: "" })
    email_id: string;

    @Column({ type: "varchar", nullable: true })
    mobile: string;

    @Column({ type: "varchar", default: "" })
    height: string;

    @Column({ type: "varchar", default: "" })
    blood_group: string;

    @Column({ type: "int", nullable: true })
    age: number;

    @Column({ type: "int", nullable: true})
    weight: number;

}

