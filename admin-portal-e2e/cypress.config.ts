import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

export default {
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'npm run nx run admin-portal:dev',
        production: 'npm run nx run admin-portal:preview',
      },
      ciWebServerCommand: 'npm run nx run admin-portal:preview',
      ciBaseUrl: 'http://localhost:4200',
    }),
    baseUrl: 'http://localhost:4200',
  },
};
