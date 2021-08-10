module.exports = {
  apps: [
    {
      name: 'Wasteye',
      exec_mode: 'cluster',
      instances: '1', // Or a number of instances
      script: 'node -r tsconfig-paths/register ./node_modules/nuxt/bin/nuxt.js start',
      args: 'start'
    }
  ]
}
