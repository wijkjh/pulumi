import * as docker from '@pulumi/docker';

// Pull nginx image from registry
const nginxImage = new docker.RemoteImage('nginx', {
  name: 'nginx:1.21.3-alpine'
});

// Create new docker container and expose 80 at 8080
new docker.Container('nginx', {
  image: nginxImage.latest,
  ports: [{ internal: 80, external: 8080 }]
});
