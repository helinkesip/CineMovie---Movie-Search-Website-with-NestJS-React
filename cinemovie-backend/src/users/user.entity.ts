import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() //veritabanındaki tablo 
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;
}
