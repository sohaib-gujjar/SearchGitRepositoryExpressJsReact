import { Entity, Column } from "typeorm";
import { AbstractEntity } from "../@base/abstract.entity";

@Entity('file')
export class FileEntity extends AbstractEntity {
  @Column()
  filename: string;

  @Column()
  originalname: string;

  @Column()
  encoding: string;

  @Column()
  mimetype: string;

  @Column()
  extension: string;

  @Column()
  path: string;

  @Column()
  url: string;

  @Column()
  size: string;

  @Column()
  md5hash: string;
}