import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { PrebuiltResourceInstance } from '../../prebuilt-resource-instance/entities/prebuilt-resource-instance.entity';

@Entity() // Matches the SQLAlchemy table name
export class PrebuiltResource {
  @PrimaryGeneratedColumn()
  id: number; // Matches `Integer` primary key in Flask

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  image: string; // Docker image name or deployment ID

  @Column({ type: 'json', nullable: true })
  defaultConfig: Record<string, any>;

  @Column({ type: 'json', nullable: false, default: () => "'[]'" }) // JSON array like [80, 443]
  requiredPorts: number[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  volumePath: string[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  //   honestly does prebuilt resource need to have a relationship with all its instances
  //   @OneToMany(() => PrebuiltResourceInstance, (instance) => instance.resource, {
  //     cascade: true,
  //   })
  //   instances: PrebuiltResourceInstance[];
}
