module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
      plugins: [
<<<<<<< HEAD
        [
          'module:react-native-dotenv',
          {
            envName: 'APP_ENV',
            moduleName: '@env',
            path: '.env',
          },
        ],
=======
        ['module:react-native-dotenv', {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          allowUndefined: true,
        }],
>>>>>>> c781817ecc0c62439f0c9f9ff297547333f58a88
      ],
      env: {
        production: {
          plugins: [
            'react-native-paper/babel',
            ["module:react-native-dotenv"],
          ],
        },
      },
    };
  };