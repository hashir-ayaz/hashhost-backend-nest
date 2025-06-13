// this will have the types for the prebuilt resource configs
export type mongoConfig = {
  serviceName: string;
  mongoVersion: string;
  containerName: string;
  restartPolicy: string;
  hostPort: string;
  dataVolume: string;
  rootUsername: string;
  rootPassword: string;
  initDatabase: string;
  timeZone: string;
  networkName: string;
  isNetworkExternal: boolean;
};

export type redisConfig = {
  serviceName: string;
  redisVersion: string;
  containerName: string;
  restartPolicy: string;
  hostPort: string;
  dataVolume: string;
  password?: string; // optional, since Redis can run without auth
  networkName: string;
  isNetworkExternal: boolean;
};

export type grafanaConfig = {
  serviceName: string;
  grafanaVersion: string;
  containerName: string;
  restartPolicy: string;
  hostPort: string;
  dataVolume: string;
  adminUser: string;
  adminPassword: string;
  timeZone: string;
  networkName: string;
  isNetworkExternal: boolean;
};

export type postgresConfig = {
  serviceName: string;
  postgresVersion: string;
  containerName: string;
  restartPolicy: string;
  hostPort: string;
  dataVolume: string;
  dbUser: string;
  dbPassword: string;
  dbName: string;
  timeZone: string;
  networkName: string;
  isNetworkExternal: boolean;
};

export type prometheusConfig = {
  serviceName: string;
  prometheusVersion: string;
  containerName: string;
  restartPolicy: string;
  hostPort: string;
  configVolume: string; // mount path for prometheus.yml
  dataVolume: string;
  networkName: string;
  isNetworkExternal: boolean;
};

export type nginxConfig = {
  serviceName: string;
  nginxVersion: string;
  containerName: string;
  restartPolicy: string;
  httpPort: string;
  httpsPort: string;
  configVolume: string; // e.g. ./nginx.conf:/etc/nginx/nginx.conf
  certsVolume?: string; // if using SSL
  networkName: string;
  isNetworkExternal: boolean;
};
