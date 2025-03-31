import Docker from 'dockerode';

const docker = new Docker();

export const listContainers = async () => {
  const containers = await docker.listContainers({ all: true });
  return containers;
};
