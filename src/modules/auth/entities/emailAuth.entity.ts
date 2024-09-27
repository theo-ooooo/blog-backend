import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'emailAuth' })
export class EmailAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'code', unique: true })
  code: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'logged', type: 'boolean', default: false })
  logged: boolean;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
