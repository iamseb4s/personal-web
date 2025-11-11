export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  admin: {
    watchIgnoreFiles: [
      '**/Dockerfile.dev',
      '**/Dockerfile.prod',
      '**/docker-compose.yml',
      '**/.dockerignore',
      '**/README.md',
    ],
  },
});
