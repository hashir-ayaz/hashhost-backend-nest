import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Server } from '../servers/server.entity';
// import { PrebuiltResourceInstance } from '../prebuilt-resource-instances/prebuilt-resource-instance.entity';
// import { UserBuiltInstance } from '../user-built-instances/user-built-instance.entity';

@Entity() // Explicit table name
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    default: 'Unnamed Server',
  })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Server, (server) => server.projects, { nullable: true })
  @JoinColumn({ name: 'serverId' })
  server: Server;

  @Column({ name: 'serverId' })
  serverId: string; // or `number` if you're using numeric PKs

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  // Relations to resource instances
  // @OneToMany(() => PrebuiltResourceInstance, (prebuilt) => prebuilt.project, {
  //   cascade: true,
  // })
  // prebuilt_resources_instances: PrebuiltResourceInstance[];

  // @OneToMany(() => UserBuiltInstance, (userBuilt) => userBuilt.project, {
  //   cascade: true,
  // })
  // user_built_instances: UserBuiltInstance[];
}
