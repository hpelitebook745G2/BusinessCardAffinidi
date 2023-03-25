module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.js',
          '.jsx',
          '.json',
          '.svg',
          '.png',
          '.ts',
          '.tsx',
          '.ios.js',
          '.android.js',
        ],
        alias: {
          '@': './src',
          '@assets': './src/assets',
          '@components': './src/components',
          '@config': './src/config',
          '@constants': './src/constants',
          '@containers': './src/containers',
          '@models': './src/models',
          '@reducers': './src/reducers',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
