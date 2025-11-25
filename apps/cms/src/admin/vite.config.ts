import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    server: {
      allowedHosts: ['devcms.iamsebas.dev', 'localhost', '0.0.0.0'], // Added custom domain and common local hosts
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
};
