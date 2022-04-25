import * as pulumi from '@pulumi/pulumi';
import * as docker from '@pulumi/docker';

// Replace this with an actual configuration secret or random.RandomString
const dbPassword = pulumi.secret('randomSecretGoesHere');

const postgresImage = new docker.RemoteImage('postgres', {
  name: 'postgres:latest'
});

const dbData = new docker.Volume('db-data');

new docker.Container('db', {
  name: 'postgresql-example',
  image: postgresImage.latest,
  ports: [{ internal: 5432, external: 5432 }],
  // Add environment variables
  envs: [
    // Store db password as secret
    pulumi.secret(pulumi.interpolate`POSTGRES_PASSWORD=${dbPassword}`)
  ],
  volumes: [
    { volumeName: dbData.name, containerPath: '/var/lib/postgresql/data' }
  ]
});
