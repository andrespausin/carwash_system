module.exports = {
  apps: [
    {
      name: 'back-End',
      script: './src/index.js',
      watch: false,
      max_memory_restart: '1000M',
      exec_mode: 'cluster',
      instances: 1,
      cron_restart: '59 23 * * *',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }

    }
  ]
}
