import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
  } from 'typeorm';
  
  export class AbstractEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date = undefined;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date = undefined;

  }