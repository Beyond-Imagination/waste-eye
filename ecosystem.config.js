module.exports = {
  apps: [
    {
      name: 'Wasteye',
      exec_mode: 'cluster',
      instances: 1, // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      node_args: '-r tsconfig-paths/register',
      args: 'start'
    }
  ]
}
