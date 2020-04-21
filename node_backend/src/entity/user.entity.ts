import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { AbstractEntity } from "../@base/abstract.entity";
import { FileEntity } from "./file.entity";

@Entity('user')
export class UserEntity extends AbstractEntity {
    
    @Column()
    firstname: string;
  
    @Column()
    lastname: string;

    @Column()
    email: string;

    @OneToOne(() => FileEntity, {
      nullable: true,
      cascade: true,
      eager: true,
    })
    @JoinColumn()
    avatar: FileEntity;

  }
