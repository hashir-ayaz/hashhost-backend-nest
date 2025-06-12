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
