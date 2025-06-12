import * as Handlebars from 'handlebars';
import * as fs from 'fs-extra';
import * as path from 'path';

// __dirname is already available in CommonJS
// no need for import.meta.url shims

// register your helpers…
Handlebars.registerHelper('default', (value: any, fallback: any) =>
  value !== undefined && value !== null ? value : fallback,
);
Handlebars.registerHelper('concat', (...args: any[]) => {
  args.pop(); // drop Handlebars options object
  return args.join('');
});

export async function renderCompose(
  config: Record<string, any>,
  templatePath: string,
  outputPath: string,
): Promise<void> {
  const tplSrc = await fs.readFile(templatePath, 'utf8');
  const template = Handlebars.compile(tplSrc);
  const rendered = template(config);
  await fs.outputFile(outputPath, rendered);
  console.log(`Wrote ${outputPath}`);
}

// async function main() {
//   const userConfig = {
//     serviceName: 'mydb-mongo',
//     mongoVersion: '6.0',
//     containerName: 'project-mongo',
//     restartPolicy: 'on-failure',
//     hostPort: '27018',
//     dataVolume: 'mydb_data',
//     rootUsername: 'admin',
//     rootPassword: 's3cr3t',
//     initDatabase: 'users',
//     timeZone: 'Asia/Karachi',
//     networkName: 'mypaas-net',
//     isNetworkExternal: true,
//   };

//   // __dirname works out-of-the-box here:
//   await renderCompose(
//     userConfig,
//     // path.join(__dirname, 'mongo-template.yaml'),
//     '/home/hashir/hashhost-backend-nest/src/templates/docker-compose/mongo-template.yaml',
//     '/home/hashir/hashhost-backend-nest/src/templates/docker-compose/docker-compose.yml',
//   );
// }

// main().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });
