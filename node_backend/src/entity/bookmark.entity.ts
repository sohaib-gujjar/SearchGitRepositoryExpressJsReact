import {Entity, Column } from "typeorm";
import { AbstractEntity } from "../@base/abstract.entity";

@Entity()
export class Bookmark extends AbstractEntity{

  @Column()
  gitId: string;

  @Column({ type: "text"})
  repository: string;
 
}