module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          router: './src/api/routers',
        },
      },
    ],
    '@babel/plugin-transform-async-to-generator',
  ],
};
