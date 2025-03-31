import Docker, { Container } from 'dockerode';

const docker: any = new Docker();

const createContainer = (container: Container): Container => {
  return docker.createContainer(container);
};

export { createContainer };
