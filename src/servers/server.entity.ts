import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from '../projects/project.entity';

@Entity() // Explicitly naming the table to match Flask version
export class Server {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 500, default: '', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  ip_address: string; // IPv4 + IPv6 support

  @Column({ type: 'varchar', length: 50, default: 'inactive', nullable: false })
  status: string; // active, inactive, maintenance

  // Relationship: one server can have many projects
  @OneToMany(() => Project, (project) => project.server)
  projects: Project[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}
