import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  service: string;

  @Column('text')
  message: string;

  @CreateDateColumn()
  createdAt: Date;
} 