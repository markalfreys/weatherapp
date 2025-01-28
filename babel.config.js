module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
      plugins: [
        ['module:react-native-dotenv', {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          allowUndefined: true,
        }],
      ],
      env: {
        production: {
          plugins: ['react-native-paper/babel'],
        },
      },
    };
  };