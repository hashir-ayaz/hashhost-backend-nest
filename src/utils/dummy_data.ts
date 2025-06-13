export const dummyConfigData: Array<{
  serviceId: number;
  pathToConfig: string;
  pathToOutput: string;
}> = [
  {
    serviceId: 1,
    pathToConfig:
      '/home/hashir/hashhost-backend-nest/src/templates/docker-compose/mongo.hbs',
    pathToOutput:
      '/home/hashir/hashhost-backend-nest/src/templates/processed-docker-compose/docker-compose-MONGO.yml',
  },
  {
    serviceId: 2,
    pathToConfig:
      '/home/hashir/hashhost-backend-nest/src/templates/docker-compose/redis.hbs',
    pathToOutput:
      '/home/hashir/hashhost-backend-nest/src/templates/processed-docker-compose/docker-compose-REDIS.yml',
  },
  {
    serviceId: 3,
    pathToConfig:
      '/home/hashir/hashhost-backend-nest/src/templates/docker-compose/grafana.hbs',
    pathToOutput:
      '/home/hashir/hashhost-backend-nest/src/templates/processed-docker-compose/docker-compose-GRAFANA.yml',
  },
  {
    serviceId: 4,
    pathToConfig:
      '/home/hashir/hashhost-backend-nest/src/templates/docker-compose/postgres.hbs',
    pathToOutput:
      '/home/hashir/hashhost-backend-nest/src/templates/processed-docker-compose/docker-compose-POSTGRES.yml',
  },
  {
    serviceId: 5,
    pathToConfig:
      '/home/hashir/hashhost-backend-nest/src/templates/docker-compose/prometheus.hbs',
    pathToOutput:
      '/home/hashir/hashhost-backend-nest/src/templates/processed-docker-compose/docker-compose-PROMETHEUS.yml',
  },
  {
    serviceId: 6,
    pathToConfig:
      '/home/hashir/hashhost-backend-nest/src/templates/docker-compose/nginx.hbs',
    pathToOutput:
      '/home/hashir/hashhost-backend-nest/src/templates/processed-docker-compose/docker-compose-NGINX.yml',
  },
];
