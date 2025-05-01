import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServersModule } from './servers/servers.module';
import { ProjectsModule } from './projects/projects.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PrebuiltResourceModule } from './prebuilt-resource/prebuilt-resource.module';
import { PrebuiltResourceInstanceModule } from './prebuilt-resource-instance/prebuilt-resource-instance.module';
import { DockerModule } from './docker/docker.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

const typeOrmConfig = TypeOrmModule.forRoot({
  type: 'postgres', // or 'mysql', 'sqlite', etc.
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'nestdb',
  autoLoadEntities: true, // auto imports all @Entity()s
  synchronize: true, // auto creates tables (disable in prod)
});
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration globally available
    }),
    ServersModule,
    ProjectsModule,
    typeOrmConfig,
    PrebuiltResourceModule,
    PrebuiltResourceInstanceModule,
    DockerModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
