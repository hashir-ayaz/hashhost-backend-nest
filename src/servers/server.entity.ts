import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../projects/project.entity';

@Entity()
export class Server {
  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  ip_address: string;

  @Column()
  status: string;

  //   projects for this server
  @OneToMany(() => Project, (project) => project.serverId)
  projects: Project[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
