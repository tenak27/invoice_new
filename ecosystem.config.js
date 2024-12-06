module.exports = {
  apps: [
    {
      name: 'iam-invoicer-frontend',
      script: 'npm',
      args: 'run preview',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'iam-invoicer-backend',
      script: 'dist/server/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
};