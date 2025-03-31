import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from '../../projects/project.entity';
import { PrebuiltResource } from '../../prebuilt-resource/entities/prebuilt-resource.entity';

@Entity() // Matches SQLAlchemy table name
export class PrebuiltResourceInstance {
  @PrimaryGeneratedColumn()
  id: number;

  // Relation to Project
  @ManyToOne(() => Project, {
    nullable: false,
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ name: 'project_id' })
  projectId: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    default: 'Instance',
  })
  name: string;

  // Relation to PrebuiltResource
  @ManyToOne(() => PrebuiltResource, {
    nullable: false,
  })
  @JoinColumn({ name: 'resource_id' })
  resource: PrebuiltResource;

  @Column({ name: 'resource_id' })
  resourceId: number;

  @Column({ type: 'json', nullable: true })
  custom_config: Record<string, any>;

  @Column({ type: 'json', nullable: false, default: () => "'[]'" }) // list of assigned ports
  assigned_ports: number[];

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    default: '127.0.0.1',
  })
  assigned_server: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  assigned_volume_path: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    default: 'pending',
  })
  status: string;

  @Column({ type: 'json', nullable: true })
  environment_variables: Record<string, any>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}
