import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServersModule } from './servers/servers.module';
import { ProjectsModule } from './projects/projects.module';

import { TypeOrmModule } from '@nestjs/typeorm';

const typeOrmConfig = TypeOrmModule.forRoot({
  type: 'postgres', // or 'mysql', 'sqlite', etc.
  host: 'localhost',
  port: 5432,
  username: 'your_db_user',
  password: 'your_db_password',
  database: 'your_db_name',
  autoLoadEntities: true, // auto imports all @Entity()s
  synchronize: true, // auto creates tables (disable in prod)
});

@Module({
  imports: [ServersModule, ProjectsModule, typeOrmConfig],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
